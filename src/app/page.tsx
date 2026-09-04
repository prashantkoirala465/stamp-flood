import { StampFloodCard } from "@/components/stamp-flood/stamp-flood-card";

const BUILT_FROM = [
  "One mechanism carries everything: every visible thing is a line of text with a highlight bar moving along a breakpoint track, and whenever it moves it stamps its flat-colour silhouette where it just was.",
  "Stamps live exactly sixteen frames and vanish all at once — no fade, no shrink — which is what makes them read as printed residue rather than motion blur. They're computed fresh each frame from the tracks, so there's no accumulation state to get out of sync on a resize or a tab resume.",
  "The choreography is data, not an easing function: four tracks of [frame, x, y] breakpoints, deliberately jagged and stop-start. Smoothing that stutter or fitting the tracks to a cubic ease is what kills the print-like snap.",
  "There's no separate transition code. The incoming pass starts twelve frames before the outgoing one ends, so for that window two worlds are on stage at once — their interleaved trails are the colour flood between scenes, and it holds for any pair of worlds because it's derived from the overlap, not authored per transition.",
];

const CONSTRAINTS = [
  "All four bars draw first, then all four inks — the parked rows sit closer together than a bar with a descender runs tall, so bar-then-ink lets the next row's bar bite cleanly into the previous row's letterforms without ever clipping a glyph.",
  "The silhouette is the rounded bar unioned with the glyphs stroked fat in bar colour — that union is where the descender drips along a bar's bottom edge come from.",
  "Lines longer than their track's room get condensed horizontally rather than set smaller, because four different type sizes would read as a layout instead of as one poster.",
  "The field swaps under the densest part of the flood, as a hard cut — a gradient on the field is the one thing that would give away it isn't print.",
];

export default function Home() {
  const year = new Date().getFullYear();

  return (
    <div className="flex min-h-full flex-1 flex-col">
      <header className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-8">
        <span className="text-sm font-bold tracking-tight">Stamp Flood</span>
        <a
          href="https://github.com/prashantkoirala465/stamp-flood"
          className="text-sm text-muted transition-colors hover:text-foreground"
        >
          GitHub
        </a>
      </header>

      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-10 px-6 pb-16">
        <div className="max-w-2xl">
          <h1 className="text-3xl font-bold leading-tight sm:text-4xl">
            A poster that reprints itself in a new world every pass.
          </h1>
          <p className="mt-4 leading-relaxed text-muted">
            Four lines of type on flat highlight bars fly in from the edges
            one axis at a time, park to be read, then scatter off — leaving
            chunky blocks of colour wherever they moved. The next palette and
            the next four lines fly in before the last ones have finished
            leaving, and their overlapping trails flood the screen as the
            colour changes.
          </p>
        </div>

        <StampFloodCard />
      </main>

      <section className="border-t border-line">
        <div className="mx-auto grid max-w-5xl gap-10 px-6 py-16 sm:grid-cols-2">
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wide text-muted">
              How it&apos;s built
            </h2>
            <ul className="mt-4 flex flex-col gap-4 text-sm leading-relaxed">
              {BUILT_FROM.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wide text-muted">
              Constraints
            </h2>
            <ul className="mt-4 flex flex-col gap-4 text-sm leading-relaxed">
              {CONSTRAINTS.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <footer className="border-t border-line px-6 py-8 text-sm text-muted">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <span>© {year} Prashant Koirala</span>
          <a
            href="https://github.com/prashantkoirala465/stamp-flood"
            className="transition-colors hover:text-foreground"
          >
            Source
          </a>
        </div>
      </footer>
    </div>
  );
}
