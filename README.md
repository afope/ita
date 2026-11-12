# ita — intersection of technology and art

Website for **ita**, a spatial prototyping studio between Amsterdam and
Lagos, and home of **ita conversations**.

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
- `src/app/conversations/` — ita conversations: the next conversation and
  its tickets, what is coming up and the archive, at ita.ng/conversations
  (the link for posters and bios), plus a page for each conversation.
- `src/app/globals.css` — design tokens and shared styles.

## Common updates

- **Conversations live in `conversationList` in `content.ts`.** Each one is
  an evening in the *ìwé is the way* series, with a number (no. 01, no. 02…),
  a guest and an optional title. Every conversation has its own page at
  /conversations/<slug>; /conversations shows the next one with its
  tickets, anything else coming up, and the archive of past conversations.
  The day after its date, a conversation moves to the archive by itself.
- **Add the next conversation:** copy an entry in `conversationList`, give it
  a new `slug`, the next `number`, its date and guest, and keep
  `announced: false` until you are ready. Guest photos go in
  `public/conversations/`.
- **Announce a conversation (one switch):** set its `announced` to `true`. A
  strip above the nav on every page links to the tickets, the homepage's
  conversations block shows it, and its page goes live. The homepage itself
  stays the studio. While `false`, no guest, date or venue appears anywhere,
  even at its own link.
- **Add the tickets:** paste the Tix Africa widget code (Marketing →
  Custom Widget) into the conversation's `ticketWidget`. While it is empty,
  the ticket area says tickets go on sale soon and points to the list.
- **After the evening:** add a `recap`, a `gallery` of photos and a
  `recordingUrl`; its page becomes the record of the night.
- **Change the contact address:** `site.contactEmail` (currently
  hello@ita.ng). It is used by every enquiry link and the footer.

## Mailing list

Every sign-up form on the site posts to `/api/submit-form`, which adds the
address to ita's Kit form "ita website" (form ID 10170531), and so to the
Kit mailing list. Nothing needs configuring: the form ID is public. To use a
different Kit form, set the environment variable `KIT_FORM_ID` in Vercel.

Confirmation emails: in Kit, the form's Settings → Incentive → "Send
incentive email" decides whether new sign-ups must confirm by email. Keep
`site.confirmSignups` in `content.ts` the same (true or false) so the
message people see after signing up matches.

## Going live on Vercel

1. Sign in at [vercel.com](https://vercel.com) with GitHub and import the
   `afope/ita` repository. The defaults for Next.js are correct.
2. Under **Settings → Environment Variables**, add `FORMSPREE_FORM_ID`.
3. Deploy. Every push to `main` then redeploys the site.
4. Under **Settings → Domains**, add your domain (e.g. `ita.ng`) and follow
   the DNS instructions shown there.
