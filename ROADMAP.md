# CJ's Pickleball — Execution Roadmap (Next-Agent Plan)

## 1. Project summary

This is a single-page static marketing/site portfolio for CJ's Pickleball. It is implemented with:

- `index.html` as the entry point and content source
- `css/styles.css` for layout, theming, and animations
- `js/main.js` for interaction (menu, navigation, copy, reveal, counters, toasts)
- Static assets in `images/` and `docs/`
- Netlify hosting with `_headers` for response/security headers
- GitHub Actions smoke checks in `.github/workflows/ci.yml`

There are no build, framework, or backend dependencies.

## 2. Current product vision

The page is positioned as a lightweight “community + partner discount” landing site with:

- A clear CTA path from hero to discount deals
- Social connection into Facebook
- Mobile-first navigation and responsive content
- Trust signals via local section structure and copy

## 3. Target users

- Casual and intermediate pickleball players looking for gear discounts
- Partner brands that want their deals represented consistently
- Community members wanting a single place for updates and contact
- Recruiters/clients reviewing frontend craft and product execution

## 4. What appears finished

- Clean, responsive one-pager structure with semantic landmarks
- Scroll-driven navigation behavior and active section highlighting
- Copy-to-clipboard flow with fallback and toast confirmation
- Accessibility upgrades (skip link, focus style, reduced motion support, labeled controls)
- Netlify-oriented security posture and static CSP hash validation in CI
- External link hardening (`rel="noopener noreferrer"` on `_blank` links)
- Local development entrypoint and static deployment path
- A documented security policy

## 5. What appears unfinished

- No local testing commands beyond lint/syntax checks; no screenshot/visual diff checks in repo
- No explicit contributor guide or architecture overview beyond README prose
- No explicit partner-link freshness process (deal/URL governance is manual and implicit)
- No dependency/version pinning process for external font resources
- No explicit accessibility audit artifacts (WCAG checklist or report output)
- No error/analytics monitoring strategy and no runtime telemetry

## 6. What appears broken or risky

- All business-critical links are external. If any partner URL changes, offers silently break.
- SEO and social metadata exist but should be periodically revalidated (especially image URLs and meta titles).
- No unit/integration test harness; regressions in JS behavior depend on visual/manual checks.
- CSP allows inline JSON-LD only via a hardcoded hash; any edit to that block requires synchronized header updates.
- Hero and marquee animation rely on external fonts; render quality depends on font service availability.

## 7. What is duplicated or outdated

- Partner logos/brand names are duplicated across marquee content and visible cards (acceptable for design, but hard to keep consistent).
- Some documentation claims “fully complete polish”; this should be separated from roadmap items that are still pending.
- Build/test guidance in some docs was previously optimistic without explicit command output attached; this is now corrected with explicit command outcomes.

## 8. What hurts maintainability

- `main.js` contains multiple behaviors in a single IIFE, which is fine for size but not documented by domain.
- No changelog or release notes file means operational context is only in commit history.
- Visual and behavioral tuning is not paired with issue tags/checklist items for future validation.
- No local "content audit" checklist for social links and discount updates.

## 9. What hurts user experience

- Hero and marquee content are strong, but there is no lightweight in-repo checklist for copy freshness.
- Mobile back-to-top and fixed controls are currently hidden below tablet breakpoints; this is intentional but should be documented as a UX choice.
- No “loading/error” states are visible because there is no async data; this is acceptable now but should be explicit in future UX decisions.

## 10. What hurts recruiter or GitHub presentation

- README is mostly solid, but it should separate "implemented" vs "planned" claims more clearly.
- Missing: concise “what’s complete / what’s next” section for fast skim.
- Missing: direct roadmap link and explicit command matrix for checks.
- Missing: small screenshot alt/section labels in documentation for a stronger portfolio glance.

## 11. What should be protected and not broken by future agents

- Keep static runtime architecture (`index.html`, `css/styles.css`, `js/main.js`) and avoid introducing a build tool without explicit requirement.
- Preserve CSP and JSON-LD hash synchronization flow.
- Preserve external link safety (`target="_blank"` + `rel` attributes).
- Preserve accessibility baseline classes/behaviors in keyboard and reduced-motion paths.
- Preserve copy-to-clipboard fallback behavior if `navigator.clipboard` is unavailable.
- Preserve responsive behavior at key breakpoints (desktop, 700, 480).

