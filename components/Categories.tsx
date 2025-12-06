"use client"

import { Globe, FileText, ShoppingCart, Newspaper, Camera } from "lucide-react"

const CATEGORIES = [
  { id: "webs", name: "Webs", icon: Globe },
  { id: "files", name: "Archivos", icon: FileText },
  { id: "products", name: "Productos", icon: ShoppingCart },
  { id: "news", name: "Noticias", icon: Newspaper },
  { id: "images", name: "Imágenes", icon: Camera },
]

interface CategoriesProps {
  selectedCategory: string
  onCategorySelect: (category: string) => void
}

export default function Categories({ selectedCategory, onCategorySelect }: CategoriesProps) {
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-white uppercase tracking-wide pl-2">Categorías</h3>
      <div className="space-y-2">
        {CATEGORIES.map((category) => {
          const Icon = category.icon
          const isSelected = selectedCategory === category.id

          return (
            <button
              key={category.id}
              onClick={() => onCategorySelect(category.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                isSelected
                  ? "bg-gradient-to-r from-purple-500/30 to-pink-500/30 border border-purple-500/50 text-white shadow-lg shadow-purple-500/20 scale-105"
                  : "bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/10 text-white/70 hover:text-white"
              }`}
              aria-pressed={isSelected}
              aria-label={`Select ${category.name} category`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium text-sm">{category.name}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
