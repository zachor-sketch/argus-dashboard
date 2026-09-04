import fs from 'node:fs';
import path from 'node:path';
import {createHash} from 'node:crypto';
import {canonical} from '../lib/integrity.js';
import {validateChallenge, instant} from '../lib/challenger-model.js';
import {validateIndependent} from '../lib/challenger-pilot-model.js';
import {validatePilotRecord, validatePilotLinks} from './challenger-pilot-records.mjs';

export const JOURNALS = Object.freeze(['challenges.jsonl', 'runs.jsonl']);
export const hash = value => createHash('sha256').update(typeof value === 'string' || Buffer.isBuffer(value) ? value : canonical(value)).digest('hex');

export function journalPath(root, name) {
  if (!JOURNALS.includes(name)) throw Error('CHALLENGER_WRITE_DENIED');
  const base = path.resolve(root), dir = path.join(base, 'challenger'), file = path.join(dir, name);
  // Reject redirects in every ancestor, plus hard links to protected regular files.
  for (let current = file;; current = path.dirname(current)) {
    if (fs.existsSync(current)) {
      const stat = fs.lstatSync(current);
      if (stat.isSymbolicLink() || current === file && (!stat.isFile() || stat.nlink !== 1)) throw Error('CHALLENGER_LINK_DENIED');
    }
    if (path.dirname(current) === current) break;
  }
  return file;
}

function validatePayload(name, row) {
  if (name === 'challenges.jsonl') {
    if (row?.schemaVersion === 'argus.challenge/2') {
      const packet = validateIndependent(row);
      if (hash(packet.sourceBundle) !== packet.bundleHash) throw Error('PILOT_BUNDLE_HASH');
      if (packet.sourceBundle.evidence.some(e => hash(e.fact) !== e.contentHash)) throw Error('PILOT_EXCERPT_HASH');
      return packet;
    }
    return validateChallenge(row);
  }
  if (name === 'runs.jsonl' && ['argus.pilot-batch/1', 'argus.pilot-debate/1'].includes(row?.schemaVersion)) return validatePilotRecord(row);
  if (!row || Object.keys(row).sort().join(',') !== 'id,mode,schemaVersion,status,timestamp' ||
      typeof row.id !== 'string' || !row.id.trim() || row.schemaVersion !== 'argus.challenger-run/1' ||
      row.mode !== 'ARCHITECTURE_ONLY' || row.status !== 'VERIFIED_NO_SCORING') throw Error('CHALLENGER_RUN_SCHEMA');
  instant(row.timestamp);
  return row;
}

export function validateJournal(name, bytes) {
  if (!JOURNALS.includes(name)) throw Error('CHALLENGER_WRITE_DENIED');
  const source = Buffer.isBuffer(bytes) ? bytes.toString('utf8') : bytes;
  if (source && !source.endsWith('\n')) throw Error('CHALLENGER_PARTIAL_RECORD');
  let previousHash = null;
  const ids = new Set(), rows = [];
  for (const line of source ? source.slice(0, -1).split('\n') : []) {
    const row = JSON.parse(line), {hash: storedHash, ...body} = row;
    if (Object.keys(row).sort().join(',') !== 'hash,payload,previousHash,sequence' ||
        body.previousHash !== previousHash || body.sequence !== rows.length + 1 || hash(body) !== storedHash) throw Error('CHALLENGER_CHAIN_INVALID');
    validatePayload(name, row.payload);
    if (ids.has(row.payload.id)) throw Error('CHALLENGER_DUPLICATE_ID');
    ids.add(row.payload.id); previousHash = storedHash; rows.push(row);
  }
  return rows;
}

export function assertAppendOnly(before, after) {
  // Git may check text out as CRLF on Windows; compare logical journal bytes.
  const normalize = value => Buffer.from(value).toString('utf8').replace(/\r\n/g, '\n');
  if (!normalize(after).startsWith(normalize(before))) throw Error('CHALLENGER_APPEND_ONLY_VIOLATION');
}

export function verifyJournal(root, name, trustedPrefix) {
  if (trustedPrefix === undefined) throw Error('CHALLENGER_TRUSTED_PREFIX_REQUIRED');
  const file = journalPath(root, name);
  const bytes = fs.existsSync(file) ? fs.readFileSync(file) : Buffer.alloc(0);
  validateJournal(name, trustedPrefix);
  assertAppendOnly(trustedPrefix, bytes);
  return validateJournal(name, bytes);
}

// Only two fixed destinations; no arbitrary writer, Core handle, action executor, or network.
// The caller must provide a trusted prior prefix (the runner uses committed Git history).
export function appendJournal(root, name, payload, trustedPrefix) {
  validatePayload(name, payload);
  const rows = verifyJournal(root, name, trustedPrefix), file = journalPath(root, name);
  if (rows.some(row => row.payload.id === payload.id)) throw Error('CHALLENGER_DUPLICATE_ID');
  const body = {sequence: rows.length + 1, previousHash: rows.at(-1)?.hash ?? null, payload};
  const row = {...body, hash: hash(body)};
  if (name === 'runs.jsonl' && payload.schemaVersion.startsWith('argus.pilot-')) {
    const challengesFile = journalPath(root, 'challenges.jsonl');
    const challenges = validateJournal('challenges.jsonl', fs.existsSync(challengesFile) ? fs.readFileSync(challengesFile) : '');
    validatePilotLinks(challenges, [...rows, row]);
  }
  fs.mkdirSync(path.dirname(file), {recursive: true});
  const fd = fs.openSync(journalPath(root, name), fs.constants.O_WRONLY | fs.constants.O_APPEND | fs.constants.O_CREAT | (fs.constants.O_NOFOLLOW || 0));
  try {
    if (fs.fstatSync(fd).nlink !== 1) throw Error('CHALLENGER_LINK_DENIED');
    fs.writeFileSync(fd, JSON.stringify(row) + '\n'); fs.fsyncSync(fd);
  } finally { fs.closeSync(fd); }
  verifyJournal(root, name, trustedPrefix);
  return row;
}