## 12. What next agent should work on first

1. Verify external links and CTA content freshness.
2. Add missing contributor workflow docs.
3. Add one source of truth for partner deals metadata.
4. Add practical preflight checks for visual/structural regressions.
5. Record baseline and update roadmap progress in this file after each milestone.

## 13. Highest priority fixes

### HPF-01: Add explicit verification docs for external dependencies
- **What needs to be done:** Add a short checklist and command for validating all external partner links and metadata.
- **Why it matters:** Many user-facing outcomes depend on external links staying valid.
- **Expected impact:** Reduced broken-link risk and faster release confidence.
- **Difficulty:** Low
- **Risk:** Medium (false positives if target blocks automated checks)
- **Dependencies:** `index.html`, `.github/workflows/ci.yml`
- **Files/folders:** `index.html`, `scripts/` (new optional `scripts/verify-links.sh`), `.github/workflows/ci.yml`
- **Suggested order:** 1
- **Acceptance criteria:** New check runs in CI and in local docs; list of dead/redirected links is visible to maintainers.
- **Tests/checks:** CI local-link script + `curl -I`/`-L` spot checks for partner domains.

### HPF-02: Create a visible roadmap and status section in README
- **What needs to be done:** Keep README current with completion state and roadmap pointer.
- **Why it matters:** Prevents confusion about what is implemented vs planned.
- **Expected impact:** Faster onboarding and stronger portfolio clarity.
- **Difficulty:** Low
- **Risk:** Low
- **Dependencies:** `README.md`, `ROADMAP.md`
- **Files/folders:** `README.md`
- **Suggested order:** 1
- **Acceptance criteria:** README has explicit “What works / Planned / How to verify”.
- **Tests/checks:** Markdown render and link check on `ROADMAP.md`.

## 14. Architecture recommendations

### ARC-01: Preserve lightweight static architecture
- **What needs to be done:** Keep the SPA-like static structure; avoid bundlers unless requirements change.
- **Why it matters:** Lower risk and faster deployment with current small scope.
- **Expected impact:** Reduced maintenance burden and deployment friction.
- **Difficulty:** Low
- **Risk:** Low
- **Dependencies:** All current files
- **Files/folders:** `index.html`, `css/styles.css`, `js/main.js`, `_headers`
- **Suggested order:** Before any future feature work
- **Acceptance criteria:** No build step required for local preview.
- **Tests/checks:** `./scripts/start-local.sh`; `curl` static smoke for required files.

### ARC-02: Add partner-data centralization (content model)
- **What needs to be done:** Store deals metadata in a single maintainable source (even if still rendered as static cards for now).
- **Why it matters:** Reduces duplication and inconsistency between marquee, count badges, and card copy.
- **Expected impact:** Lower content drift and faster updates.
- **Difficulty:** Medium
- **Risk:** Medium (schema changes if future rendering is added)
- **Dependencies:** `index.html`, potential lightweight data file
- **Files/folders:** `index.html`, `docs/` or `scripts/` (for data source), optional `js/main.js`
- **Suggested order:** 2
- **Acceptance criteria:** One place to update partner count and labels with no duplicated edits in markup.
- **Tests/checks:** Visual check of deals count badges and card list alignment.

## 15. Refactor recommendations

### REF-01: Add small JS behavior sections in comments
- **What needs to be done:** Add concise module-like comments around major behaviors in `main.js` (navigation, copy, reveal, counters).
- **Why it matters:** Reduces onboarding time while avoiding functional refactor.
- **Expected impact:** Better maintainer comprehension without behavior change.
- **Difficulty:** Low
- **Risk:** Low
- **Dependencies:** `js/main.js`
- **Files/folders:** `js/main.js`
- **Suggested order:** 2
- **Acceptance criteria:** Future agent can locate and adjust one behavior without scanning entire file.
- **Tests/checks:** `node --check js/main.js`

### REF-02: Add metadata notes for non-obvious CSS constants
- **What needs to be done:** Add header comments for critical CSS variables and layout guardrails (`--nav-height`, overflow clamp, marquee behavior).
- **Why it matters:** Prevents accidental mobile regressions during polish passes.
- **Expected impact:** Safer future UI edits.
- **Difficulty:** Low
- **Risk:** Low
- **Dependencies:** `css/styles.css`
- **Suggested order:** 2
- **Acceptance criteria:** New engineer can identify layout-sensitive variables quickly.
- **Tests/checks:** Static visual check at 320 / 700 / desktop widths.

