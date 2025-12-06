"use client"

import ResultsContainer from "./Results/ResultsContainer"
import type { Result } from "@/types"

interface ResultsProps {
  results: Result[]
  searchTerm: string
  selectedCategory: string
  selectedFilters: string[]
  viewMode: "grid" | "list"
  onViewModeChange: (mode: "grid" | "list") => void
  onClearFilters: () => void
  isAuthenticated?: boolean
}

export default function Results(props: ResultsProps) {
  return <ResultsContainer {...props} />
}
