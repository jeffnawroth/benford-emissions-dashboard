interface DistributionResult {
  observed: number[]
  expected: number[]
}

export default function benfordsLawDistribution(numbers: number[]): DistributionResult {
  // Define Benford's Law distribution percentages
  const benfordsLaw: number[] = [0.301, 0.176, 0.125, 0.097, 0.079, 0.067, 0.058, 0.051, 0.046]

  // Initialize arrays to hold the counts of first digits
  const observedDistribution: number[] = Array(9).fill(0)
  const expectedDistribution: number[] = benfordsLaw.map(percent => percent * 100)

  // Loop through numbers and count the first digit occurrences
  for (const num of numbers) {
    if (num !== undefined && num !== null) {
      const firstDigit: number = Number.parseInt(num.toString()[0])
      if (firstDigit >= 1 && firstDigit <= 9)
        observedDistribution[firstDigit - 1]++
    }
  }

  // Calculate total count of observed digits
  const totalCount: number = observedDistribution.reduce((a, b) => a + b)

  // Convert observed counts to percentages with decimal places
  const observedPercentageDistribution: number[] = observedDistribution.map(count => (count / totalCount) * 100)

  return { observed: observedPercentageDistribution, expected: expectedDistribution }
}
