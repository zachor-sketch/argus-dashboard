import path from 'node:path';
import {pathToFileURL} from 'node:url';
import {execFileSync} from 'node:child_process';
import {hash} from './challenger-store.mjs';
import {validateCoreRead} from '../lib/challenger-pilot-debate.js';
import {PILOT} from '../lib/challenger-pilot-model.js';

// This module is loaded only by the post-freeze Debate phase.
export async function readCore(root, ticker, cutoff) {
  if (!PILOT.includes(ticker)) throw Error('PILOT_SCOPE_DENIED');
  const {BASELINE_V10_25: baseline} = await import(pathToFileURL(path.join(root, 'datasets/baseline_v10_25.js')).href);
  const {UNIVERSE: universe} = await import(pathToFileURL(path.join(root, 'datasets/universe_v10_33.js')).href);
  const locked = baseline.lockedBaselines[ticker];
  const company = universe['Company Universe'].find(r => r.Ticker === ticker);
  if (!company) throw Error('PILOT_CORE_COMPANY_ABSENT');
  const file = locked ? 'datasets/baseline_v10_25.js' : 'datasets/universe_v10_33.js';
  const [commit, committedAt] = execFileSync('git', ['log', '-1', '--format=%H%n%cI', 'HEAD', '--', file], {cwd: root, encoding: 'utf8'}).trim().split('\n');
  if (!commit || !committedAt) throw Error('PILOT_CORE_PROVENANCE_MISSING');
  const raw = locked || company, rawTime = locked?.lockedAt || company['Last Review'];
  // A timezone-less historical review date cannot become a precise PIT timestamp.
  const asOf = /(?:Z|[+-]\d\d:\d\d)$/.test(rawTime || '') && Number.isFinite(Date.parse(rawTime)) ? new Date(rawTime).toISOString() : 'UNKNOWN';
  return validateCoreRead({ticker, state: locked?.decision || company['V10 Frozen Final'] || 'UNKNOWN',
    narrative: locked?.thesis || company['V10 Frozen Reason'] || 'UNKNOWN',
    // Trading labels are not evidence of an economic direction; no keyword scoring.
    economicDirection: ['FAVORABLE', 'UNFAVORABLE'].includes(raw.economicDirection) ? raw.economicDirection : 'UNKNOWN',
    ref: `git:${commit}:${file}#${ticker}`, contentHash: hash(raw), asOf,
    availableAt: new Date(committedAt).toISOString(), readAt: new Date().toISOString()}, cutoff);
}
