'use client'

import type { BenfordAnalysisOk } from '@benford/stats'
import { Download } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { analysisToCsv, analysisToJson, triggerDownload } from '@/lib/export'

export function ExportButtons({ analysis, source }: { analysis: BenfordAnalysisOk, source: string }) {
  return (
    <div className="flex gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={() => triggerDownload(`benford-${analysis.testType}.csv`, analysisToCsv(analysis, { source }), 'text/csv')}
      >
        <Download className="size-3.5" aria-hidden="true" />
        Export CSV
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => triggerDownload(`benford-${analysis.testType}.json`, analysisToJson(analysis, { source }), 'application/json')}
      >
        <Download className="size-3.5" aria-hidden="true" />
        Export JSON
      </Button>
    </div>
  )
}