## 16. UI and UX recommendations

### UX-01: Document intentional UI choices
- **What needs to be done:** Clarify in ROADMAP/README which behaviors are intentional vs accidental (e.g., mobile back-to-top visibility policy).
- **Why it matters:** Prevents scope creep during design passes.
- **Expected impact:** Better design consistency across updates.
- **Difficulty:** Low
- **Risk:** Low
- **Dependencies:** `ROADMAP.md`, `README.md`
- **Suggested order:** 1
- **Acceptance criteria:** No ambiguous UX behavior listed without rationale.
- **Tests/checks:** Human review with 320/700/desktop snapshots.

### UX-02: Add copy freshness indicators
- **What needs to be done:** Add dated notes next to deal cards or top banner indicating last link-content review date.
- **Why it matters:** Users and maintainers can trust content recency.
- **Expected impact:** Reduced support risk for stale offers.
- **Difficulty:** Low
- **Risk:** Low
- **Dependencies:** `index.html`
- **Suggested order:** 3
- **Acceptance criteria:** Last-checked date is visible and understandable.
- **Tests/checks:** Manual spot check after content updates.

## 17. Performance recommendations

### PERF-01: Reduce external font dependency risk
- **What needs to be done:** Keep font loading strategy explicit with fallback and optional preconnect verification.
- **Why it matters:** Prevents layout jumps when Google Fonts fails or is blocked.
- **Expected impact:** Better resilience, fewer CLS surprises.
- **Difficulty:** Low
- **Risk:** Low
- **Dependencies:** `index.html`
- **Suggested order:** 3
- **Acceptance criteria:** Brand typography degrades safely with existing fallback fonts.
- **Tests/checks:** Offline/blocked font simulation check in browser.

### PERF-02: Keep animation scope bounded
- **What needs to be done:** Continue honoring `prefers-reduced-motion` and avoid adding new unbounded animations.
- **Why it matters:** Maintains battery/performance and accessibility baseline.
- **Expected impact:** Stable 60fps envelope on lower-end devices.
- **Difficulty:** Low
- **Risk:** Low
- **Dependencies:** `css/styles.css`, `js/main.js`
- **Suggested order:** Ongoing
- **Acceptance criteria:** No new animation path breaks reduced-motion behavior.
- **Tests/checks:** `prefers-reduced-motion` manual check + basic performance spot checks.

## 18. Security recommendations

### SEC-01: Maintain CSP/JSON-LD hash synchronization discipline
- **What needs to be done:** Keep hash verification process documented and mandatory for any inline script JSON-LD edits.
- **Why it matters:** Protects CSP integrity and avoids deploy breakage.
- **Expected impact:** Fewer accidental security regressions.
- **Difficulty:** Medium
- **Risk:** Low
- **Dependencies:** `index.html`, `_headers`
- **Suggested order:** Always before PR merge
- **Acceptance criteria:** CI fails on stale hash and blocks merge.
- **Tests/checks:** Existing hash check script in CI.

### SEC-02: Add security header review cadence
- **What needs to be done:** Add a short checklist step for reviewing `_headers` after any policy change.
- **Why it matters:** Easy to miss policy updates.
- **Expected impact:** Consistent security posture over time.
- **Difficulty:** Low
- **Risk:** Low
- **Dependencies:** `_headers`, `.github/workflows/ci.yml`
- **Suggested order:** 2
- **Acceptance criteria:** Header changes are documented per merge.
- **Tests/checks:** CI pass + manual header snippet diff review.

## 19. Accessibility recommendations

### A11Y-01: Validate keyboard and landmark integrity
- **What needs to be done:** Perform an explicit keyboard-only walk-through and confirm all interactive controls are reachable.
- **Why it matters:** Current patterns are good but undocumented.
- **Expected impact:** Better confidence for inclusive users.
- **Difficulty:** Medium
- **Risk:** Medium (requires careful manual review)
- **Dependencies:** `index.html`, `css/styles.css`, `js/main.js`
- **Suggested order:** 1
- **Acceptance criteria:** All controls reachable and focus-visible at each breakpoint.
- **Tests/checks:** Manual keyboard audit using Tab/Shift+Tab, focus ring visibility.

