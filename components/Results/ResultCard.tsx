"use client"

import { Lock } from "lucide-react"
import { highlightSearchTerm } from "@/utils/searchUtils"

interface ResultCardProps {
  result: {
    id: string
    title: string
    description: string
    category: string
    filters: string[]
    tags: string[]
    url?: string
    thumbnail?: string
    requiresAuth?: boolean
  }
  searchTerm: string
}

export default function ResultCard({ result, searchTerm }: ResultCardProps) {
  const categoryLabels: Record<string, string> = {
    webs: "Webs",
    files: "Archivos",
    products: "Productos",
    news: "Noticias",
    images: "Imágenes",
  }

  return (
    <div className="h-full bg-white/5 border border-white/10 hover:border-white/20 rounded-lg overflow-hidden hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300 hover:scale-105 group">
      {result.thumbnail && (
        <div className="w-full h-40 bg-gradient-to-br from-purple-500/20 to-pink-500/20 overflow-hidden">
          <img
            src={result.thumbnail || "/placeholder.svg"}
            alt={result.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
        </div>
      )}

      <div className="p-4">
        <div className="mb-3 flex items-center gap-2 justify-between">
          <span className="inline-block px-2 py-1 text-xs font-semibold rounded bg-purple-500/30 text-purple-100">
            {categoryLabels[result.category]}
          </span>
          {result.requiresAuth && (
            <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold rounded bg-yellow-500/30 text-yellow-100">
              <Lock className="w-3 h-3" />
              Privado
            </span>
          )}
        </div>

        <h3 className="font-semibold text-white mb-2 line-clamp-2 text-sm md:text-base">
          {highlightSearchTerm(result.title, searchTerm)}
        </h3>

        <p className="text-sm text-white/60 mb-3 line-clamp-2">{highlightSearchTerm(result.description, searchTerm)}</p>

        {result.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 pt-3 border-t border-white/10">
            {result.tags.slice(0, 2).map((tag) => (
              <span key={tag} className="text-xs text-white/40">
                #{tag}
              </span>
            ))}
            {result.tags.length > 2 && <span className="text-xs text-white/40">+{result.tags.length - 2}</span>}
          </div>
        )}
      </div>
    </div>
  )
}
