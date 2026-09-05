import type { NormalizedDataset } from '@/lib/types'

export function CitationFooter({ dataset }: { dataset: NormalizedDataset }) {
  return (
    <p className="mt-4 whitespace-pre-line text-xs text-muted-foreground">
      Unit:
      {' '}
      {dataset.unit}
      {'\n'}
      {dataset.citation}
    </p>
  )
}
