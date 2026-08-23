# CSC Pilot 01 · Test Plan (canonical)

**Last reconciled:** 2026-08-23  
**Pilot:** Pantallas → Desbordes  
**Test:** A · Utility  
**Canonical experience URL:** `https://criarsinculpas.com/portal/piloto/pantallas-desbordes/`

This document is the single source of truth for what Pilot 01 is testing, who participates, how they are recruited, what data we collect, and what is active vs. future. Implementation details live in code; strategy lives here.

---

## What we are testing

**Primary research question**

When a caregiver with a difficult screen-transition problem uses this experience, does it help them understand what to do next and give them something concrete they can try during a later transition?

**Test type:** Private utility test — not awareness, not conversion, not commercial validation.

**Success read:** Directional signals from a small cohort (10–15 invited caregivers). Inspect the actual funnel and qualitative feedback. Do **not** treat percentage thresholds as hard pass/fail criteria.

The most important eventual behavioral question:

> Did the caregiver actually try something from the experience during a later screen transition?

---

## What we are NOT testing

- Awareness or reach campaigns
- Channel performance or attribution experiments
- Public discovery or homepage/navigation promotion
- Conversion optimization
- Willingness to pay, Access Pass pricing, or membership
- El Estudio acquisition marketing
- Paid media or product launch

Source tags (`?src=`) are preserved for operational clarity and future segmentation. **Test A is not framed as a channel-performance experiment.**

---

## Who participates

- Approximately **10–15 invited caregivers**
- Personally known to or trusted by Nari
- Adults caring for a child in screen-transition moments (Pantallas / Desbordes context)
- Spanish-primary experience; English available in-product

---

## How they are recruited (Test A — active)

**Direct invitation only.** These are private product-test invitations, not promotional campaigns.

| Channel | Owner | Notes |
|---------|-------|-------|
| Personal email from Nari | Nari | Primary; use `?src=email` or `?src=nari` |
| WhatsApp / direct message from Nari | Nari | Primary; use `?src=nari` or `?src=whatsapp` |

**Optional contingency (not active yet):** If direct invitations do not yield enough testers, a small Instagram Story may recruit a few additional families with framing: *“We are looking for a few families to privately test something before we publish it.”* — not “Come discover El Estudio.”

---

## Tester journey (canonical)

```
Nari invitation (email or DM)
  → private pilot landing (invite screen)
  → first name + email (identify)
  → Pantallas → Desbordes experience
  → situation → orientation → path (Avisa · Valida · Guía · Acompaña)
  → plan builder → save plan
  → immediate feedback (Formspree)
  → [manual follow-up] did they try the plan in a real transition?
```

**Access:** Production requires identify step; session grants access via `sessionStorage`. Page is `noindex, nofollow`. Not in site nav or sitemap.

---

## Data we collect

| Layer | What | Where | PII |
|-------|------|-------|-----|
| Identity | First name, email, language, source tag | Formspree `pilot_01_identity` | Yes (email) |
| Immediate feedback | Rating indices, optional comment | Formspree `pilot_01_feedback` | Comment may contain PII — treat carefully |
| Behavioral funnel | Stage events (anonymous props only) | Plausible (`protocol: csc-pilot-01`) | No email in events |
| Local state | Progress, plan, participant, source | `sessionStorage` / `localStorage` | Participant object local only |
| Source tag | `?src=` persisted | `csc_estudio_pilot_01_source` | No |

**Plausible events (non-exhaustive):** `pilot_view`, `pilot_invite_*`, `pilot_identify_*`, `pilot_situation_selected`, `pilot_orientation_view`, `pilot_path_*`, `pilot_plan_*`, `pilot_feedback`.

---

## Immediate feedback

At experience completion, caregiver can submit short structured feedback. Submitted to Formspree endpoint `xaqgwzqp` with `form_type: pilot_01_feedback`. UI shows honest submit states (sending / success / failure).

---

## Follow-up question (not automated yet)

After the immediate in-product feedback, Nari (or team) should manually follow up with completers to ask:

> Did you try something from your plan during a later screen transition? What happened?

This is the highest-value signal for utility validation. **No automated follow-up flow is built in Pilot 01 v1.**

---

## Currently active surfaces

| Surface | Status |
|---------|--------|
| Private pilot URL (`/portal/piloto/pantallas-desbordes/`) | **Active** — share only via direct invite links |
| Invite + identify + experience + feedback | **Active** |
| Formspree identity + feedback | **Active** |
| Plausible behavioral analytics | **Active** (anonymous stage events) |
| Source tag capture (`?src=`) | **Active** (operational, not channel experiment) |

