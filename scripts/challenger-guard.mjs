import fs from 'node:fs';
import {execFileSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
import {JOURNALS, verifyJournal} from './challenger-store.mjs';

export function trustedPrefix(root, name, ref = 'HEAD') {
  if (!JOURNALS.includes(name) || !/^[a-zA-Z0-9_./^-]+$/.test(ref) || ref.startsWith('-')) throw Error('CHALLENGER_REFERENCE_DENIED');
  const files = execFileSync('git', ['ls-tree', '--name-only', ref, '--', `challenger/${name}`], {cwd: root, encoding: 'utf8'});
  // Only an explicitly absent file in a successfully resolved commit can be genesis.
  return files.trim() ? execFileSync('git', ['show', `${ref}:challenger/${name}`], {cwd: root}) : Buffer.alloc(0);
}

export function verifyHistory(root, ref = 'HEAD') {
  for (const name of JOURNALS) verifyJournal(root, name, trustedPrefix(root, name, ref));
}

export function snapshotProtected(root) {
  const files = execFileSync('git', ['ls-files', '-z'], {cwd: root, encoding: 'utf8'}).split('\0').filter(Boolean);
  return new Map(files.filter(file => !JOURNALS.some(name => file === `challenger/${name}`)).map(file => [file, fs.readFileSync(path.join(root, file))]));
}

export function assertProtected(root, before) {
  for (const [file, bytes] of before) if (!fs.readFileSync(path.join(root, file)).equals(bytes)) throw Error(`CHALLENGER_PROTECTED_FILE_CHANGED: ${file}`);
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  verifyHistory(process.cwd(), process.argv[2] || 'HEAD');
  console.log('PASS: Challenger hash chains and trusted committed append-only prefixes');
}
