# Technical SEO Audit: criarsinculpas.com

Date: 2026-06-29
Scope: Static HTML/CSS/JS site on Cloudflare Pages, bilingual (Spanish primary, English via client-side toggle), Plausible analytics installed.

No redesign was performed. No content was removed. Only low-risk indexing and metadata fixes were implemented (see "Fixes implemented in this pass"). Everything else is recommended, not applied.

---

## Executive summary

The site is in good technical shape overall: clean directory URLs, self-referential canonicals on most pages, unique and descriptive titles, present meta descriptions, a single H1 per public page, and intentional `noindex` on internal drafts. Spanish (the primary language) renders in the static HTML, so Google can read the main content without running the language toggle.

The main gaps are:

1. No `robots.txt`.
2. `sitemap.xml` is incomplete: it omits the four support guides (the strongest content on the site) and the public `/descargo` page.
3. The homepage is missing `og:description`, `og:image`, and the entire Twitter Card block, so social shares of the most important URL have no image/description.
4. One canonical bug on `/aprende/Los-primeros-5/` (it points at `/aprende/`, which has no page). This needs a decision before changing.
5. Accessibility: most public pages set `maximum-scale=1, user-scalable=0`, which blocks pinch-zoom (WCAG 1.4.4 / 1.4.10 failure).
6. Structured data is minimal (only an `ImageObject` on `/metodo/`). No `Organization`, `WebSite`, or `Person` schema.

The bilingual setup is single-URL (one URL serves both languages via JS). That is a valid choice; do NOT add hreflang. English text lives in `data-en` attributes and is not separately indexable, which is acceptable but worth a conscious decision (see Bilingual section).

---

## Site map of pages (as found)

Public, indexable (no robots meta = indexable):
- `/` (index.html)
- `/apoyo/` (hub)
- `/apoyo/screen-time`, `/apoyo/emotional-escalation`, `/apoyo/bedtime-resistance`, `/apoyo/sibling-conflict` (the four guides)
- `/metodo/`
- `/inscripcion/`
- `/sobre-nari/`
- `/privacidad/`
- `/aprende/Los-primeros-5/`
- `/descargo` (explicitly `index,follow`)

Intentionally `noindex` (internal/draft, correctly excluded from sitemap):
- `/inscripcion/inscripcion.html`, `/inscripcion/editorial.html`, `/portal/`, `/presentacion/`, `/strategy-ledger/`, `/bio.html`

Redirect stubs / duplicates (title "Redirecting…"):
- `home.html` (canonical `/`), `bio.html` (canonical `/sobre-nari/`, noindex), `inscripcion/inscripcion-page.html` (canonical `/inscripcion/`)

Internal artifacts (decks, reports, brand books, worksheets, infographics) - not part of the public site, no Plausible snippet, out of SEO scope.

---

## Critical issues

### C1. Canonical mismatch on `/aprende/Los-primeros-5/` (RESOLVED)
`aprende/Los-primeros-5/index.html` previously declared `rel=canonical` = `https://criarsinculpas.com/aprende/`, but there is no `/aprende/index.html`. The page's real URL is `/aprende/Los-primeros-5/`. Pointing the canonical at a non-existent URL can stop the real page from being indexed.
- Decision: keep the page at its real URL for now. Canonical updated to `https://criarsinculpas.com/aprende/Los-primeros-5/` (self-referential). Not routed to `/aprende/` (would require creating a real `/aprende/` hub page later).
- Fixed. Affected file: `aprende/Los-primeros-5/index.html`.

### C2. Incomplete sitemap (fixed in this pass)
`sitemap.xml` listed only 6 URLs and omitted the 4 support guides, `/descargo`, and `/aprende/Los-primeros-5/`. Those guides are the most search-relevant content. All are now included (the `/aprende/` guide was added after its canonical was corrected in C1).

### C3. No robots.txt (fixed in this pass)
There was no `robots.txt` to point crawlers at the sitemap or set allow rules.

---

## High-priority fixes

### H1. Homepage social/SEO metadata (fixed in this pass)
`index.html` had `og:title/url/site_name/type` but was missing `og:description`, `og:image` (+ width/height/alt), and the whole Twitter Card block. Added using the existing site brand image and the existing meta description (no new claims).

