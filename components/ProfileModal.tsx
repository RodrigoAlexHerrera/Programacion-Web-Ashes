"use client"

import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { User, Result, SearchHistory } from "@/types"
import { getRecommendations, getRecentSearchCategories } from "@/utils/recommendations"

interface ProfileModalProps {
  user: User | null
  results: Result[]
  searchHistory: SearchHistory[]
  onClose: () => void
  onRecommendationSelect?: (result: Result) => void
}

export default function ProfileModal({
  user,
  results,
  searchHistory,
  onClose,
  onRecommendationSelect,
}: ProfileModalProps) {
  if (!user) return null

  const recommendations = getRecommendations(results, searchHistory, true)
  const recentCategories = getRecentSearchCategories(searchHistory)

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white/10 border-white/20 backdrop-blur-xl">
        <div className="sticky top-0 flex items-center justify-between p-6 border-b border-white/10 bg-white/5">
          <h2 className="text-2xl font-bold text-white">Mi Perfil</h2>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-lg transition-colors" aria-label="Cerrar">
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        <div className="p-6 space-y-8">
          {/* User Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Información de Usuario</h3>
            <div className="bg-white/5 border border-white/10 rounded-lg p-4 space-y-2">
              <p className="text-sm text-white/60">Email</p>
              <p className="text-white font-medium">{user.email}</p>
              <p className="text-sm text-white/60 mt-3">Rol</p>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="bg-purple-500/20 border-purple-500/50 text-purple-200">
                  {user.role === "admin" ? "Administrador" : "Usuario"}
                </Badge>
              </div>
            </div>
          </div>

          {/* Recent Search Categories */}
          {recentCategories.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">Búsquedas Recientes</h3>
              <div className="flex flex-wrap gap-2">
                {recentCategories.map(({ category, count }) => (
                  <Badge key={category} variant="secondary" className="text-sm">
                    {category} ({count})
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Recommendations */}
          {recommendations.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">Recomendaciones Personalizadas</h3>
              <p className="text-sm text-white/60">Basadas en tus últimas búsquedas</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {recommendations.map((result) => (
                  <div
                    key={result.id}
                    className="bg-white/5 border border-white/10 rounded-lg p-4 hover:bg-white/10 transition-colors cursor-pointer"
                    onClick={() => {
                      onRecommendationSelect?.(result)
                      onClose()
                    }}
                  >
                    <h4 className="text-sm font-semibold text-white line-clamp-2">{result.title}</h4>
                    <p className="text-xs text-white/60 mt-1 line-clamp-2">{result.description}</p>
                    <div className="flex gap-2 mt-3 flex-wrap">
                      <Badge variant="outline" className="text-xs bg-purple-500/20 border-purple-500/50">
                        {result.category}
                      </Badge>
                      {result.filters[0] && (
                        <Badge variant="outline" className="text-xs bg-blue-500/20 border-blue-500/50">
                          {result.filters[0]}
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {recommendations.length === 0 && searchHistory.length === 0 && (
            <div className="text-center py-8">
              <p className="text-white/60">No hay recomendaciones disponibles aún.</p>
              <p className="text-white/40 text-sm mt-2">
                Realiza búsquedas para obtener recomendaciones personalizadas.
              </p>
            </div>
          )}

          <Button
            onClick={onClose}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold"
          >
            Cerrar
          </Button>
        </div>
      </Card>
    </div>
  )
}
