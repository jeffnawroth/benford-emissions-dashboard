// Mirrors the domain shape returned by the `@benford/worker` API
// (apps/worker/src/normalize.ts) — kept in sync manually since the two are
// separately deployable packages with no runtime dependency on each other.

export type EmissionKind = 'co2' | 'ghg'

export interface NormalizedCountry {
  id: number
  name: string
  code: string
}

export interface NormalizedRecord {
  countryId: number
  year: number
  value: number
}

export interface NormalizedDataset {
  name: string
  unit: string
  citation: string
  countries: NormalizedCountry[]
  years: number[]
  records: NormalizedRecord[]
}

/** A dataset the user uploaded as CSV, reduced to just the numbers being analyzed. */
export interface UploadedDataset {
  fileName: string
  columnName: string
  values: number[]
}
