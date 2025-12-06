"use client"

import { Search } from "lucide-react"
import { useMemo } from "react"

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  resultsCount: number
}

export default function SearchBar({ value, onChange, resultsCount }: SearchBarProps) {
  const displayCount = useMemo(() => resultsCount, [resultsCount])

  return (
    <div className="space-y-3">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
        <input
          type="text"
          placeholder="Buscar en Ashes..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full pl-12 pr-4 py-4 md:py-5 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 focus:border-purple-500/50 focus:bg-white/10 text-white placeholder-white/40 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
          aria-label="Search"
        />
      </div>
      <p className="text-sm text-white/50 pl-4">
        {displayCount} {displayCount === 1 ? "resultado" : "resultados"} encontrados
      </p>
    </div>
  )
}
