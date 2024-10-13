export interface Country {
  id: number
  name: string
  code: string
}

export interface Data {
  entities: number[]
  years: number[]
  values: number[]
}

export interface EmissionType {
  id: number
  shortHand: string
}

export interface Metadata {
  id: number
  name: string
  unit: string
  createdAt: string
  updatedAt: string
  coverage: string
  timespan: string
  datasetId: number
  shortUnit: string
  columnOrder: number
  shortName: string
  catalogPath: string
  descriptionShort: string
  descriptionProcessing: string
  type: string
  dataChecksum: string
  metadataChecksum: string
  datasetName: string
  updatePeriodDays: number
  datasetVersion: string
  nonRedistributable: boolean
  display: {
    unit: string
    shortUnit: string
  }
  schemaVersion: number
  processingLevel: string
  presentation: {
    attributionShort: string
    topicTagsLinks: string[]
    faqs: any[]
  }
  descriptionKey: string[]
  dimensions: {
    years: {
      values: {
        id: number
      }[]
    }
    entities: {
      values: {
        id: number
        name: string
        code: string
      }[]
    }
  }
  origins: {
    id: number
    titleSnapshot: string
    title: string
    description: string
    producer: string
    citationFull: string
    attribution: string
    attributionShort: string
    urlMain: string
    urlDownload: string
    dateAccessed: string
    datePublished: string
    license: {
      url: string
      name: string
    }
  }[]
}