---

## Inactive / future surfaces

**Do not publicly activate during initial Test A.** Code and creative assets may exist; default state is OFF.

| Surface | Purpose | Default | Notes |
|---------|---------|---------|-------|
| Pantallas banner (`/apoyo/screen-time`) | Test A2 contextual discovery | **OFF** | `PILOT_BANNER_ENABLED = false` in `js/pilot-invite-banner.js` |
| Desbordes banner (`/apoyo/emotional-escalation`) | Test A2 / optional | **OFF** | Same flag |
| Instagram Story (recruitment contingency) | Optional extra testers | **Inactive** | Framing: private test, not launch |
| Instagram feed post | Discovery / awareness | **Inactive** | Future / optional |
| Homepage promotion | — | **Not built** | — |
| Global navigation link | — | **Not built** | — |
| Sitemap entry | — | **Not built** | — |
| El Estudio marketing push | — | **Inactive** | — |
| Paid acquisition | — | **Not built** | — |

**Banner QA override:** Append `?pilot_banner=1` on an apoyo page to preview banner locally without changing the global flag.

**Enabling for Test A2:** Set `PILOT_BANNER_ENABLED = true` in `js/pilot-invite-banner.js` (and/or `data-pilot-banner-enabled="1"` on host) when running contextual discovery experiment.

---

## Test A2 · Contextual discovery (separate, later)

**When:** After utility evidence from Test A.

**Research question:** Does someone already seeking help through Pantallas naturally want this deeper structured next step?

**Potential journey:**

```
Public Pantallas resource → contextual invitation banner → private/pilot experience
```

The Pantallas banner is intended for Test A2. It is **not** part of the controlled Test A cohort. Desbordes discovery can be evaluated later and is not currently required.

---

## Test B · Commercial validation (separate, future)

**When:** Only after utility and discovery evidence.

**Potential journey:** problem → offer → price → Access Pass → payment → experience.

Outseta / Stripe / willingness-to-pay testing belongs here. **Do not implement during Pilot 01 Test A.**

---

## Funnel to inspect (directional)

With ~10–15 participants, track counts at each step:

1. Invited  
2. Started (invite continue / pilot view)  
3. Identified (name + email submitted)  
4. Selected situation  
5. Reached orientation  
6. Completed path  
7. Built plan  
8. Saved plan  
9. Submitted feedback  
10. **Tried plan in real life** (follow-up — manual)

Review Formspree submissions and Plausible funnel together. Qualitative comments outweigh arbitrary percentage cutoffs.

---

## Open questions

- [ ] Exact follow-up timing and script for “did you try it?” (email vs. WhatsApp vs. both)
- [ ] Reminder to non-completers: when and how (Day 4 soft nudge — operational, not product)
- [ ] Whether Test A2 activates on Pantallas only or Pantallas + Desbordes
- [ ] Specialist review of copy (`brief-revision-especialistas.md`) — content audit separate from test strategy
- [ ] Production deploy of banner assets + creative brief (currently local/uncommitted in some environments)

---

## Current implementation status

| Component | Built | Active for Test A |
|-----------|-------|-------------------|
| `portal/piloto/pantallas-desbordes/index.html` | Yes | Yes |
| Private invite landing | Yes | Yes |
| Participant identification (name + email) | Yes | Yes |
| Source tracking (`?src=`) | Yes | Yes |
| Formspree identity (`pilot_01_identity`) | Yes | Yes |
| Formspree feedback (`pilot_01_feedback`) | Yes | Yes |
| Plausible stage analytics | Yes | Yes |
| Plan builder + local persistence | Yes | Yes |
| Banner CSS/JS + apoyo wiring | Yes | **No** (flag OFF) |
| Outreach creative brief HTML | Yes | Reference only |
| Email / WhatsApp copy in brief | Yes | Use for Test A |
| Instagram creative in brief | Yes | Future / contingency |
| Automated follow-up (“tried plan?”) | **No** | Manual |
| Test B / payments / Outseta | **No** | — |
| Homepage / nav / sitemap promotion | **No** | — |

**Related internal docs**

- Outreach creative: `portal/piloto/pantallas-desbordes/creative-brief-outreach.html`
- Specialist content review: `portal/piloto/pantallas-desbordes/brief-revision-especialistas.md`

---

## Change log

| Date | Change |
|------|--------|
| 2026-08-23 | Initial reconciliation: Test A = direct invite only; banners default OFF; canonical doc created |