### H2. Structured data: Organization + WebSite + Person (fixed in this pass)
Added `Organization` + `WebSite` JSON-LD to the homepage and `Person` JSON-LD for Nari on `/sobre-nari/`, using only facts already on the site (name, role, URLs, logo/favicon). No awards, ratings, reviews, or invented data.

### H3. Accessibility viewport (fixed in this pass, public pages)
Removed `maximum-scale=1, user-scalable=0` from the viewport on indexable public pages so users can pinch-zoom (WCAG 1.4.4 / 1.4.10). This is the only "styling-adjacent" change made, and it is an accessibility requirement.

---

## Medium-priority fixes

### M1. Twitter Card gaps (partly fixed)
- `/sobre-nari/`: had `og:image` but no `twitter:card`/`twitter:image`. Fixed.
- `/inscripcion/`: had `og:image` + `twitter:image` (using `property=` instead of `name=`) but no `twitter:card`, and no `og:image:width/height/alt`. Fixed (added `twitter:card`, normalized).
- `/aprende/Los-primeros-5/`: had no `og:image`/Twitter image. Fixed (added the brand image).

### M2. Canonical trailing-slash consistency (recommended, not all applied)
- `index.html` canonical was `https://criarsinculpas.com` (no slash); sitemap uses `/`. Normalized homepage canonical/og:url to trailing slash.
- `privacidad/index.html` canonical was `https://criarsinculpas.com/privacidad` (no slash) while sitemap uses `/privacidad/`. Aligned to `/privacidad/` (served directory URL). Fixed.

### M3. Redirect stub duplicates and stray backup (RESOLVED - removed)
`home.html`, `inscripcion/inscripcion-page.html`, and `apoyo/index_backup5262026.html` were stray deployable files. The first two are "Redirecting…" stubs duplicating `/` and `/inscripcion/`; the third is a dated backup of the apoyo hub that could be crawled/indexed if deployed.
- Verified none are referenced by any internal link or by a `_redirects`/`_headers` file (no such files exist). Only this audit doc referenced them by name.
- Decision: removed all three (unreferenced, so deletion does not break links). The canonical homepage is `index.html`; `/inscripcion/` is served by `inscripcion/index.html`.

---

## Nice-to-have improvements

- N1. Add `og:locale` = `es_ES` (or `es_MX`) to pages for clearer locale signaling.
- N2. Add `BreadcrumbList` JSON-LD on the guide pages (`/apoyo/<slug>`) to reinforce hierarchy.
- N3. Consider `Article` schema on the four guides only if you treat them as articles (they are practical guides; `HowTo` could also fit, but only if steps are explicit and stable). Hold until content model is confirmed.
- N4. Internal linking: confirm each guide links back to the `/apoyo/` hub and to `/metodo/` and `/inscripcion/` with descriptive anchors (cross-links exist between guides via `cross_nav`). The homepage links to `/apoyo/`, `/metodo/`, and `/inscripcion/`, which is good.
- N5. Decide on English indexation: if English organic traffic matters, separate `/en/` URLs with hreflang would be required. Current single-URL toggle keeps only Spanish indexable.

---

## Structured data plan (safe, facts-only)

Implemented now:
- Homepage: `Organization` (name, url, logo=favicon, description, founder=Nari Fateha) + `WebSite` (name, url, inLanguage es).
- `/sobre-nari/`: `Person` (name "Nari Fateha", role founder/educator, worksFor Criar Sin Culpas, url).

Deferred (need confirmation): `Article`/`HowTo` on guides, `BreadcrumbList`, `FAQPage` (only if a visible FAQ block exists - none found, so not added).

---

## Page structure findings

- Exactly one H1 on every public page. Good.
- H2/H3 hierarchy is logical on the audited pages.
- Anchor text on primary nav/CTAs is descriptive ("Conocer el método", "Entrar al espacio de apoyo", "Quiero pre-inscribirme"). Good.
- Primary routes are reachable via crawlable `<a href>` links from the homepage and shared nav/footer components.

## Bilingual findings

- Single URL per page; `<html lang="es">`; Spanish is the default rendered text in static HTML (crawlable). English is in `data-en` attributes applied by JS.
- Correct decision: NO hreflang (there are no separate language URLs). Adding hreflang here would be incorrect.
- Google indexes the Spanish content. English is not separately indexable by design.

