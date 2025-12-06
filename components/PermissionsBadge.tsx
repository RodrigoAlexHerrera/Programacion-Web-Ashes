"use client"

import { Shield, Search } from "lucide-react"
import type { User } from "@/types"

interface PermissionsBadgeProps {
  user: User
}

export default function PermissionsBadge({ user }: PermissionsBadgeProps) {
  return (
    <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-lg p-4 mb-6">
      <div className="flex items-start gap-3">
        {user.role === "admin" ? (
          <>
            <Shield className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-white text-sm">Modo Administrador</h3>
              <p className="text-xs text-white/60 mt-1">
                Tienes acceso completo: búsquedas, gestión de resultados y estadísticas
              </p>
            </div>
          </>
        ) : (
          <>
            <Search className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-white text-sm">Modo Usuario</h3>
              <p className="text-xs text-white/60 mt-1">
                Puedes realizar búsquedas y explorar resultados. Cambiar tema disponible
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
