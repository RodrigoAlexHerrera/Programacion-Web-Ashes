"use client"

import { X } from "lucide-react"
import type { Result, SearchHistory } from "@/types"

interface StatsPanelProps {
  results: Result[]
  searchHistory: SearchHistory[]
  onClose: () => void
}

export default function StatsPanel({ results, searchHistory, onClose }: StatsPanelProps) {
  const categoryStats = results.reduce(
    (acc, result) => {
      acc[result.category] = (acc[result.category] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  const categoryLabels: Record<string, string> = {
    webs: "Webs",
    files: "Archivos",
    products: "Productos",
    news: "Noticias",
    images: "Imágenes",
  }

  const mostCommonSearches = searchHistory
    .reduce(
      (acc, search) => {
        const existing = acc.find((s) => s.term === search.term)
        if (existing) {
          existing.count++
        } else {
          acc.push({ term: search.term, count: 1 })
        }
        return acc
      },
      [] as { term: string; count: number }[],
    )
    .sort((a, b) => b.count - a.count)
    .slice(0, 5)

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900/95 border border-white/10 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 flex items-center justify-between p-6 border-b border-white/10 bg-gray-900/95">
          <h2 className="text-xl font-bold text-white">Estadísticas</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            aria-label="Close statistics"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        <div className="p-6 space-y-8">
          {/* Total Results */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Resumen General</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-lg p-4">
                <div className="text-3xl font-bold text-purple-200">{results.length}</div>
                <div className="text-sm text-white/60 mt-1">Resultados guardados</div>
              </div>
              <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30 rounded-lg p-4">
                <div className="text-3xl font-bold text-blue-200">{searchHistory.length}</div>
                <div className="text-sm text-white/60 mt-1">Búsquedas realizadas</div>
              </div>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Resultados por categoría</h3>
            <div className="space-y-3">
              {Object.entries(categoryStats).map(([category, count]) => (
                <div key={category}>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-white">{categoryLabels[category]}</span>
                    <span className="text-white/60">{count}</span>
                  </div>
                  <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all"
                      style={{ width: `${(count / results.length) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Most Common Searches */}
          {mostCommonSearches.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Búsquedas más frecuentes</h3>
              <div className="space-y-2">
                {mostCommonSearches.map((search, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                    <span className="text-white">{search.term}</span>
                    <span className="px-3 py-1 rounded-full bg-purple-500/30 text-sm text-purple-100">
                      {search.count}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
