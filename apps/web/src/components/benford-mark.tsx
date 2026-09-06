// Nine bars tracing Benford's Law leading-digit distribution (~30% down to
// ~4.6%) — the product's core visual signature, reused as a small wordmark
// glyph rather than a repeated decoration.
const HEIGHTS = [30.1, 17.6, 12.5, 9.7, 7.9, 6.7, 5.8, 5.1, 4.6]

export function BenfordMark({ className }: { className?: string }) {
  const barWidth = 2
  const gap = 1
  const maxHeight = 20

  return (
    <svg
      viewBox={`0 0 ${HEIGHTS.length * (barWidth + gap) - gap} ${maxHeight}`}
      className={className}
      fill="currentColor"
      aria-hidden="true"
    >
      {HEIGHTS.map((height, i) => {
        const barHeight = (height / HEIGHTS[0]!) * maxHeight
        return (
          <rect
            key={height}
            x={i * (barWidth + gap)}
            y={maxHeight - barHeight}
            width={barWidth}
            height={barHeight}
            rx={0.5}
          />
        )
      })}
    </svg>
  )
}
