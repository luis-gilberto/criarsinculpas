# SEO State of the Union — criarsinculpas.com

Inspection-only audit. No files were modified, no commits, no pushes.
Date of audit: 2026-06-30. Method: full static inspection of every `.html` file in
the repository, `robots.txt`, `sitemap.xml`, the JS-injected nav/footer components,
and the recent git history.

Severity legend: **Critical** (blocks indexing or actively harms ranking) ·
**High** (meaningful ranking or crawl impact) · **Medium** (quality/hygiene, moderate
impact) · **Low** (polish, near-zero ranking impact).

---

## Page inventory (ground truth)

### Public, indexable pages (12)
| URL | Title | Meta description | Canonical | OG image | Twitter card | JSON-LD | H1 | Viewport |
|---|---|---|---|---|---|---|---|---|
| `/` | yes | generic (duplicated) | `/` | yes (1200x630) | yes | Organization + WebSite | 1 | clean |
| `/apoyo/` | yes | generic (duplicated) | `/apoyo/` | yes | yes | none | 1 | clean |
| `/apoyo/screen-time` | unique | unique | no-slash | yes | yes | none | 1 | clean |
| `/apoyo/emotional-escalation` | unique | unique | no-slash | yes | yes | none | 1 | clean |
| `/apoyo/bedtime-resistance` | unique | unique | no-slash | yes | yes | none | 1 | clean |
| `/apoyo/sibling-conflict` | unique | unique | no-slash | yes | yes | none | 1 | clean |
| `/metodo/` | yes | unique | `/metodo/` | yes | yes | ImageObject | 1 | clean |
| `/sobre-nari/` | yes | unique | `/sobre-nari/` | yes | yes | Person | 1 | clean |
| `/inscripcion/` | yes (bilingual) | unique (bilingual) | `/inscripcion/` | yes (no w/h) | yes | none | 1 | clean |
| `/aprende/Los-primeros-5/` | generic ("Aprender") | unique (bilingual) | self | yes | yes | none | 1 | clean |
| `/descargo` | yes | **missing** | `/descargo` | none | none | none | 1 | clean |
| `/privacidad/` | yes | yes | `/privacidad/` | none | none | none | 1 | clean |

### Intentionally non-indexed pages (correct, `noindex`)
`portal/index.html`, `presentacion/index.html`, `strategy-ledger/index.html`,
`inscripcion/inscripcion.html`, `inscripcion/editorial.html`, `bio.html` (noindex +
redirect to `/sobre-nari/`).

### Stray HTML in the repo that is NOT noindexed and NOT in the sitemap (orphan risk)
`apoyo/ui-cinematic-mockup.html`, `apoyo/strategyiq-criar-sin-culpas-infographic.html`,
`strategy-ledger/shot-list.html`, `worksheets/modulo-01.html`, `worksheets/modulo-02.html`,
`brand.html`, `journey-standalone.html`, `csc-signal-brief.html`, `csc-signal-report.html`,
`csc-fase1-notes.html`, `csc-fase1-deck.html`, `csc-reporte-progreso.html`,
`csc-reporte-trafico.html`, `assets/CSC_Brand_Assets/02_Brand_Book/CSC_BrandBook_Complete.html`,
`inscripcion/inscripcion-page.html` (a "Redirecting..." stub, canonical to `/inscripcion/`,
but **no** `noindex`).

---

# PART 1 — Current SEO State

### robots.txt — **Low (healthy)**
Present and correct:
```
User-agent: *
Allow: /
Sitemap: https://criarsinculpas.com/sitemap.xml
```
No accidental `Disallow`. Sitemap is declared. Nothing blocking crawl.

### sitemap.xml — **Medium**
Lists the 12 public URLs and nothing harmful. Issues:
- No `<lastmod>`, `<changefreq>`, or `<priority>` (optional, but `lastmod` genuinely
  helps recrawl scheduling). **Low.**
