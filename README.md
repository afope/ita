# ita — intersection of technology and art

Website for **ita**, a spatial prototyping studio between Amsterdam and
Lagos, working worldwide, and home of **ita conversations**.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build
```

## Where things live

- `src/app/content.ts` — all copy, offers, event details, palette. Edit here first.
- `src/app/page.tsx` + `home.css` — the homepage.
- `src/app/brand/` — brand guidelines page at `/brand`.
- `src/app/components/HeroCanvas.tsx` — the live map of Lagos Island in the hero.
- `src/app/data/lagos-island.json` — street data from OpenStreetMap (see its README).
- `src/app/components/Logo.tsx` — the wordmark and junction mark (SVG).
- `src/app/globals.css` — design tokens and shared styles.

## Common updates

- **Announce the featured author:** in `content.ts`, set
  `literaryEvent.featuredAuthor.confirmed` to `true`. Until then the site
  shows "to be announced" and never prints the name.
- **Announce the venue:** set `literaryEvent.showVenue` to `true`.
- **Change the contact address:** `site.contactEmail` (currently
  hello@ita.ng). It is used by every enquiry link and the footer.

## Waitlist

Sign-ups go through `/api/submit-form`, which forwards them to
[Formspree](https://formspree.io); Formspree emails each one to the inbox
set on the form.

1. Create a free Formspree account and a new form that sends to
   hello@ita.ng.
2. Copy the form's ID (the part after `/f/` in its endpoint, e.g. `xyzabcd`).
3. Set the environment variable `FORMSPREE_FORM_ID` to that ID — in
   `.env.local` for local development, and in the hosting provider's
   settings for the live site.

If `FORMSPREE_FORM_ID` is not set, the route falls back to the Google Form
configured by `NEXT_PUBLIC_GOOGLE_FORM_ID` and
`NEXT_PUBLIC_GOOGLE_FORM_ENTRY_ID`.

## Going live on Vercel

1. Sign in at [vercel.com](https://vercel.com) with GitHub and import the
   `afope/ita` repository. The defaults for Next.js are correct.
2. Under **Settings → Environment Variables**, add `FORMSPREE_FORM_ID`.
3. Deploy. Every push to `main` then redeploys the site.
4. Under **Settings → Domains**, add your domain (e.g. `ita.ng`) and follow
   the DNS instructions shown there.
