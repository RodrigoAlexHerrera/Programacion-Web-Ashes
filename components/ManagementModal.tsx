"use client"

import { X, Edit2, Trash2, Plus, Lock } from "lucide-react"
import { useState } from "react"
import type { Result } from "@/types"

interface ManagementModalProps {
  results: Result[]
  onSave: (results: Result[]) => void
  onClose: () => void
}

export default function ManagementModal({ results, onSave, onClose }: ManagementModalProps) {
  const [editingId, setEditingId] = useState<string | null>(null)
  const [showNew, setShowNew] = useState(false)
  const [formData, setFormData] = useState<Partial<Result>>({})

  const handleDelete = (id: string) => {
    onSave(results.filter((r) => r.id !== id))
  }

  const handleEdit = (result: Result) => {
    setEditingId(result.id)
    setFormData(result)
  }

  const handleSave = () => {
    if (editingId) {
      onSave(results.map((r) => (r.id === editingId ? { ...r, ...formData } : r)))
      setEditingId(null)
    } else {
      const newResult: Result = {
        id: Date.now().toString(),
        title: formData.title || "",
        description: formData.description || "",
        category: formData.category || "webs",
        filters: formData.filters || [],
        tags: formData.tags || [],
        url: formData.url,
        thumbnail: formData.thumbnail,
        createdAt: new Date().toISOString(),
        requiresAuth: formData.requiresAuth || false,
      }
      onSave([...results, newResult])
      setShowNew(false)
    }
    setFormData({})
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900/95 border border-white/10 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 flex items-center justify-between p-6 border-b border-white/10 bg-gray-900/95">
          <h2 className="text-xl font-bold text-white">Gestionar Resultados</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            aria-label="Close management"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          {editingId ? (
            <div className="bg-white/5 border border-white/10 rounded-lg p-6 space-y-4">
              <h3 className="font-semibold text-white">Editar resultado</h3>
              <input
                type="text"
                placeholder="Título"
                value={formData.title || ""}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-purple-500"
              />
              <textarea
                placeholder="Descripción"
                value={formData.description || ""}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-purple-500 min-h-24"
              />
              <label className="flex items-center gap-2 p-3 rounded-lg bg-white/5 border border-white/10 cursor-pointer hover:bg-white/10 transition-colors">
                <input
                  type="checkbox"
                  checked={formData.requiresAuth || false}
                  onChange={(e) => setFormData({ ...formData, requiresAuth: e.target.checked })}
                  className="w-4 h-4 rounded"
                />
                <span className="text-sm font-medium text-white">Solo usuarios autenticados</span>
              </label>
              <div className="flex gap-3">
                <button
                  onClick={handleSave}
                  className="px-4 py-2 rounded-lg bg-purple-500/40 hover:bg-purple-500/50 text-white transition-colors"
                >
                  Guardar
                </button>
                <button
                  onClick={() => setEditingId(null)}
                  className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
                >
                  Cancelar
                </button>
              </div>
            </div>
          ) : (
            <>
              <button
                onClick={() => setShowNew(true)}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-gradient-to-r from-purple-500/30 to-pink-500/30 hover:from-purple-500/40 hover:to-pink-500/40 text-white transition-all"
              >
                <Plus className="w-5 h-5" />
                Agregar nuevo resultado
              </button>

              {showNew && (
                <div className="bg-white/5 border border-white/10 rounded-lg p-6 space-y-4">
                  <h3 className="font-semibold text-white">Nuevo resultado</h3>
                  <input
                    type="text"
                    placeholder="Título"
                    value={formData.title || ""}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-purple-500"
                  />
                  <textarea
                    placeholder="Descripción"
                    value={formData.description || ""}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-purple-500 min-h-24"
                  />
                  <label className="flex items-center gap-2 p-3 rounded-lg bg-white/5 border border-white/10 cursor-pointer hover:bg-white/10 transition-colors">
                    <input
                      type="checkbox"
                      checked={formData.requiresAuth || false}
                      onChange={(e) => setFormData({ ...formData, requiresAuth: e.target.checked })}
                      className="w-4 h-4 rounded"
                    />
                    <span className="text-sm font-medium text-white">Solo usuarios autenticados</span>
                  </label>
                  <div className="flex gap-3">
                    <button
                      onClick={handleSave}
                      className="px-4 py-2 rounded-lg bg-purple-500/40 hover:bg-purple-500/50 text-white transition-colors"
                    >
                      Crear
                    </button>
                    <button
                      onClick={() => setShowNew(false)}
                      className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              )}

              <div className="space-y-2">
                {results.map((result) => (
                  <div
                    key={result.id}
                    className="flex items-center gap-3 p-4 bg-white/5 border border-white/10 rounded-lg"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium text-white truncate">{result.title}</h4>
                        {result.requiresAuth && (
                          <Lock className="w-4 h-4 text-yellow-400 flex-shrink-0" title="Solo usuarios autenticados" />
                        )}
                      </div>
                      <p className="text-xs text-white/50">{result.category}</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(result)}
                        className="p-2 hover:bg-white/10 rounded-lg transition-colors text-white/70"
                        aria-label="Edit result"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(result.id)}
                        className="p-2 hover:bg-red-500/20 rounded-lg transition-colors text-red-400"
                        aria-label="Delete result"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