- The four guide URLs are listed **without** the `.html` extension and **without** a
  trailing slash (`/apoyo/screen-time`). This matches their canonicals (good internal
  consistency), but it depends on Cloudflare Pages serving the clean URL with a 200 and
  301-ing the `.html` variant. This needs a live verification against production (see
  Part 3). **Medium until verified.**
- `/aprende/Los-primeros-5/` is in the sitemap but is an orphan in the link graph
  (see Internal linking). **Medium.**

### Canonical implementation — **High (mostly good, two inconsistencies)**
- All 12 public pages have a self-referential absolute canonical. Good.
- **Trailing-slash policy is inconsistent across the site:** directory pages use a
  trailing slash (`/apoyo/`, `/metodo/`, `/sobre-nari/`, `/inscripcion/`, `/privacidad/`,
  `/aprende/Los-primeros-5/`), while the four guides and `/descargo` use **no** trailing
  slash. This is internally consistent (canonical == sitemap) but the mixed convention is
  fragile: any inbound link or CMS that adds/removes a slash creates a soft duplicate that
  relies on Cloudflare normalization. **Medium.**
- Redirect stubs (`bio.html`, `inscripcion/inscripcion-page.html`) carry canonicals to
  their destinations, which is fine, but `inscripcion-page.html` lacks `noindex`. **Low.**

### Page titles — **High (excellent)**
Every public page has a descriptive, keyword-relevant, bilingual `<title>` (Spanish
default text in the node, plus `data-es`/`data-en`). The guide titles are especially
strong and query-shaped, e.g. "Pantallas: cómo ayudarlos a soltar sin pelear",
"Hora de irse a dormir. Cómo mantenerte firme sin pelear". Only weak spot:
`/aprende/Los-primeros-5/` has a generic title ("Criar Sin Culpas · Aprender") that does
not match its strong content ("Los Primeros 5 Minutos"). **Medium for that one page.**

### Meta descriptions — **Medium**
- Guides, `metodo`, `sobre-nari`, `inscripcion`, `privacidad` all have unique, well-written
  descriptions.
