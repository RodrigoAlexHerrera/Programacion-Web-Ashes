"use client"

import { Grid3X3, List, Lock } from "lucide-react"
import ResultCard from "./ResultCard"
import ResultListItem from "./ResultListItem"
import { filterResults } from "@/utils/searchUtils"
import type { Result } from "@/types"

interface ResultsContainerProps {
  results: Result[]
  searchTerm: string
  selectedCategory: string
  selectedFilters: string[]
  viewMode: "grid" | "list"
  onViewModeChange: (mode: "grid" | "list") => void
  onClearFilters: () => void
  isAuthenticated?: boolean
}

export default function ResultsContainer({
  results,
  searchTerm,
  selectedCategory,
  selectedFilters,
  viewMode,
  onViewModeChange,
  onClearFilters,
  isAuthenticated = false,
}: ResultsContainerProps) {
  const filtered = filterResults(results, searchTerm, selectedCategory, selectedFilters, isAuthenticated)

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <button
            onClick={() => onViewModeChange("grid")}
            className={`p-2 rounded-lg transition-all duration-300 ${
              viewMode === "grid"
                ? "bg-purple-500/40 border border-purple-500/60 text-white"
                : "bg-white/5 border border-white/10 text-white/70 hover:bg-white/10"
            }`}
            aria-label="Grid view"
            title="Grid View"
          >
            <Grid3X3 className="w-5 h-5" />
          </button>
          <button
            onClick={() => onViewModeChange("list")}
            className={`p-2 rounded-lg transition-all duration-300 ${
              viewMode === "list"
                ? "bg-purple-500/40 border border-purple-500/60 text-white"
                : "bg-white/5 border border-white/10 text-white/70 hover:bg-white/10"
            }`}
            aria-label="List view"
            title="List View"
          >
            <List className="w-5 h-5" />
          </button>
        </div>

        {(searchTerm || selectedCategory || selectedFilters.length > 0) && (
          <button
            onClick={onClearFilters}
            className="px-3 py-2 text-sm rounded-lg bg-white/5 border border-white/10 text-white/70 hover:bg-white/10 hover:text-white transition-all duration-300"
            aria-label="Clear filters"
          >
            Limpiar filtros
          </button>
        )}
      </div>

      {!isAuthenticated && results.some((r) => r.requiresAuth) && (
        <div className="flex items-center gap-2 p-3 rounded-lg bg-blue-500/10 border border-blue-500/30 text-blue-200 text-sm">
          <Lock className="w-4 h-4 flex-shrink-0" />
          <span>Algunos resultados requieren autenticación. Inicia sesión para ver más contenido.</span>
        </div>
      )}

      {filtered.length > 0 ? (
        <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" : "space-y-3"}>
          {filtered.map((result) => (
            <div key={result.id} className="animate-in fade-in duration-300">
              {viewMode === "grid" ? (
                <ResultCard result={result} searchTerm={searchTerm} />
              ) : (
                <ResultListItem result={result} searchTerm={searchTerm} />
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-white/40 mb-2">Sin resultados</div>
          <p className="text-sm text-white/30">Intenta con otros términos de búsqueda o filtros</p>
        </div>
      )}
    </div>
  )
}
