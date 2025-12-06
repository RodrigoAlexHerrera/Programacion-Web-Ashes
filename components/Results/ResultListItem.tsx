"use client"

import { ExternalLink } from "lucide-react"
import { highlightText } from "@/utils/searchUtils"

interface ResultListItemProps {
  result: {
    id: string
    title: string
    description: string
    category: string
    filters: string[]
    tags: string[]
    url?: string
    thumbnail?: string
  }
  searchTerm: string
}

export default function ResultListItem({ result, searchTerm }: ResultListItemProps) {
  const categoryLabels: Record<string, string> = {
    webs: "Webs",
    files: "Archivos",
    products: "Productos",
    news: "Noticias",
    images: "Imágenes",
  }

  return (
    <div className="bg-white/5 border border-white/10 hover:border-white/20 rounded-lg p-4 md:p-5 flex gap-4 hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300 group">
      {/* Thumbnail */}
      {result.thumbnail && (
        <div className="hidden md:block w-24 h-24 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded overflow-hidden flex-shrink-0">
          <img
            src={result.thumbnail || "/placeholder.svg"}
            alt={result.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
        </div>
      )}

      <div className="flex-1 min-w-0">
        {/* Header */}
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="flex-1">
            <h3 className="font-semibold text-white text-sm md:text-base">
              {searchTerm ? (
                <span dangerouslySetInnerHTML={{ __html: highlightText(result.title, searchTerm) }} />
              ) : (
                result.title
              )}
            </h3>
          </div>
          {result.url && <ExternalLink className="w-4 h-4 text-white/40 flex-shrink-0 mt-1" />}
        </div>

        {/* Description */}
        <p className="text-sm text-white/60 mb-3">
          {searchTerm ? (
            <span dangerouslySetInnerHTML={{ __html: highlightText(result.description, searchTerm) }} />
          ) : (
            result.description
          )}
        </p>

        {/* Meta */}
        <div className="flex flex-wrap items-center gap-3 text-xs text-white/50">
          <span className="px-2 py-1 rounded bg-purple-500/30 text-purple-100">{categoryLabels[result.category]}</span>
          {result.filters.map((filter) => (
            <span key={filter}>{filter}</span>
          ))}
        </div>
      </div>
    </div>
  )
}
