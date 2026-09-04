import {randomUUID} from 'node:crypto';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
import {appendJournal} from './challenger-store.mjs';
import {verifyHistory, trustedPrefix, snapshotProtected, assertProtected} from './challenger-guard.mjs';

export function runArchitectureCheck(root, {recordRun = false} = {}) {
  const before = snapshotProtected(root);
  verifyHistory(root);
  // No sources fetched, packets generated, conclusions inferred, or decisions consumed.
  if (recordRun) appendJournal(root, 'runs.jsonl', {schemaVersion: 'argus.challenger-run/1',
    id: randomUUID(), timestamp: new Date().toISOString(), mode: 'ARCHITECTURE_ONLY',
    status: 'VERIFIED_NO_SCORING'}, trustedPrefix(root, 'runs.jsonl'));
  assertProtected(root, before);
  return {mode: 'ARCHITECTURE_ONLY', scoring: false, protectedFilesUnchanged: before.size};
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2);
  if (args.length > 1 || args.some(arg => arg !== '--record-run')) throw Error('CHALLENGER_PHASE_A_ARGUMENT_DENIED');
  console.log(JSON.stringify(runArchitectureCheck(process.cwd(), {recordRun: args.includes('--record-run')})));
}
