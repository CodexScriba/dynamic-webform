# Sign-up Card Visual Notes

## Layout breakdown
- The sign-up page (`apps/web/app/[locale]/auth/sign-up/page.tsx`) builds the card with a two-column grid (`grid grid-cols-1 md:grid-cols-2`) inside a max-width container so the composition stays balanced on all screens.
- Card content sits on a soft gradient backdrop (`bg-gradient-to-br` from background → muted → accent2 with /20 opacity) that helps the drop shadow read more strongly near the bottom while fading up and into the lighter hues.
- The card itself is a glassy panel built with `bg-[hsl(var(--card))]/95` for slight transparency, `backdrop-blur-sm` to separate it from the gradient, and `rounded-2xl overflow-hidden` so images bleed nicely to the edges.

## Achieving the "shadow that disappears on top"
- Tailwind's `shadow-xl` is applied directly to the outer card wrapper. Because the gradient is darkest near the bottom, the bottom portion of the shadow reads deeper while the top blends into the lighter background, giving that disappearing effect without custom CSS.
- You can exaggerate the fade by stacking utility shadows, for example:
  ```tsx
  className="shadow-xl shadow-black/10 md:shadow-[0_40px_80px_-20px_rgba(15,23,42,0.45)]"
  ```
  The first shadow keeps a consistent blur, while the second adds a heavier base that tapers upward.
- Keeping `overflow-hidden` means any child media uses the same rounded geometry, which prevents sharp edges that would otherwise break the illusion.

## Optional refinements
- Add a subtle light edge highlight with `ring-1 ring-white/40 ring-inset` to enhance the glass-like feel without flattening the shadow.
- When using a background image (the right column), wrapping it in a `relative`/`absolute` pair with `rounded-xl overflow-hidden` ensures it conforms to the card radius and keeps focus on the illustration.

## Supporting styles in the codebase
- `apps/web/app/globals.css` defines CSS custom properties such as `--color-card` and `--color-accent2`, which the Tailwind `bg-[hsl(var(--card))]` and gradient classes reference. No additional shadow-specific utilities are declared there.
- `apps/web/components/ui/card.tsx` keeps the shared `<Card>` primitive as a simple wrapper (`rounded-xl bg-card text-card-foreground shadow`). The sign-up page does not use this component directly; instead it customizes the wrapper with the heavier shadow and blur utilities above.

Use these notes as a starting point whenever you want a dramatic, atmospheric card that anchors itself to the bottom of the screen while tapering softly toward the top.
