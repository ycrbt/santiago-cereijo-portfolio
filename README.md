# Santiago Cereijo — Portfolio

A fast, accessible, responsive engineering portfolio focused on measurable outcomes and production impact.

## Local preview

```bash
python3 -m http.server 4173
```

Open `http://localhost:4173`.

## Production build

```bash
npm run check
npm run build
```

The build emits a self-contained Cloudflare Worker module at `dist/worker.js`.

## Design decisions

- Outcome-first content hierarchy for recruiter scanning.
- Static HTML, CSS, and JavaScript for minimal runtime overhead.
- Responsive layouts for mobile, tablet, and desktop.
- Semantic HTML, keyboard navigation, reduced-motion support, and high contrast.
- Structured `Person` metadata and Open Graph presentation.

## Sources

Portfolio framing follows recruiter guidance to emphasize relevant accomplishments and quantified outcomes:

- [Amazon recruiter résumé guidance](https://www.aboutamazon.com/news/workplace/amazon-job-application-resume-writing-tips)
- [Vets Who Code portfolio checklist](https://vetswhocode.io/portfolio-checklist)

All professional claims and metrics come from Santiago's supplied résumé.
