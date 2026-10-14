# ita — intersection of technology and art

Website for **ita**, a Lagos studio building spatial prototypes for innovation
labs and organisations, and home of **ita conversations**.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build
```

## Where things live

- `src/app/content.ts` — all copy, event details, palette. Edit here first.
- `src/app/page.tsx` — homepage (hero, idea, studio, conversations, join).
- `src/app/brand/` — brand guidelines page at `/brand`.
- `src/app/components/Logo.tsx` — the wordmark and junction mark (SVG).
- `src/app/globals.css` — design tokens and styles.

## Common updates

- **Announce the featured author:** in `content.ts`, set
  `literaryEvent.featuredAuthor.confirmed` to `true`. Until then the site
  shows "to be announced" and never prints the name.
- **Change the event date:** update `literaryEvent.date` (drives the
  countdown) and `literaryEvent.dateLabel`.
- **Add a contact email:** set `site.contactEmail`; a "start a project"
  button appears in the studio section.

The waitlist posts to `/api/submit-form`, which forwards to a Google Form
using `NEXT_PUBLIC_GOOGLE_FORM_ID` and `NEXT_PUBLIC_GOOGLE_FORM_ENTRY_ID`.
