# Eternal Order | Sanatan Dharma

A dark editorial journal. Sanatan dharma as a philosophy and way of life: four aims, four varnas as one body, pancha mahabhuta gathered as panchamrita. Next.js, Tailwind, GSAP, Lenis, and MDX.

This site lives at `bhau-os/Bhau-OS_Website`. Brand marks are in `assets/` and `public/brand/`.

## Run

```bash
npm install
npm run dev
```

Production:

```bash
npm run build
npm start
```

## Add content

Drop an `.mdx` file into one of these folders:

- `content/education/`
- `content/videos/`
- `content/digests/`
- `content/ideas/`
- `content/now/` (Michigan moment on the landing page; newest date wins)
- `content/spotlight/` (Sanatan Spotlight video/conversation; newest date wins)

Frontmatter:

```md
---
title: "The title"
description: "One or two sentences."
date: "2026-08-13"
cover: "/images/hero-stepwell.jpg"
alt: "Plain description of the image"
reading: "7 min"
duration: "02:18"
featured: false
---
```

`duration` is for shorts. Set `featured: true` on one video to pin it on the home page.

## Notes

A journal of an inherited way of living, not a religion and not an organization. No membership or donation primary paths.
