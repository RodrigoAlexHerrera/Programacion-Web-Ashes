import type React from "react"
import type { Result } from "@/types"

export const filterResults = (
  results: Result[],
  searchTerm: string,
  selectedCategory: string,
  selectedFilters: string[],
  isAuthenticated: boolean,
): Result[] => {
  let filtered = results

  filtered = filtered.filter((result) => {
    if (result.requiresAuth && !isAuthenticated) {
      return false
    }
    return true
  })

  if (selectedCategory) {
    filtered = filtered.filter((result) => result.category === selectedCategory)
  }

  if (selectedFilters.length > 0) {
    filtered = filtered.filter((result) => result.filters.some((f) => selectedFilters.includes(f)))
  }

  if (searchTerm.trim()) {
    const term = searchTerm.toLowerCase()
    filtered = filtered.filter(
      (result) =>
        result.title.toLowerCase().includes(term) ||
        result.description.toLowerCase().includes(term) ||
        result.tags.some((tag) => tag.toLowerCase().includes(term)),
    )
  }

  return filtered
}

export const highlightText = (text: string, searchTerm: string): string => {
  if (!searchTerm.trim()) return text
  const regex = new RegExp(`(${searchTerm.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi")
  return text.replace(regex, "<mark>$1</mark>")
}

export const highlightSearchTerm = (text: string, searchTerm: string): React.ReactNode => {
  if (!searchTerm.trim()) return text

  const parts = text.split(new RegExp(`(${searchTerm.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi"))

  return parts.map((part, index) =>
    part.toLowerCase() === searchTerm.toLowerCase() ? (
      <mark key={index} className="bg-yellow-400/30 font-semibold">
        {part}
      </mark>
    ) : (
      part
    ),
  )
}