- **`/` (home) and `/apoyo/` share the identical description** ("Un sistema de apoyo
  emocional para padres. Encuentra calma, claridad y herramientas prácticas..."). Duplicate
  meta descriptions on two of your most important pages. **Medium.**
- **`/descargo` has no meta description.** Low value page, but it is `index,follow`. **Low.**

### Open Graph — **Medium**
- 10 of 12 public pages have a complete OG block (title/description/url/type/image,
  most with `image:width/height/alt`).
- `/inscripcion/` OG image is present but **missing `og:image:width`/`height`** (minor
  share-rendering nit). **Low.**
- **`/privacidad/` and `/descargo` have no OG/Twitter tags at all.** Low-value legal pages,
  so low impact. **Low.**
- Most pages share the same generic OG image (the brand card). Fine, but the guides could
  each use a topic-specific share image for better social CTR. **Low (enhancement).**

### Twitter cards — **Medium**
Same coverage as OG: present on the 10 content pages (`summary_large_image`), absent on
the two legal pages. **Low.**

### Structured data (JSON-LD) — **Medium**
- Present: `Organization` + `WebSite` on `/`, `Person` on `/sobre-nari/`, `ImageObject`
  on `/metodo/`.
- **Missing where it would actually help:** the four guides are textbook candidates for
  `Article` or `HowTo` schema; `/apoyo/` is a candidate for `CollectionPage` +
  `BreadcrumbList`; `BreadcrumbList` is missing site-wide. No `FAQPage` anywhere (only add
  if/when visible FAQ content exists). `Organization.sameAs` (social profiles) is still a
  documented TODO. **Medium (opportunity, not a defect).**

### Language handling — **High (correct for the chosen model)**
- Bilingual is a **same-URL client toggle**: Spanish is the default text rendered in the
  HTML, English lives in `data-en` attributes and is swapped by JS (`localStorage` key
  `lg_parent_lang`). `document.documentElement.lang` is updated on toggle.
- This is the right call: Spanish is the crawlable primary content (no reliance on JS for
  the indexable copy), and there are **no separate `/en/` URLs**, so the absence of
  `hreflang` is correct (adding it would be wrong here). **Healthy.**
- Caveat: English content is effectively invisible to search (it is in attributes only).
  That is fine while you are targeting Spanish; English SEO would require separate URLs
  (Phase 3 decision, not a bug).

### Internal linking — **High (one real gap)**
- The primary nav (`js/site-nav.js`) links `/`, `/apoyo/`, `/metodo/`, `/inscripcion/`,
  `/sobre-nari/` on every page. "Aprende" and "Comunidad" are present but **disabled**
  ("Pronto", `href="#"`).
- The homepage and `/apoyo/` both link out to all four guides; the guides cross-link to
  each other ("cp-link"). Good topical hub-and-spoke for the guides.
- **`/aprende/Los-primeros-5/` is an orphan**: nothing in the HTML links to it (it only
  appears in its own canonical). It is reachable only via the sitemap. Orphan pages get
  weak crawl priority and almost no internal PageRank. **High** for that page.
- **Internal links are injected by client-side JS** (nav and footer are rendered by
  `site-nav.js` / `site-footer.js`). Googlebot renders JS, so these are generally
  discovered, but the most important internal links not existing in the raw HTML is a
  resilience risk (render budget, JS failures). The in-content guide links (home, hub,
  cross-links) ARE in static HTML, which mitigates this for the guides. **Medium.**

### Image alt text — **High (very good)**
- Content images on public pages have descriptive, bilingual alt text (`alt` +
  `data-alt-es`/`data-alt-en`): Nari portraits, the puzzle/parenting photos, hero shots.
- Decorative logos correctly use `alt=""`.
- No public-page content image was found missing alt. **Healthy.**

### Crawlability — **High**
- All public content (the actual copy and headings) is in static server-rendered HTML, not
  JS-generated. Good.
- `robots.txt` allows all; sitemap present; canonicals self-referential.
- Only nav/footer (navigation chrome) depend on JS — see Internal linking. **Medium** there.

### Indexing risks — **Medium**
- ~15 stray HTML files (decks, reports, mockups, worksheets, brand books, photo-direction
  sheets) are deployable, **not** `noindex`, and **not** in the sitemap. They are orphaned
  (no internal links found), so discovery risk is low, but each is a publicly reachable URL
  that Google can index if it ever finds the link (analytics, external reference, accidental
  link). They are thin/internal/dev content and would dilute site quality if indexed.
  **Medium.**
- `inscripcion/inscripcion-page.html` is a redirect stub without `noindex`. **Low.**

### Duplicate content risks — **Medium**
- `/` and `/apoyo/` share the same meta description (Part 1, Meta descriptions). **Medium.**
- `.html` vs clean-URL vs trailing-slash variants of the same page (resolved by canonical +
  Cloudflare normalization, but verify in production). **Medium until verified.**
- The several "report/deck" stray pages repeat brand boilerplate; only a risk if indexed.
  **Low.**

### Thin content — **Medium**
- The guides and `metodo`/`sobre-nari` are substantive. Good.
- `/aprende/Los-primeros-5/` is good content but orphaned and generically titled.
- `/descargo` and `/privacidad/` are intentionally thin legal pages (acceptable).
- The site has **only 4 indexable "money" content pages** (the guides) plus method/about.
  That is a thin overall footprint for ranking breadth (see Part 5). **Medium.**

### Mobile SEO — **High**
- All 12 public pages use a clean, accessible viewport (`width=device-width,
  initial-scale=1`) with pinch-zoom enabled. Good.
- The only pages still carrying `maximum-scale=1, user-scalable=0` are `noindex`
  (inscripcion.html, editorial.html) plus a couple of stray files (journey-standalone,
  brand) — accessibility nit, not an SEO factor on indexable pages. **Low.**

### Core Web Vitals concerns — **Medium**
- **Positive:** images go through Cloudinary with `f_auto,q_auto` (modern formats, auto
  quality); the LCP hero on `/inscripcion/` uses `loading="eager"` while below-fold images
  use `loading="lazy"`. Good instincts.
- **CLS risk:** most `<img>` tags do **not** declare explicit `width`/`height` (or an
  aspect-ratio), which can cause layout shift as images load. **Medium.**
- **LCP risk:** large PNG source heroes (Cloudinary mitigates via `f_auto`, but PNG sources
  are heavy at origin); confirm the hero is not oversized for mobile. **Low-Medium.**
- **Render-blocking:** Google Fonts (Cormorant Garamond, Inter, DM Sans) plus any CDN CSS
  add request chains; consider `preconnect`/`font-display: swap`. **Low.**
- These are estimates from static inspection; confirm with a live Lighthouse/PSI run.

---

# PART 2 — Comparison Against Modern Google Best Practices (2026)

## Technical SEO

### What is excellent
- Self-referential canonicals on every public page.
- Strong, unique, query-shaped, bilingual `<title>` tags.
- Clean accessible viewport across all indexable pages (pinch-zoom enabled).
- Crawlable static HTML for the actual content (not JS-only rendering of body copy).
- Correct same-URL bilingual model with no incorrect `hreflang`.
- robots.txt + sitemap present and consistent with canonicals.
- Good image alt coverage with bilingual variants.
- Sensible image delivery (Cloudinary `f_auto/q_auto`, eager LCP / lazy below-fold).

### What is acceptable
- Sitemap without `lastmod` (works, just suboptimal recrawl signal).
- Shared generic OG image across pages (works; topic-specific would lift social CTR).
- JSON-LD coverage on the top three entity pages (Org/WebSite/Person/ImageObject).
- Mixed trailing-slash convention (works **because** canonicals match, but fragile).

### What is missing
- `Article`/`HowTo` schema on the guides; `BreadcrumbList` site-wide; `CollectionPage`
  on the hub.
- `noindex` (or removal) on ~15 stray internal/dev HTML files.
- Internal link to the orphaned `/aprende/Los-primeros-5/` page.
- Unique meta description for `/apoyo/` (currently duplicates the homepage).
- Meta description (and basic OG) for `/descargo`.
- Explicit image dimensions/aspect-ratio to protect CLS.
- `Organization.sameAs` social profiles (documented TODO).

### What could actually improve rankings (ranked)
1. **More indexable, query-targeted guide content** (breadth). This is the single biggest
   lever — see Part 5.
2. **Fix the orphan + add internal links / breadcrumbs** so crawl equity flows to deep
   pages.
3. **Unique titles/descriptions everywhere** (kill the home/hub duplicate; retitle the
   `Los-primeros-5` page to its real topic).
4. **`Article`/`HowTo` + `BreadcrumbList` schema** on guides for richer SERP treatment.
5. **CLS/LCP hardening** (dimensions, hero sizing) for the page-experience signal.

### What would have near-zero ranking impact (don't over-invest)
- Adding `priority`/`changefreq` to the sitemap.
- Per-page custom OG images (helps social CTR, not organic rank).
- `user-scalable` cleanup on noindex pages.
- Meta keywords (ignore entirely; not a ranking factor).
- Obsessing over keyword density or exact-match anchor text.

## Content SEO

### What is excellent
- The guides map directly to high-intent Spanish parenting pain points (pantallas, desbordes
  emocionales, hora de dormir, peleas entre hermanos) with empathetic, specific titles.
- Clear brand voice and topical authority around "crianza consciente / sin culpa".

### What is missing
- **Depth and breadth of the topic cluster.** Four guides is a seed, not a library. The
  niche (Spanish-language gentle parenting) has large, under-served search demand.
- A real `/aprende/` hub and an article/blog surface to host evergreen content.
- Author/E-E-A-T signals tied to Nari across content (the `Person` schema exists on the
  about page; extend authorship to guides).

---

# PART 3 — Regressions and Hazards Detected

| # | Finding | Severity | Detail |
|---|---|---|---|
| 1 | Orphan indexable page | **High** | `/aprende/Los-primeros-5/` has no internal links anywhere; sitemap-only. |
| 2 | Stray indexable HTML (no noindex, not in sitemap) | **Medium** | ~15 files (decks/reports/mockups/worksheets/brand books/photo-direction). Publicly reachable, thin/internal. |
| 3 | Duplicate meta description | **Medium** | `/` and `/apoyo/` are identical. |
| 4 | Mixed trailing-slash convention | **Medium** | Guides + `/descargo` are slash-less; directories use slash. Relies on Cloudflare normalization. Verify in prod. |
| 5 | Generic title on strong page | **Medium** | `/aprende/Los-primeros-5/` titled "Aprender" instead of "Los Primeros 5 Minutos". |
| 6 | Missing meta description | **Low** | `/descargo` has none (it is `index,follow`). |
| 7 | Redirect stub without noindex | **Low** | `inscripcion/inscripcion-page.html`. |
| 8 | OG image missing width/height | **Low** | `/inscripcion/`. |
| 9 | No OG/Twitter on legal pages | **Low** | `/privacidad/`, `/descargo`. |
| 10 | CLS risk: imgs without dimensions | **Medium** | Most `<img>` lack width/height/aspect-ratio. |
| 11 | Internal links injected by JS | **Medium** | Nav/footer via `site-nav.js`/`site-footer.js`; body content is static (mitigates). |

### Explicitly checked and **clean** (no regression)
- **No accidental `noindex`/`nofollow`** on any of the 12 public pages. The only `noindex`
  tags are on intentionally private pages (portal, presentacion, ledger, founder access,
  editorial, bio-redirect).
- **No conflicting or duplicate canonicals** within a single page; all self-referential.
- **No multiple-H1 / missing-H1** on public pages — every public page has exactly one H1.
  (The only 2-H1 files are `portal` and `strategy-ledger/index`, both `noindex`.)
- **No broken internal links** found among the in-content guide links (paths match real
  files) and nav targets (all resolve to existing directories).
- **No redirect loops** detected; redirect stubs point forward to canonical destinations.
- **No leftover `index_backup*.html` / `home.html`** (previously removed; confirmed gone).
- **OG images present** on all 10 content pages (only the 2 legal pages lack them).
- **No robots.txt misdirective**; nothing disallowed.
- **Manual script regression already fixed** (all directory pages on auto Plausible
  `script.js`, so pageviews fire) — analytics, not SEO, but confirmed healthy.

### Needs live verification (cannot be confirmed from static files)
- That `https://criarsinculpas.com/apoyo/screen-time` (and siblings) return **200** and that
  the `.html` and trailing-slash variants **301** to the canonical.
- That every sitemap URL returns 200 and none is accidentally blocked.
- Real Core Web Vitals (Lighthouse/PSI) for hero LCP and CLS.

---

# PART 4 — Git History Review (recent 30 commits)

### SEO-relevant commits
- `b5ff581` **Add technical SEO audit and indexing fixes** — the major SEO commit:
  robots.txt, sitemap expansion, canonical fixes, OG/Twitter completion, JSON-LD
  (Org/WebSite/Person), viewport accessibility cleanup. **Net positive.**
- `817b451` Fix bedtime-resistance protocol value — analytics consistency. Neutral for SEO.
- `a890058` Switch directory pages to auto Plausible script — fixed zero-pageview tracking
  bug. Analytics positive; SEO neutral.
- `741c0e6` Promote inscripcion early-access page to canonical `/inscripcion/` — routing;
  consistent with current canonical. Neutral/positive.
- `92d7546` Add shared footer to crisis guides and **redirect bio.html to sobre-nari** —
  consolidation; positive (removed a thin duplicate via redirect + noindex).
- `850b705` / `2b8f60d` / `7fa1ad5` / `624c7d9` Footer unification + privacy links — improves
  internal linking consistency. Positive.
- `2cdd082` / `9836445` / `205e770` Shared nav injection across pages — standardized internal
  linking, but moved nav to **JS injection** (see Part 3 #11). Mixed: consistency up,
  static-HTML link resilience down.

### Metadata / routing / page add-remove / analytics
- Metadata: concentrated in `b5ff581` (good).
- Routing: `/inscripcion/` promotion (`741c0e6`), bio redirect (`92d7546`).
- Page removals: backups/stubs removed in the SEO commit (confirmed: no `home.html`,
  no `index_backup*`).
- Page additions: progress/traffic reports (`d3ae96f`) — these are the stray, non-noindex
  report files now flagged in Part 3 #2.
- Analytics: Plausible script + protocol commits; no SEO regression.

### Did any commit unintentionally hurt SEO?
- **No outright SEO regression.** The closest concerns are side effects, not breakages:
  1. Nav/footer became **JS-injected** during the component unification, making the most
     important internal links JS-dependent (Part 3 #11).
  2. The progress/traffic **report pages were committed without `noindex`** (Part 3 #2).
  3. The `/aprende/Los-primeros-5/` page was made self-canonical (correct) but never wired
     into internal links, leaving it orphaned (Part 3 #1).
- None of these block indexing of the main pages; they are quality/equity issues.

---

# PART 5 — Content Opportunities (recommendations only, not written)

The current indexable content footprint is small (4 guides + method/about). The Spanish
gentle-parenting niche has strong, under-served demand. Highest-value pages that should
exist but do not, prioritized by realistic ranking potential and intent:

### Tier 1 — high-intent guide expansion (same proven format as existing guides)
1. **Berrinches / rabietas: qué hacer en el momento** (cómo manejar un berrinche). Massive
   search volume; perfectly on-brand.
2. **Cómo poner límites sin gritar** (límites con respeto). Core gentle-parenting query.
3. **Cómo dejar de gritarles a mis hijos** (manejo de la frustración del adulto). Very high
   intent, emotional query.
4. **Ansiedad por separación** (llanto al dejarlos en la guardería/escuela).
5. **Sueño infantil por edad** (a sub-cluster: siesta, despertares nocturnos, dejar el
   colecho) — expands the bedtime guide into a cluster.
6. **Pantallas por edad / cómo quitar la pantalla sin pelea** (extends screen-time).
7. **Hora de la comida: niño que no quiere comer** (selectividad alimentaria).
8. **Llegada de un hermanito / celos entre hermanos** (extends sibling-conflict).

### Tier 2 — structural / authority pages
9. **A real `/aprende/` hub** that lists and links all guides + the Los-primeros-5 page
   (also fixes the orphan and creates a crawlable cluster index).
10. **A blog / artículos surface** for evergreen long-form (the engine for ongoing ranking
    breadth and internal links).
11. **FAQ page or per-guide FAQ blocks** ("preguntas frecuentes sobre crianza respetuosa")
    — only with genuinely useful Q&A, then add `FAQPage` schema.

### Tier 3 — conversion/brand (lower organic value, high product value)
12. **"Qué es la crianza respetuosa / sin culpa"** pillar page (defines the category and
    captures informational queries; links down to all guides).
13. **Testimonios / historias** (social proof; modest SEO value).

Do not create thin doorway pages; each new page should be a genuinely useful, distinct
answer to a real query.

---

# PART 6 — Scorecard (with reasoning)

| Dimension | Score | Why |
|---|---|---|
| **Technical SEO** | **8.0 / 10** | Canonicals, titles, viewport, crawlable content, robots/sitemap, alt text are all in good shape. Held back by: orphan page, JS-injected internal links, mixed trailing-slash convention, stray non-noindex files, missing breadcrumbs/CLS dimensions. No critical defects. |
| **Content SEO** | **5.5 / 10** | The content that exists is high-quality and well-targeted, but the indexable footprint is thin (4 guides + method/about). Breadth, a hub, and a publishing surface are missing. |
| **Authority** | **3.5 / 10** | New domain, minimal external signals, `Organization.sameAs` not yet set, no visible backlink/PR footprint. Brand and voice are strong, which helps E-E-A-T once content scales. |
| **Internal linking** | **6.5 / 10** | Guides form a clean hub-and-spoke from home and `/apoyo/`, with cross-links. Dragged down by the orphaned `Los-primeros-5` page and reliance on JS-injected nav/footer. No breadcrumbs. |
| **Google readiness** | **7.5 / 10** | The site is fully indexable today, technically clean, mobile-friendly, and would index the main pages without trouble. The gap to "ranking machine" is content breadth + authority, not technical blockers. |

---

# PART 7 — Roadmap (only activities likely to move search performance)

### Week 1 — Indexing hygiene and equity (fast, high-leverage technical fixes)
- Add an internal link to `/aprende/Los-primeros-5/` (from home and/or `/apoyo/`) and give
  it a real title ("Los Primeros 5 Minutos ..."). Resolves the orphan + the generic title.
- `noindex` (or remove from deploy) the ~15 stray internal/dev HTML files so they cannot be
  indexed; add `noindex` to `inscripcion/inscripcion-page.html`.
- Give `/apoyo/` a unique meta description (stop duplicating the homepage).
- Add a meta description (and basic OG) to `/descargo`.
- Decide and document one trailing-slash convention; confirm Cloudflare 301s the variants.

### Week 2 — Verification + structured data + page experience
- Live-verify every sitemap URL returns 200, `.html`/slash variants 301 to canonical, and
  run Lighthouse/PSI on home, a guide, and `/inscripcion/`.
- Add explicit `width`/`height` (or `aspect-ratio`) to content `<img>` to kill CLS.
- Add `BreadcrumbList` site-wide and `Article`/`HowTo` JSON-LD to the four guides.
- Set `Organization.sameAs` once official social URLs are confirmed.
- Add `lastmod` to the sitemap.

### Month 1 — Content cluster kickoff
- Publish **2-3 Tier-1 guides** (berrinches, límites sin gritar, dejar de gritar) in the
  existing high-performing guide template, fully cross-linked to current guides.
- Build the real `/aprende/` hub page that indexes all guides + the cluster.

### Month 2 — Scale the cluster + publishing surface
- Publish **3-4 more Tier-1 guides** (separación, sueño por edad, pantallas por edad,
  comida).
- Stand up a blog/artículos surface and a category pillar ("qué es la crianza sin culpa")
  that links down to every guide.
- Begin light authority work: author bylines tied to Nari, first outreach/citations.

### Month 3 — Depth, schema maturity, and measurement
- Continue 1 new guide/week; expand bedtime and screen-time into full sub-clusters.
- Add FAQ blocks (with `FAQPage` schema) where genuine Q&A exists.
- Review Search Console: queries, CTR by title, coverage; iterate titles/descriptions on
  underperformers. Pursue real backlinks (guest posts, partnerships) for authority.

### Explicitly ignored (SEO myths / near-zero value)
Meta keywords, keyword-density tuning, sitemap `priority` micro-tuning, submitting to
low-quality directories, exact-match anchor spam, and per-page OG images as a *ranking*
tactic (do them for social CTR, not rank).

---

## Appendix — files referenced
- `robots.txt`, `sitemap.xml`
- Public pages: `index.html`, `apoyo/index.html`, `apoyo/{screen-time,emotional-escalation,bedtime-resistance,sibling-conflict}.html`, `metodo/index.html`, `sobre-nari/index.html`, `inscripcion/index.html`, `aprende/Los-primeros-5/index.html`, `descargo.html`, `privacidad/index.html`
- Components: `js/site-nav.js`, `js/site-footer.js`
- Noindex/private: `portal/index.html`, `presentacion/index.html`, `strategy-ledger/index.html`, `inscripcion/inscripcion.html`, `inscripcion/editorial.html`, `bio.html`
- Stray/orphan: the report/deck/mockup/worksheet/brand files listed in the inventory.

*End of inspection. No files were modified; nothing was committed or pushed.*
