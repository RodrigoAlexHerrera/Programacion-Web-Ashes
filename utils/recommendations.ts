import type { Result, SearchHistory } from "@/types"

export const getRecommendations = (
  allResults: Result[],
  searchHistory: SearchHistory[],
  isAuthenticated: boolean,
): Result[] => {
  if (searchHistory.length === 0) return []

  // Get the most recent searches and their categories/filters
  const recentSearches = searchHistory.slice(0, 5)

  // Collect all unique categories and filters from recent searches
  const relevantCategories = new Set<string>()
  const relevantFilters = new Set<string>()

  recentSearches.forEach((search) => {
    relevantCategories.add(search.category)
    search.filters.forEach((f) => relevantFilters.add(f))
  })

  // Score each result based on category and filter matches
  const scoredResults = allResults
    .filter((result) => {
      // If result requires auth and user is not authenticated, exclude it
      if (result.requiresAuth && !isAuthenticated) {
        return false
      }
      return true
    })
    .map((result) => {
      let score = 0

      // Check category match
      if (relevantCategories.has(result.category)) {
        score += 2
      }

      // Check filter matches
      result.filters.forEach((filter) => {
        if (relevantFilters.has(filter)) {
          score += 1
        }
      })

      return { result, score }
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .map(({ result }) => result)
    .slice(0, 6) // Return top 6 recommendations

  return scoredResults
}

export const getRecentSearchCategories = (searchHistory: SearchHistory[]) => {
  const categories: { [key: string]: number } = {}

  searchHistory.slice(0, 10).forEach((search) => {
    if (search.category) {
      categories[search.category] = (categories[search.category] || 0) + 1
    }
  })

  return Object.entries(categories)
    .sort((a, b) => b[1] - a[1])
    .map(([category, count]) => ({ category, count }))
}
