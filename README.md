# Stamp Flood

A kinetic-type poster loop that repeats in a new world every pass: four lines of type on flat highlight bars fly in from the edges one axis at a time, park to be read, then scatter off — and the next palette, with the next four lines, flies in before the last ones have finished leaving.

## Why

One mechanism carries the whole piece: every visible thing is a line of text with a highlight bar moving along a breakpoint track, and whenever it moves it stamps its flat-colour silhouette exactly where it just was. Those stamps live for sixteen frames and vanish all at once — no fade, no shrink — which is what makes them read as printed residue rather than motion blur. They're recomputed fresh every frame from the tracks themselves, so there's no accumulation state to fall out of sync on a resize or a tab resume; the residue is always exactly what the last sixteen frames of motion would have left behind.

The transition between passes follows from the same idea rather than needing its own code. The incoming pass starts twelve frames before the outgoing one finishes, so for that window two worlds are on stage at once — old lines scattering off in the old colour, new ones flying in in the new one, both stamping. Their interleaved trails *are* the colour flood between scenes. Nothing fades; the field itself swaps as a hard cut, timed to land under the densest part of that overlap.

## How it works

- **The choreography is data, not an easing function** — four tracks of `[frame, x, y]` breakpoints, deliberately jagged and stop-start: a line slides, stops, drops, stops, slides again, always axis-aligned. It runs on a 10Hz movement cadence, so consecutive frames often repeat exactly on purpose; smoothing that stutter is what kills the print-like snap.
- **The silhouette is the bar unioned with the glyphs**, stroked fat in bar colour — that union is where the descender drips along a bar's bottom edge come from, not a separate shape.
- **All four bars draw before any ink**, because the parked rows sit closer together than a bar with a descender runs tall. Drawing bar-then-ink for every line lets the next row's bar cleanly bite into the previous row's letterforms without ever clipping a glyph mid-draw.
- **Long lines condense horizontally to their own track's room** rather than shrink in point size — four different type sizes would read as a layout, not as one poster.
- **Field and bar sit far apart in hue and value, ink stays near-black or near-white** in every world — the two rules a palette has to obey, or the flat colour blocks read as a stain instead of a poster.

## Stack

- **Framework:** Next.js (App Router), TypeScript, Tailwind CSS v4
- **Rendering:** a single `<canvas>` and the 2D context — no WebGL, no CSS animation, no animation library
- **Font:** [Archivo](https://fonts.google.com/specimen/Archivo) at 600, loaded through `next/font`

The animation (`src/components/stamp-flood/`) doesn't import React or Next — `engine.ts` is a plain class over a canvas element, `params.ts` holds the tuning constants, the five worlds, and their movement tracks, and `stamp-flood-card.tsx` is the thin wrapper that mounts it and watches for visibility, reduced-motion, and route transitions.

## Running it locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).
