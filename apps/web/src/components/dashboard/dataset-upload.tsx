'use client'

import * as Select from '@radix-ui/react-select'
import { Check, ChevronDown } from 'lucide-react'
import Papa from 'papaparse'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { detectNumericColumn, parseNumericColumn } from '@/lib/csv'
import { useDashboardStore } from '@/store/dashboard-store'

export function DatasetUpload() {
  const [headers, setHeaders] = useState<string[]>([])
  const [rows, setRows] = useState<Record<string, string>[]>([])
  const [fileName, setFileName] = useState<string | null>(null)
  const [selectedColumn, setSelectedColumn] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const uploadedDataset = useDashboardStore(state => state.uploadedDataset)
  const setUploadedDataset = useDashboardStore(state => state.setUploadedDataset)
  const setDataSource = useDashboardStore(state => state.setDataSource)

  function handleFile(file: File) {
    setError(null)
    Papa.parse<Record<string, string>>(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const parsedHeaders = results.meta.fields ?? []
        if (parsedHeaders.length === 0) {
          setError('Could not find any columns in this file.')
          return
        }
        setHeaders(parsedHeaders)
        setRows(results.data)
        setFileName(file.name)

        const detected = detectNumericColumn(parsedHeaders, results.data)
        const column = detected ?? parsedHeaders[0]!
        setSelectedColumn(column)
        applyColumn(file.name, results.data, column)
      },
      error: (parseError) => {
        setError(parseError.message)
      },
    })
  }

  function applyColumn(name: string, parsedRows: Record<string, string>[], column: string) {
    const values = parseNumericColumn(parsedRows, column)
    setUploadedDataset({ fileName: name, columnName: column, values })
  }

  return (
    <div className="space-y-3">
      <div>
        <label htmlFor="csv-upload" className="mb-1 block text-sm font-medium">
          Upload a CSV file
        </label>
        <input
          id="csv-upload"
          type="file"
          accept=".csv"
          onChange={(e) => {
            const file = e.target.files?.[0]
            if (file)
              handleFile(file)
          }}
          className="block w-full text-sm"
        />
      </div>

      {error && (
        <p role="status" aria-live="assertive" className="text-sm text-error">
          {error}
        </p>
      )}

      {headers.length > 0 && (
        <div className="flex items-center gap-2 text-sm">
          <span className="text-muted-foreground">Column:</span>
          <Select.Root
            value={selectedColumn ?? undefined}
            onValueChange={(column) => {
              setSelectedColumn(column)
              if (fileName)
                applyColumn(fileName, rows, column)
            }}
          >
            <Select.Trigger className="inline-flex items-center gap-1 rounded-sm border border-border bg-surface px-2 py-1">
              <Select.Value />
              <ChevronDown className="size-3.5" />
            </Select.Trigger>
            <Select.Portal>
              <Select.Content className="rounded-lg border border-border bg-surface-elevated shadow-elevation-lg">
                <Select.Viewport>
                  {headers.map(header => (
                    <Select.Item
                      key={header}
                      value={header}
                      className="flex items-center gap-2 px-3 py-1.5 text-sm data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground data-[highlighted]:outline-none"
                    >
                      <Select.ItemIndicator>
                        <Check className="size-3.5" />
                      </Select.ItemIndicator>
                      <Select.ItemText>{header}</Select.ItemText>
                    </Select.Item>
                  ))}
                </Select.Viewport>
              </Select.Content>
            </Select.Portal>
          </Select.Root>
        </div>
      )}

      {uploadedDataset && (
        <p className="text-sm text-muted-foreground">
          Analyzing
          {' '}
          <span className="font-mono tabular-nums">{uploadedDataset.values.length}</span>
          {' '}
          values from &ldquo;
          {uploadedDataset.columnName}
          &rdquo; in
          {' '}
          {uploadedDataset.fileName}
          .
          {' '}
          <Button variant="link" size="sm" className="h-auto p-0" onClick={() => setDataSource('owid')}>
            Switch back to Our World in Data
          </Button>
        </p>
      )}
    </div>
  )
}