### A11Y-02: Run periodic contrast and semantics review
- **What needs to be done:** Document minimum contrast checks and semantic heading order checks in roadmap.
- **Why it matters:** Maintains readability and assistive technology quality.
- **Expected impact:** Reduced accessibility regressions.
- **Difficulty:** Medium
- **Risk:** Low
- **Dependencies:** `index.html`, `css/styles.css`
- **Suggested order:** 2
- **Acceptance criteria:** Headings and color contrast stay within target thresholds.
- **Tests/checks:** Axe/Playwright accessibility audit (optional if tooling is added).

## 20. SEO recommendations

### SEO-01: Keep social metadata and canonical values current
- **What needs to be done:** Verify `og:*`, `twitter:*`, canonical, and JSON-LD content on each meaningful content update.
- **Why it matters:** Discoverability and sharing quality depend on accurate metadata.
- **Expected impact:** Stable social previews and indexing quality.
- **Difficulty:** Low
- **Risk:** Low
- **Dependencies:** `index.html`
- **Suggested order:** 2
- **Acceptance criteria:** Link previews reflect current page title/hero copy and reachable image URL.
- **Tests/checks:** Social card sanity check and URL canonical review.

### SEO-02: Add structured content consistency note
- **What needs to be done:** Ensure partner and section names are consistent between visible text and hidden JSON-LD context.
- **Why it matters:** Improves search parser consistency and reduces confusion.
- **Difficulty:** Low
- **Risk:** Low
- **Dependencies:** `index.html`
- **Suggested order:** 2
- **Acceptance criteria:** No conflicting organization/sitelink references.
- **Tests/checks:** Manual page metadata review.

## 21. Testing strategy

### TEST-01: Keep lightweight pre-flight checks mandatory
- **What needs to be done:** Use static checks before merge and include output in PR notes.
- **Why it matters:** This is a static site; static checks are high-value and cheap.
- **Expected impact:** Catch broken references and syntax issues early.
- **Difficulty:** Low
- **Risk:** Low
- **Dependencies:** `.github/workflows/ci.yml`
- **Suggested order:** 0 (ongoing)
- **Acceptance criteria:** All smoke checks pass on clean repo.
- **Checks to run:**  
  - `test -f _headers index.html css/styles.css js/main.js images/hero-court.jpg images/logo.png docs/screenshot.jpg`
  - `node --check js/main.js`
  - CSP hash validation in existing CI script
  - local link/reference validation script

### TEST-02: Add optional visual sanity targets
- **What needs to be done:** Keep a documented browser test route (dev server screenshot URLs) for desktop/mobile.
- **Why it matters:** Static behavior can regress visually without syntax failures.
- **Expected impact:** Fewer UX surprises before merge.
- **Difficulty:** Medium
- **Risk:** Low
- **Dependencies:** `README.md`, local dev environment
- **Suggested order:** 2
- **Acceptance criteria:** New baseline screenshots for main sections are updated when styling changes.
- **Tests/checks:** Manual review at `desktop`, `700px`, and `480px` widths.

## 22. CI/CD and deployment recommendations

### CI-01: Keep CI purpose narrow and stable
- **What needs to be done:** Continue current CI scope and avoid broad test-framework additions unless needed.
- **Why it matters:** Current repo has no build pipeline; CI should remain reliable.
- **Expected impact:** Fast signals and low false-positive rate.
- **Difficulty:** Low
- **Risk:** Low
- **Dependencies:** `.github/workflows/ci.yml`
- **Suggested order:** Ongoing
- **Acceptance criteria:** CI catches syntax/hash/reference regressions on push and PR.
- **Tests/checks:** Push/PR pass in GitHub Actions.

### CI-02: Add an explicit pre-deploy checklist
- **What needs to be done:** Add a small deployment checklist in ROADMAP or README: image links, deal links, socials.
- **Why it matters:** Netlify deploy is fast but human review quality is variable.
- **Expected impact:** Better release confidence.
- **Difficulty:** Low
- **Risk:** Low
- **Dependencies:** `README.md`, `ROADMAP.md`
- **Suggested order:** 1
- **Acceptance criteria:** Checklist exists and is used in pull requests.
- **Tests/checks:** Reviewer signoff after checklist completion.

## 23. Documentation improvements

- Keep README and ROADMAP as the source of truth for status.
- Add a short “Known constraints” section to README.
- Add explicit project status tags (implemented/planned/blocked).
- Add direct links for:
  - Live site
  - Deployment settings
  - CI workflow
  - Security policy

