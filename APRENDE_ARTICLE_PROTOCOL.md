# Aprende Article Production Protocol

This is the standard for every page that lives under `/aprende/`. It exists so that the
Aprende library stays consistent, bilingual, crawlable, and visually native to Criar Sin
Culpas. No Aprende page should be published outside of these rules.

Spanish is the primary language of Criar Sin Culpas. English is always available, but it
never replaces Spanish and never lives on a separate URL (for now).

---

## 1. Spanish-first drafting

- Every article is written in Spanish first. Spanish is the source of truth.
- Tone: warm, direct, calm, Criar Sin Culpas-native. No clinical or generic-blog voice.
- Gender-neutral by default. Avoid assuming the parent is always female.
  - Prefer neutral phrasing: `con cansancio`, `con frustración`, `sin mucha energía`.
  - Avoid gendered adjectives like `cansada`, `agotado`, `frustrada` for the adult reader.
  - See section 11 (Exhausted Parent Optimization Pattern) for full editorial rules.
- Keep paragraphs short. Prefer plain language over jargon.
- The Spanish text is the visible default content in the static HTML (see section 6).

## 2. English translation / adaptation

- After the Spanish is approved, adapt (do not literally translate) into English.
- Match meaning and warmth, not word-for-word grammar.
- English must be reviewed by a human before the page is considered bilingual-complete.
- Until English is reviewed, the article stays in review and is NOT marked Published in
  the hub (see section 5).

## 3. Review steps (gate before publishing)

A page may move toward Published only after ALL of these pass:

1. Spanish content reviewed and approved.
2. English content present on every translatable node (`data-en`) and human-reviewed.
3. Both languages toggle correctly with the shared `.lang` toggle (ES <-> EN), including
   title, meta description, headings, body, FAQ, CTA, related cards, breadcrumb.
4. Spanish content is visible in static HTML with JS disabled (view source check).
5. All internal links resolve to real 200 pages.
6. JSON-LD validates and reflects only visible facts.
7. Page uses the shared nav (`/js/site-nav.js`), shared footer markup, and the warm
   light Aprende visual system (no standalone dark/obsidian layouts).

## 4. Required metadata (both languages)

Every Aprende page must include, with Spanish as the static default and English via the
i18n attributes:

- `<title>` with `data-i18n="title_tag"`, `data-es`, `data-en`.
- `<meta name="description">` with `data-i18n-meta="description"`, `data-es`, `data-en`,
  and a static Spanish `content` value.
- `<link rel="canonical">` to the page's own trailing-slash URL.
- Open Graph: `og:type`, `og:url`, `og:site_name`, `og:title`, `og:description`,
  `og:image` (+ width/height/alt), `og:locale` = `es_ES`.
- Twitter: `twitter:card` = `summary_large_image`, `twitter:title`, `twitter:description`,
  `twitter:image`.
- Exactly one `<h1>` per page.
- `data-protocol` on `<body>` (use `general` unless the page maps to a specific support
  protocol slug).

The language engine on each page must process `[data-i18n]` (innerHTML),
`[data-i18n-meta]` (content attribute), and `[data-i18n-placeholder]` (inputs) so that
metadata and form fields switch with the toggle.

## 5. When a page may be marked "Published"

In `/aprende/index.html`, card statuses are bilingual and mean specific things:

- `Publicado` / `Published` (`data-status="published"`): a real, finished, bilingual
  article that lives in the shared Aprende template. Use only after the section 3 gate.
- `Recurso` / `Resource` (`data-status="resource"`): an integrated page that is a
  downloadable or lead-magnet resource (possibly still in preparation), not a full
  article. It may link out, but it must not be labeled as a published article.
- `Próximamente` / `Coming soon` (`data-status="coming-soon"`): placeholder card with NO
  link. Never produces a clickable broken link.

Rules:

- No card may link to a page that is not integrated with the Aprende visual system.
- A page that is mostly an email capture / waitlist is a `Recurso`, not `Publicado`.
- No article goes live Spanish-only. If English review is pending, keep it out of the
  Published set (use `coming-soon` or hold the page) until English is reviewed.

## 6. Crawlability (static Spanish)

- The Spanish copy must be the literal text inside each element in the served HTML, so
  crawlers see it without running JS.
- The pattern is: element holds Spanish text as its inner content AND carries
  `data-es="<same Spanish>"` plus `data-en="<English>"`. The toggle swaps `innerHTML`.
- Do not move primary content into JS-only rendering.
- Inline HTML inside a translated node (for example `<strong>` or `<em>`) is encoded in
  the `data-es` / `data-en` values as `&lt;strong&gt;...&lt;/strong&gt;` so it survives
  the innerHTML swap. Straight double quotes inside values are encoded as `&quot;`;
  prefer curly quotes for readability.

## 7. JSON-LD rules

- Include only structured data backed by content actually visible on the page.
- Full bilingual article -> `Article` (with `inLanguage: "es"`), plus `BreadcrumbList`.
- If a visible FAQ exists on the page -> add `FAQPage` whose questions/answers match the
  visible text exactly.
- Resource / lead-magnet pages (not full articles) -> `BreadcrumbList` only. Do NOT emit
  `Article` for a page that is really an email capture.
- The hub `ItemList` ("Artículos publicados") lists only true published articles. A
  `Recurso` is not added to that list.
- Never invent authors, dates, ratings, reviews, or awards. Use real values
  (author: Nari Fateha; publisher: Criar Sin Culpas).

## 8. Internal linking rules

- Every article links back to the hub `/aprende/`.
- Every article links to at least one related support guide under `/apoyo/...` where the
  topic maps to a protocol (for example berrinches -> `/apoyo/emotional-escalation`).