## Performance / accessibility findings

- Viewport zoom blocked on most pages (fixed for public pages, see H3).
- Hero images are served via Cloudinary with `q_auto,f_auto` (good). The inscripcion hero uses `loading="eager"` (correct for LCP); below-the-fold images use `loading="lazy"`.
- `og:image` dimensions (1200x630) are declared on most pages. Good.
- Recommend a manual alt-text pass: alt attributes are present on audited hero images, but a full sweep across all `<img>` was not exhaustively verified. Flagged for manual review.

---

## Implementation plan

### Phase 1 - Technical indexing (low risk, mostly done here)
- Create `robots.txt` with sitemap reference. (done)
- Complete `sitemap.xml` (guides + `/descargo`). (done)
- Resolve `/aprende/Los-primeros-5/` canonical (C1). (pending your decision)
- Normalize canonical trailing slashes (M2). (homepage done; privacidad pending)

### Phase 2 - Metadata + structured data (low risk, mostly done here)
- Homepage OG/Twitter completion. (done)
- sobre-nari / inscripcion / aprende Twitter + OG image. (done)
- Organization + WebSite + Person JSON-LD. (done)
- og:locale, BreadcrumbList (nice-to-have). (pending)

### Phase 3 - Internal linking + content
- Confirm guide-to-hub and guide-to-method/inscripcion links with descriptive anchors.
- Decide English indexation strategy (single URL vs `/en/`).
- Review thin/duplicate stubs (`home.html`, `inscripcion-page.html`).

---

## Files affected

Fixed in this pass:
- `robots.txt` (new)
- `sitemap.xml`
- `index.html`
- `sobre-nari/index.html`
- `inscripcion/index.html`
- `aprende/Los-primeros-5/index.html`
- `metodo/index.html`, `apoyo/index.html`, `apoyo/screen-time.html`, `apoyo/emotional-escalation.html`, `apoyo/sibling-conflict.html`, `apoyo/bedtime-resistance.html`, `privacidad/index.html` (viewport accessibility only)

Also fixed (second pass, per decisions):
- `aprende/Los-primeros-5/index.html` canonical -> real URL (C1)
- `privacidad/index.html` canonical -> trailing slash (M2)

Removed (second pass, unreferenced stray files, M3):
- `home.html`
- `inscripcion/inscripcion-page.html`
- `apoyo/index_backup5262026.html`

## TODO (open items)
- `Organization.sameAs`: add official Criar Sin Culpas social profile URLs (Instagram, etc.) once confirmed. Not added yet to avoid fabrication.
- English SEO (`/en/` URLs + hreflang): Phase 3, requires a separate routing/content decision. Not started.

---

## Questions / assumptions

1. `/aprende/Los-primeros-5/`: do you want this guide to live at `/aprende/` (routing change) or keep the current URL (then I fix the canonical to the current URL)?
2. Official social profile URLs for Criar Sin Culpas (Instagram, etc.): not added to `Organization.sameAs` because I could not confirm them from the site. Provide them and I will add `sameAs`.
3. English SEO: is ranking in English a goal? If yes, this needs separate URLs + hreflang (Phase 3).
4. Brand logo: I used the site favicon as `Organization.logo`. If you have a dedicated square logo asset, provide it.

## Final verification (this pass)

- No `package.json` / build tooling exists (static site on Cloudflare Pages), so `npm run lint` / `npm run build` are not applicable. Used the editor linter instead: no errors on edited files.
- Local server route check: all 12 sitemap URLs return 200 (directory URLs via `index.html`; clean file URLs verified via their `.html` source, which Cloudflare Pages serves at the extensionless path), plus `/robots.txt` and `/sitemap.xml` return 200.
- No sitemap URL carries `noindex` (the `noindex` pages are internal drafts and are excluded from the sitemap).
- Canonicals on all sitemap pages are self-referential to a real 200 URL (C1 and M2 fixes confirmed).

## What still needs manual review before deployment

- Decide C1 (aprende canonical) and re-run.
- Full alt-text sweep across all images.
- Verify the four guides have descriptive back-links to `/apoyo/` and `/metodo/`.
- Confirm the homepage OG image is the brand image you want shown in social previews.
- Validate JSON-LD in Google Rich Results Test after deploy.
