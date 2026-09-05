'use client'

import type { BenfordAnalysisOk } from '@benford/stats'
import { Download } from 'lucide-react'
import { analysisToCsv, analysisToJson, triggerDownload } from '@/lib/export'

export function ExportButtons({ analysis, source }: { analysis: BenfordAnalysisOk, source: string }) {
  return (
    <div className="flex gap-2">
      <button
        type="button"
        onClick={() => triggerDownload(`benford-${analysis.testType}.csv`, analysisToCsv(analysis, { source }), 'text/csv')}
        className="inline-flex items-center gap-1.5 rounded-md border border-border px-2.5 py-1.5 text-sm"
      >
        <Download className="size-3.5" />
        Export CSV
      </button>
      <button
        type="button"
        onClick={() => triggerDownload(`benford-${analysis.testType}.json`, analysisToJson(analysis, { source }), 'application/json')}
        className="inline-flex items-center gap-1.5 rounded-md border border-border px-2.5 py-1.5 text-sm"
      >
        <Download className="size-3.5" />
        Export JSON
      </button>
    </div>
  )
}
