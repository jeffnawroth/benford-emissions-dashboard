import type { EmissionKind } from '@/lib/types'
import { useQuery } from '@tanstack/react-query'
import { fetchEmissionsDataset } from '@/lib/api'

export function useEmissionsDataset(kind: EmissionKind) {
  return useQuery({
    queryKey: ['emissions', kind],
    queryFn: () => fetchEmissionsDataset(kind),
  })
}
