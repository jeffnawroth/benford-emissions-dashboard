import type { NormalizedDataset } from '@/lib/types'

export function CitationFooter({ dataset }: { dataset: NormalizedDataset }) {
  return (
    <p className="whitespace-pre-line border-t border-divider pt-4 text-xs text-muted-foreground">
      Unit:
      {' '}
      {dataset.unit}
      {'\n'}
      {dataset.citation}
    </p>
  )
}