- Where natural, link to `/metodo/` and to other Aprende articles/resources.
- The support guide that maps to the topic should add a reciprocal contextual link back
  to the article (two-way linking), so the article is not orphaned.
- Add the new URL to `sitemap.xml` (trailing slash, matching the canonical).
- Anchor text must be descriptive and bilingual (`data-es` / `data-en`), never "click
  here".

## 9. hreflang / separate URLs

- Today, Spanish and English share ONE URL per page and switch client-side via the
  toggle. In this model we do NOT add `hreflang`.
- `hreflang` is only correct if/when we create separate per-language URLs (for example
  `/en/...`). That is a future routing decision and is out of scope until it happens.
- Until separate URLs exist: one canonical per page, `og:locale = es_ES`, no `hreflang`.

## 10. Definition of done

- [ ] Spanish written, reviewed, gender-neutral.
- [ ] English present on every node and human-reviewed.
- [ ] Toggle verified ES <-> EN across title, meta, body, FAQ, CTA, related, breadcrumb.
- [ ] Static Spanish visible with JS off.
- [ ] Shared nav + footer + warm Aprende template.
- [ ] Metadata complete in both languages; one H1; canonical correct.
- [ ] JSON-LD validates and matches visible content.
- [ ] Internal links resolve; reciprocal link added from the mapped guide.
- [ ] Added to `sitemap.xml`.
- [ ] Hub card status set correctly (`published` / `resource` / `coming-soon`).

---

## 11. Exhausted Parent Optimization Pattern

Aprende pages are compassionate learning tools for tired parents — not SEO blog posts.
Every article should be easier to use on mobile, especially when a parent is reading during
a hard moment. The reader should finish feeling: *“Mañana puedo intentarlo de otra manera.”*

Apply this pattern to all Aprende articles, especially crisis-adjacent topics (berrinches,
desbordes, pantallas, límites, transiciones).

### 11.1 Mobile-first structure

- Assume the reader is on a phone, tired, interrupted, or reading during the parenting moment.
- Keep sections short. Avoid long uninterrupted paragraphs.
- Use visual hierarchy (micro-chapters, callouts, phrase blocks) to reduce cognitive load.

### 11.2 Crisis TL;DR (crisis-adjacent articles)

- Place a short **“Si estás en el momento” / “If you are in it right now”** block immediately
  after the opening intro, before deeper explanation.
- Include 3–5 short, practical actions (one per line).
- Add a soft CTA to the relevant `/apoyo/...` protocol (for example
  `Necesito ayuda ahora →` / `I need help now →`).

### 11.3 Micro-chapters

- Use short sections with clear emotional purpose; each answers one immediate question.
- Keep most sections to 3–5 short paragraphs or short blocks.
- Emoji in headings is optional and sparing (only when it aids scanability on mobile).

### 11.4 Callouts

- Use **emotional callouts** and **practical callouts** to anchor the parent — not decorate.
- Examples: `No es manipulación. Es una emoción demasiado grande.` /
  `Tu calma ayuda, aunque no sea perfecta.` / `Conexión primero, corrección después.` /
  `Pedir ayuda es cuidado, no fracaso.`
- Markup: `.callout` (see reference article `que-hacer-en-un-berrinche`).

### 11.5 Phrase blocks

- “Qué decir” sections use `.say-box` with one phrase per line.
- Repetition is allowed. Avoid long scripts.

### 11.6 What NOT to do

- Clear, short bullets. No shaming the parent.
- If using ❌ markers, use them consistently; prefer `<span aria-hidden="true">❌ </span>`
  plus plain text for screen readers.

### 11.7 Soft CTA

- CTA language should feel useful, not aggressive: `Necesito ayuda ahora`, `Ir a la guía`,
  `Abrir la guía`.
- Connect naturally to the mapped protocol.

### 11.8 FAQ

- Usually 3–5 questions. Each answer: no more than 3–4 short lines.
- FAQ resolves doubts without reopening the whole article. Visible FAQ must match `FAQPage` JSON-LD.

### 11.9 Neutral Spanish (parent/adult)

- Avoid gendered adjectives for the parent whenever possible.
- Prefer: `con cansancio`, `con frustración`, `sin mucha energía`,
  `cuando en casa ya no queda mucho margen`.
- Avoid: `cansada`, `agotado`, `frustrada` (as standalone parent descriptors).
- For child-directed phrases, prefer neutral wording when possible:
  `Estás a salvo` instead of `Estás seguro`.

### 11.10 CSC tone guardrails

- Do not use `tu calma es contagiosa` as a standalone absolute.
- Prefer: `Tu calma ayuda, aunque no sea perfecta.`
- Avoid overly clinical phrases such as `su cerebro lógico está offline`.
- Prefer: `en ese momento no puede razonar como cuando está calmado.`
- Avoid framing that makes parents feel responsible for perfect regulation.

### 11.11 Reference implementation

The canonical retrofitted example is:

`/aprende/que-hacer-en-un-berrinche/index.html`

Clone its CSS classes (`crisis-block`, `callout`, `say-box`, `action-block`, `notdo-list`,
`read-badge`) when building or updating other Aprende articles.

Also ships: hero illustration (`/assets/illustrations/hero-berrinche.svg`), CSC section icons
(`/assets/icons/criar-icons.svg`, `/css/csc-icons.css`).

**Follow-up:** create a dedicated 1200×630 social card for the berrinche article and update
OG/Twitter meta separately. In-article hero and JSON-LD Article `image` may differ from social
cards until then.
