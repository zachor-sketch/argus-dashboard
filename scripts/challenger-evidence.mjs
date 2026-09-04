import fs from 'node:fs';
import path from 'node:path';
import {execFileSync} from 'node:child_process';
import {pathToFileURL} from 'node:url';
import {hash} from './challenger-store.mjs';
import {validateBundle, PILOT} from '../lib/challenger-pilot-model.js';
import {instant} from '../lib/challenger-model.js';

export function readObserverChain(root, name) {
  if (!['events', 'documents'].includes(name)) throw Error('PILOT_READ_DENIED');
  const text = fs.readFileSync(path.join(root, `observer/${name}.jsonl`), 'utf8');
  let previous = null; const ids = new Set();
  return text.trim().split('\n').filter(Boolean).map(line => {
    const row = JSON.parse(line), {hash: stored, ...body} = row;
    if (body.previousHash !== previous || hash(body) !== stored || ids.has(row.id)) throw Error('PILOT_SOURCE_CHAIN_INVALID');
    previous = stored; ids.add(row.id); return row;
  });
}
const validTime = value => { try { return instant(value); } catch { return NaN; } };
const iso = value => new Date(validTime(value)).toISOString();

// Trusted read-only adapter: project identity and source facts, never spread research rows.
export function projectSources({universe, events, documents, market, repositoryCommit}, ticker, evidenceCutoff) {
  const cutoff = instant(evidenceCutoff);
  if (!PILOT.includes(ticker)) throw Error('PILOT_SCOPE_DENIED');
  const identities = universe['Company Universe'].filter(row => row.Ticker === ticker);
  if (!identities.length) return null;
  if (identities.length !== 1) throw Error('PILOT_AMBIGUOUS_IDENTITY');
  const identity = identities[0], evidence = [], provenance = [], excluded = [], seen = new Set();
  const deny = (id, reason) => excluded.push({id, reason});
  for (const e of events.filter(row => row.ticker === ticker)) {
    if (![e.timestamp, e.detectedAt].every(t => Number.isFinite(validTime(t)) && validTime(t) <= cutoff) || validTime(e.timestamp) > validTime(e.detectedAt)) { deny(e.id, 'PIT_PUBLICATION_OR_AVAILABILITY'); continue; }
    let source;
    try { source = new URL(e.source); if (source.protocol !== 'https:' || source.username || source.password) throw Error(); } catch { deny(e.id, 'INVALID_SOURCE'); continue; }
    const macro = e.eventType === 'macro_transmission' && e.sourceAuthorityTier === 'T2_OFFICIAL_REGULATOR' && ['www.federalreserve.gov', 'www.federalregister.gov', 'www.govinfo.gov'].includes(source.hostname);
    if (e.eventType === 'macro_transmission' && (!macro || !/semiconductor|monetary policy|federal funds|interest rate/i.test(e.rawFact))) { deny(e.id, 'MACRO_RELEVANCE_UNVERIFIED'); continue; }
    if (['company_sensor', 'regulatory_filing'].includes(e.eventType)) { deny(e.id, 'DERIVED_SENSOR_OR_FILING_NOTICE'); continue; }
    const matches = documents.filter(d => d.ticker === ticker && d.url === e.source && d.publishedAt === e.timestamp && d.observedAt === e.detectedAt && /^[a-f0-9]{64}$/.test(d.contentHash));
    let doc = matches.length === 1 ? matches[0] : null, dateMethod = 'OFFICIAL_ANNOUNCEMENT_TITLE';
    if (!macro) {
      if (!doc) { deny(e.id, 'MISSING_OR_AMBIGUOUS_DOCUMENT_LINK'); continue; }
      if (['T1_SEC_FILING', 'T1_SEC_EXHIBIT'].includes(e.sourceAuthorityTier)) {
        const cik = source.pathname.match(/^\/Archives\/edgar\/data\/(\d+)\//)?.[1];
        if (source.hostname !== 'www.sec.gov' || !cik || !documents.some(d => d.kind === 'SEC_IDENTITY' && d.ticker === ticker && d.validated === true && Number(d.cik) === Number(cik) && validTime(d.observedAt) <= validTime(e.detectedAt))) { deny(e.id, 'SEC_IDENTITY_UNVERIFIED'); continue; }
        dateMethod = 'SEC_ACCEPTANCE_TIMESTAMP';
      } else if (e.sourceAuthorityTier === 'T1_ISSUER') {
        let issuer; try { issuer = new URL(identity['Primary Source URL']); } catch {}
        if (!issuer || source.hostname !== issuer.hostname || !doc.publicationDateSource || !doc.publicationDateMethod || /^\/?$|\/press-releases\/?$/.test(source.pathname)) { deny(e.id, 'ISSUER_ARTICLE_DATE_PROVENANCE_MISSING'); continue; }
        dateMethod = doc.publicationDateMethod;
      } else { deny(e.id, 'UNSUPPORTED_SOURCE_AUTHORITY'); continue; }
    }
    if (typeof e.rawFact !== 'string' || !e.rawFact.trim()) { deny(e.id, 'EMPTY_SOURCE_EXCERPT'); continue; }
    const dedupe = hash([e.source, e.timestamp, e.rawFact.trim()]);
    if (seen.has(dedupe)) { deny(e.id, 'DUPLICATE_EXCERPT'); continue; } seen.add(dedupe);
    evidence.push({id: e.id, sourceRef: e.source, contentHash: hash(e.rawFact), publishedAt: iso(e.timestamp), availableAt: iso(e.detectedAt), fact: e.rawFact});
    provenance.push({evidenceId: e.id, kind: macro ? 'OFFICIAL_TITLE_ONLY' : 'OBSERVER_EXCERPT', sourceFile: 'observer/events.jsonl', recordId: e.id, recordHash: e.hash,
      documentId: doc?.id ?? 'UNKNOWN', documentRecordHash: doc?.hash ?? 'UNKNOWN', documentContentHash: doc?.contentHash ?? 'UNKNOWN', dateMethod});
  }
  const q = market?.quotes?.[ticker];
  if (q) {
    if (q.verified === true && market.status === 'MANUALLY_VERIFIED' && q.session === 'REGULAR_CLOSE' && Number.isFinite(q.price) && q.price > 0 &&
        Number.isFinite(market.maxAgeHours) && market.maxAgeHours > 0 && market.maxAgeHours <= 24 &&
        [q.timestamp, market.verifiedAt].every(t => Number.isFinite(validTime(t)) && validTime(t) <= cutoff) &&
        validTime(q.timestamp) <= validTime(market.verifiedAt) && cutoff - validTime(q.timestamp) <= market.maxAgeHours * 3600000 && /^https:\/\//.test(q.source)) {
      const id = 'verified-price-' + ticker;
      const fact = `Manually verified regular close: ${q.price} ${q.currency}; price only, not intrinsic value.`;
      evidence.push({id, sourceRef: q.source, contentHash: hash(fact), publishedAt: iso(q.timestamp), availableAt: iso(market.verifiedAt), fact});
      provenance.push({evidenceId: id, kind: 'VERIFIED_PRICE', sourceFile: 'datasets/market_snapshot.js', recordId: ticker, recordHash: hash(q), documentId: 'UNKNOWN', documentRecordHash: 'UNKNOWN', documentContentHash: 'UNKNOWN', dateMethod: 'QUOTE_TIMESTAMP_AND_MANUAL_VERIFICATION'});
    } else deny('verified-price-' + ticker, 'PRICE_UNVERIFIED_STALE_OR_AFTER_PIT');
  }
  return validateBundle({schemaVersion: 'argus.source-bundle/1', ticker, company: identity.Company, evidenceCutoff, repositoryCommit, evidence, provenance, excluded,
    missingInputs: ['Independent valuation model not stored in the permitted source inputs', 'Consensus expectations not independently evidenced', 'Excerpt coverage is not complete underwriting']});
}

export async function loadSources(root, evidenceCutoff) {
  instant(evidenceCutoff);
  const repositoryCommit = execFileSync('git', ['rev-parse', 'HEAD'], {cwd: root, encoding: 'utf8'}).trim();
  const {UNIVERSE: universe} = await import(pathToFileURL(path.join(root, 'datasets/universe_v10_33.js')).href);
  const {MARKET_SNAPSHOT: market} = await import(pathToFileURL(path.join(root, 'datasets/market_snapshot.js')).href);
  const inputs = {universe, market, events: readObserverChain(root, 'events'), documents: readObserverChain(root, 'documents'), repositoryCommit};
  return PILOT.map(ticker => projectSources(inputs, ticker, evidenceCutoff)).filter(Boolean);
}

export async function verifyStoredSources(root, packets) {
  for (const packet of packets.filter(p => p.schemaVersion === 'argus.challenge/2')) {
    const current = (await loadSources(root, packet.evidenceCutoff)).find(b => b.ticker === packet.ticker);
    if (!current || current.company !== packet.company) throw Error('PILOT_SOURCE_IDENTITY_CHANGED');
    for (const e of packet.sourceBundle.evidence) {
      const p = packet.sourceBundle.provenance.find(r => r.evidenceId === e.id);
      if (!current.evidence.some(r => hash(r) === hash(e)) || !current.provenance.some(r => hash(r) === hash(p))) throw Error('PILOT_SOURCE_REPLAY_MISMATCH');
    }
  }
}
