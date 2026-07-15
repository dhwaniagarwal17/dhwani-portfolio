# Dhwani Agarwal — Portfolio

A dark-themed, animated portfolio built with React, TypeScript, Tailwind CSS, and Framer Motion.

## Getting started

```bash
npm install
npm run dev
```

Then open the local URL Vite prints (usually http://localhost:5173).

## Build for production

```bash
npm run build
npm run preview
```

## Project structure

```
src/
  components/     Reusable UI + section components
  data/           Content (nav links, project copy, skills, etc.) — edit these to update site content
  App.tsx         Composes all sections in order
  main.tsx        React entry point
  index.css       Tailwind directives + global reset + .hero-heading gradient class
```

## Notes

- The hero portrait is currently a generated SVG placeholder (`src/components/AvatarGlyph.tsx`).
  Swap it out for a real photo/illustration by replacing that component with an `<img>` tag.
- The three project cards in `src/data/projects.ts` use gradient placeholders instead of screenshots —
  drop real project images into `public/` and reference them there once available.
- Marquee and decorative About-section images are pulled from external URLs specified in
  `src/data/marquee.ts` and `src/data/about.ts`.
