"use client"

import { Settings, BarChart3, Database, LogOut, User } from "lucide-react"
import type { Theme, User as UserType } from "@/types"

interface HeaderProps {
  user: UserType
  theme: Theme
  onSettingsClick: () => void
  onStatsClick: () => void
  onManagementClick: () => void
  onProfileClick?: () => void
  onLogout: () => void
}

export default function Header({
  user,
  theme,
  onSettingsClick,
  onStatsClick,
  onManagementClick,
  onProfileClick,
  onLogout,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-background/30 border-b border-white/10">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Ashes
          </div>
          <div className="text-xs md:text-sm text-white/50 font-medium">Advanced Search</div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex flex-col items-end">
            <div className="text-sm font-medium text-white">{user.email}</div>
            <div
              className={`text-xs font-semibold px-2 py-0.5 rounded ${
                user.role === "admin"
                  ? "bg-purple-500/30 text-purple-300"
                  : user.isGuest
                    ? "bg-slate-500/30 text-slate-300"
                    : "bg-blue-500/30 text-blue-300"
              }`}
            >
              {user.isGuest ? "Invitado" : user.role === "admin" ? "Administrador" : "Usuario"}
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-3">
            {!user.isGuest && (
              <button
                onClick={onProfileClick}
                className="p-2 md:p-3 rounded-lg bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-all duration-300 hover:scale-105"
                aria-label="View profile"
                title="Mi Perfil"
              >
                <User className="w-5 h-5 md:w-6 md:h-6" />
              </button>
            )}

            {user.role === "admin" && (
              <button
                onClick={onManagementClick}
                className="p-2 md:p-3 rounded-lg bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-all duration-300 hover:scale-105"
                aria-label="Manage results"
                title="Manage Results"
              >
                <Database className="w-5 h-5 md:w-6 md:h-6" />
              </button>
            )}

            {user.role === "admin" && (
              <button
                onClick={onStatsClick}
                className="p-2 md:p-3 rounded-lg bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-all duration-300 hover:scale-105"
                aria-label="View statistics"
                title="Statistics"
              >
                <BarChart3 className="w-5 h-5 md:w-6 md:h-6" />
              </button>
            )}

            <button
              onClick={onSettingsClick}
              className="p-2 md:p-3 rounded-lg bg-gradient-to-r from-purple-500/20 to-pink-500/20 hover:from-purple-500/30 hover:to-pink-500/30 text-white transition-all duration-300 hover:scale-105"
              aria-label="Open settings"
              title="Settings"
            >
              <Settings className="w-5 h-5 md:w-6 md:h-6" />
            </button>

            <button
              onClick={onLogout}
              className="p-2 md:p-3 rounded-lg bg-white/5 hover:bg-red-500/20 text-white/70 hover:text-red-300 transition-all duration-300 hover:scale-105"
              aria-label="Logout"
              title="Logout"
            >
              <LogOut className="w-5 h-5 md:w-6 md:h-6" />
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
