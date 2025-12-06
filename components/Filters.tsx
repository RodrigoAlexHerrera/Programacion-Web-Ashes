"use client"

import { getFiltersByCategory } from "@/data/filters"

interface FiltersProps {
  category: string
  selectedFilters: string[]
  onFilterToggle: (filter: string) => void
}

export default function Filters({ category, selectedFilters, onFilterToggle }: FiltersProps) {
  const filters = getFiltersByCategory(category)

  return (
    <div className="animate-in fade-in slide-in-from-top-2 duration-300">
      <div className="bg-white/5 border border-white/10 rounded-lg p-4 md:p-5">
        <h3 className="text-sm font-semibold text-white uppercase tracking-wide mb-4">Filtros Disponibles</h3>
        <div className="flex flex-wrap gap-2">
          {filters.map((filter) => {
            const isSelected = selectedFilters.includes(filter)

            return (
              <button
                key={filter}
                onClick={() => onFilterToggle(filter)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  isSelected
                    ? "bg-purple-500/40 border border-purple-500/60 text-white"
                    : "bg-white/5 border border-white/10 text-white/70 hover:bg-white/10 hover:text-white"
                }`}
                aria-pressed={isSelected}
                aria-label={`Toggle ${filter} filter`}
              >
                {filter}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
