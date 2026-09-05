import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { TooltipProvider } from '@/components/ui/tooltip'
import HomePage from './page'

function renderWithProviders() {
  const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } })
  return render(
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <HomePage />
      </TooltipProvider>
    </QueryClientProvider>,
  )
}

describe('homePage', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ name: 'Test', unit: 't', citation: '', countries: [], years: [2020], records: [] }),
    }))
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('renders the dashboard heading', () => {
    renderWithProviders()
    expect(screen.getByRole('heading', { name: /benford dashboard/i })).toBeInTheDocument()
  })

  it('renders the data-source toggle', () => {
    renderWithProviders()
    expect(screen.getByRole('button', { name: /our world in data/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /upload your own csv/i })).toBeInTheDocument()
  })
})
