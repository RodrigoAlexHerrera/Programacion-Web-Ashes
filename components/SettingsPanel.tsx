"use client"

import { X, Download, Upload, RotateCcw, LogOut } from "lucide-react"
import { useRef } from "react"
import { THEME_CONFIG } from "@/utils/themes"
import type { Theme, SearchHistory } from "@/types"

interface SettingsPanelProps {
  currentTheme: Theme
  onThemeChange: (theme: Theme) => void
  onClose: () => void
  searchHistory: SearchHistory[]
  onHistorySelect: (search: SearchHistory) => void
  onClearHistory: () => void
  onExport: () => void
  onImport: (file: File) => void
  onReset: () => void
  onLogout?: () => void
}

export default function SettingsPanel({
  currentTheme,
  onThemeChange,
  onClose,
  searchHistory,
  onHistorySelect,
  onClearHistory,
  onExport,
  onImport,
  onReset,
  onLogout,
}: SettingsPanelProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const themes: Array<{ id: Theme; name: string; config: (typeof THEME_CONFIG)["dark"] }> = [
    { id: "dark", name: "Oscuro (Morado)", config: THEME_CONFIG.dark },
    { id: "blue", name: "Azul", config: THEME_CONFIG.blue },
    { id: "green", name: "Verde", config: THEME_CONFIG.green },
    { id: "red", name: "Rojo", config: THEME_CONFIG.red },
  ]

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900/95 border border-white/10 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 flex items-center justify-between p-6 border-b border-white/10 bg-gray-900/95">
          <h2 className="text-xl font-bold text-white">Configuración</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            aria-label="Close settings"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        <div className="p-6 space-y-8">
          {/* Themes */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Temas</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {themes.map((theme) => (
                <button
                  key={theme.id}
                  onClick={() => onThemeChange(theme.id)}
                  className={`p-4 rounded-lg border-2 transition-all text-left ${
                    currentTheme === theme.id
                      ? "border-white/50 bg-white/10"
                      : "border-white/10 bg-white/5 hover:border-white/30"
                  }`}
                >
                  <div
                    className={`h-12 rounded mb-2 bg-gradient-to-r ${theme.config.gradientFrom} ${theme.config.gradientTo}`}
                  />
                  <span className="text-sm font-medium text-white">{theme.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Search History */}
          {searchHistory.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">Historial de búsquedas</h3>
                <button
                  onClick={onClearHistory}
                  className="text-sm px-3 py-1 rounded bg-white/5 hover:bg-white/10 text-white/70 transition-colors"
                >
                  Limpiar
                </button>
              </div>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {searchHistory.map((search) => (
                  <button
                    key={search.id}
                    onClick={() => {
                      onHistorySelect(search)
                      onClose()
                    }}
                    className="w-full text-left p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors group"
                  >
                    <div className="text-sm text-white group-hover:text-purple-400 transition-colors">
                      {search.term}
                    </div>
                    <div className="text-xs text-white/40 mt-1">{new Date(search.timestamp).toLocaleDateString()}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Data Management */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Gestión de datos</h3>
            <div className="space-y-3">
              <button
                onClick={onExport}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-gradient-to-r from-blue-500/30 to-cyan-500/30 hover:from-blue-500/40 hover:to-cyan-500/40 text-white transition-all"
                aria-label="Export data"
              >
                <Download className="w-5 h-5" />
                Exportar datos
              </button>

              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-gradient-to-r from-green-500/30 to-emerald-500/30 hover:from-green-500/40 hover:to-emerald-500/40 text-white transition-all"
                aria-label="Import data"
              >
                <Upload className="w-5 h-5" />
                Importar datos
              </button>

              <button
                onClick={onReset}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-gradient-to-r from-red-500/30 to-orange-500/30 hover:from-red-500/40 hover:to-orange-500/40 text-white transition-all"
                aria-label="Reset to sample data"
              >
                <RotateCcw className="w-5 h-5" />
                Restablecer datos de ejemplo
              </button>

              <input
                ref={fileInputRef}
                type="file"
                accept=".json"
                onChange={(e) => {
                  if (e.target.files?.[0]) {
                    onImport(e.target.files[0])
                    onClose()
                  }
                }}
                className="hidden"
              />
            </div>
          </div>

          {/* Logout Button - Added at the end */}
          {onLogout && (
            <div className="pt-4 border-t border-white/10">
              <button
                onClick={() => {
                  onLogout()
                  onClose()
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-gradient-to-r from-red-500/30 to-orange-500/30 hover:from-red-500/40 hover:to-orange-500/40 text-white transition-all"
                aria-label="Logout"
              >
                <LogOut className="w-5 h-5" />
                Cerrar sesión
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
