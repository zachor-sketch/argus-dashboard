# Final coverage hardening before universe expansion

Starting real scan: `scan-33862636851-1` (91 complete, 98 usable, 2 unavailable, 19 failure records, SEC 91/91).

## Diagnosis before implementation

The seven partial companies are SU.PA, GIVN.SW, SY1.DE, CRDA.L, MUV2, LUMI.TA and MC.PA. Each has two distinct gaps: bounded discovery leaves unvisited sources, and issuer HTML is not a full regulatory connector. These account for 14 records. No threshold or completion definition is changed.

GIVN.SW's additional failure is the legacy `/fr/media/trade-media/2021/givaudan-active-beauty-launches-masknyl` article, redirecting to the unresolvable `pcontentweb.givaudan.com`. The root URL has no language segment, so the earlier locale filter missed the page's declared English language.

LUMI.TA's additional failure is `https://www.leumi.co.il/leumi-hebrew/s3fs-public/newsite/financialstatement/26/q2/en/PR_Q2_2026_2%20Acc.pdf`: PDF/manual review, not missing issuer HTML evidence.

The two unavailable companies are:

- TRPZ.TA: `https://www.turpaz.co.il/Investor-announcements` yielded no dated parseable release. Its reports are external MAYA/MAGNA links, silently omitted by same-origin discovery. The issuer financial-report labels mix date formats; they cannot safely establish publication dates. Its news page links primarily to third-party coverage. No regulatory connector or validated PDF parser exists here.
- ALV.DE: `https://www.allianz.com/en/investor_relations.html` returned HTTP 403. The second record, no dated releases, is a consequence of denial, not a separate date parsing defect. Access denial remains respected.

The exact source URLs and errors remain immutable in the starting scan's 19 `failedSources` records in `observer/scans.jsonl`.

## Safe changes

- Infer translation filtering from the HTML language only when the root path has no language, and carry that language through discovered RSS/Atom feeds. Unknown language remains unknown. A real-run trace showed Givaudan's mixed-language `/rss` feed was the remaining route to the legacy French article; a page-to-feed regression covers that path.
- Inventory at most four distinct external financial-document links per issuer scan, with the exact `discoveredFrom` URL. Never fetch or parse them, infer their contents, or count them as usable evidence. More links remain explicitly bounded backlog. This reveals previously hidden MAYA/MAGNA and issuer-CDN gaps without broadening network access.
- Classify discovery backlog and external manual-review gaps explicitly. Use `NO_USABLE_IR_EVIDENCE` for the aggregate failure; preserve the underlying HTTP, parsing or format error independently. Historical records remain unchanged.

The failure-record count may increase because previously omitted external documents now appear. That is improved visibility, not expanded verified coverage. Full coverage above 91 requires validated, identity-bound non-US regulatory connectors and complete document processing, not an issuer-only shortcut. The nine incomplete profiles remain fail-closed.

## Validation

49 unit tests, including five new regressions for locale handling, RSS propagation, bounded external-link provenance, unsafe-link rejection and access-failure classification. Existing baseline/source hashes, SEC identity, DNS pinning, redirects, rate limits, append-only journals and health classification tests remain required. A real post-change scan and Pages deployment provide the final measured result.