## 24. GitHub presentation improvements

- Ensure repository root has:
  - concise one-paragraph project summary
  - links and badges that still resolve
  - screenshot preview with a current image path
- Add issue labels/automation hints for content maintenance tasks (e.g., `content-refresh`, `security`, `accessibility`).
- Make “roadmap-driven” commits visible by referencing section IDs in commit summaries.

## 25. Recruiter and portfolio polish

- Keep a clean separation between “production-ready” and “planned polish” so external reviewers can quickly assess impact.
- Add a small “Built with” and “Key decisions” list in README front matter.
- Include live verification command block that can be run in under 30 seconds.
- Add an explicit “notable risks” section (security and external dependency assumptions).

## 26. Future feature ideas (non-blocking)

- Optional contact form replacement for social-only CTA.
- Optional CMS-lite content list for deals (still static-rendered).
- Optional lightweight A/B toggles for featured code visibility.
- Optional auto-validating offer links via scheduled checks.

These are intentionally out of current scope and should only be implemented if product direction changes.

## 27. Production readiness checklist

- [ ] Required assets and links exist
- [ ] `node --check js/main.js` passes
- [ ] CSP hash and `_headers` synchronized
- [ ] External links reviewed for active redirects/breakage
- [ ] Mobile breakpoint checks completed (480 and 700)
- [ ] Accessibility focus and copy flow manually validated
- [ ] README and ROADMAP updated before merge

## 28. Suggested milestone order

1. Documentation corrections and verification discipline (HPF-02, CI-02)
2. External link governance and content freshness (HPF-01, SEC-01)
3. Accessibility and UX clarity passes (A11Y-01, UX-01)
4. Optional centralization of partner data (ARC-02)
5. CI + release checklist hardening (CI-01, CI-02)

## 29. Current Verification Status

Executed on: 2026-05-26

- `node --check js/main.js`
  - Result: pass
  - Error summary: none
  - Likely pre-existing: yes (expected for current commit state)
  - Next-agent recommendation: keep this command in pre-change checklist
- `test -f ...` required files command
  - Result: pass
  - Error summary: none
  - Next-agent recommendation: run before each change set
- `node` CSP hash verification script
  - Result: pass (`sha256-lZPivY3JWl3OGRT...` present in `index.html` and `_headers`)
  - Error summary: none
  - Next-agent recommendation: re-run after any JSON-LD edit
- local asset/reference check script (copied from CI logic)
  - Result: pass
  - Error summary: none
  - Next-agent recommendation: add optional redirect awareness for external URLs

## 30. Next Agent Instructions

1. First five tasks
   1. Open `README.md` and `ROADMAP.md` to verify this documentation baseline.
   2. Run the commands in Current Verification Status and confirm all pass.
   3. Review external links in `index.html` for any expired or redirected URLs.
   4. Add content governance checklist for deals/follow links.
   5. Add a pre-merge PR review checklist and reference this file in commit notes.

2. Files likely involved
   - `ROADMAP.md`
   - `README.md`
   - `index.html` (for content/governance updates if needed)
   - `.github/workflows/ci.yml` (if checks are added/expanded)

3. Commands to run before making changes
   - `node --check js/main.js`
   - `test -f _headers && test -f index.html && test -f css/styles.css && test -f js/main.js && test -f images/hero-court.jpg && test -f images/logo.png && test -f docs/screenshot.jpg`
   - CSP hash validation script used in CI

4. Commands to run after making changes
   - `node --check js/main.js`
   - run `git diff --check`
   - local CI-similar smoke checks for assets/links
   - if external link updates are made, add a quick manual link spot-check on major sections

5. Tests to verify
   - required-file check
   - local link/reference check
   - CSP hash validation (if HTML JSON-LD changed)
   - manual responsive spot-check at common breakpoints

6. What not to break
   - `logoImg` fallback behavior
   - back-to-top and scroll-reveal baseline behavior
   - `rel="noopener noreferrer"` on `_blank` links
   - CSP + JSON-LD hash sync

7. When to stop and ask for human review
   - If external partner URLs change materially or require policy/legal review
   - If adding scripts/build tooling
   - If accessibility or SEO checks fail

8. Recommended first commit message
   - `docs: add roadmap for next agent`
