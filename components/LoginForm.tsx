"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { validateCredentials, createUser, saveUser } from "@/utils/auth"
import type { User } from "@/types"
import { AlertCircle, LogIn, Eye } from "lucide-react"

interface LoginFormProps {
  onLoginSuccess: (user: User) => void
}

export default function LoginForm({ onLoginSuccess }: LoginFormProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    setTimeout(() => {
      if (!email || !password) {
        setError("Por favor completa todos los campos")
        setIsLoading(false)
        return
      }

      if (validateCredentials(email, password)) {
        const adminUser = createUser(email, "admin")
        saveUser(adminUser)
        onLoginSuccess(adminUser)
      } else {
        if (!email.includes("@")) {
          setError("Ingresa un email válido")
          setIsLoading(false)
          return
        }
        const regularUser = createUser(email, "user")
        saveUser(regularUser)
        onLoginSuccess(regularUser)
      }
      setIsLoading(false)
    }, 500)
  }

  const handleGuestAccess = () => {
    const guestUser = createUser("guest@ashes.local", "guest")
    onLoginSuccess(guestUser)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-slate-900 to-slate-900 flex items-center justify-center px-4">
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full blur-3xl opacity-30" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-tl from-purple-500/10 to-pink-500/10 rounded-full blur-3xl opacity-30" />
      </div>

      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
            Ashes
          </h1>
          <p className="text-white/60">Acceso al buscador avanzado</p>
        </div>

        <div className="backdrop-blur-md bg-white/5 rounded-2xl border border-white/10 p-8 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">Email</label>
              <Input
                type="email"
                placeholder="tu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white/5 border-white/10 text-white placeholder:text-white/40"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">Contraseña</label>
              <Input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-white/5 border-white/10 text-white placeholder:text-white/40"
              />
            </div>

            {error && (
              <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                <AlertCircle className="w-4 h-4 text-red-400" />
                <p className="text-sm text-red-300">{error}</p>
              </div>
            )}

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-2.5 flex items-center justify-center gap-2"
            >
              <LogIn className="w-4 h-4" />
              {isLoading ? "Conectando..." : "Acceder"}
            </Button>
          </form>

          <div className="mt-4 pt-4 border-t border-white/10">
            <Button
              type="button"
              onClick={handleGuestAccess}
              className="w-full bg-white/10 hover:bg-white/20 text-white font-semibold py-2.5 flex items-center justify-center gap-2"
            >
              <Eye className="w-4 h-4" />
              Acceso como Invitado
            </Button>
          </div>

          <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
            <p className="text-xs text-blue-300/80 font-semibold mb-2">Credenciales de Administrador:</p>
            <p className="text-xs text-blue-200/60">Email: admin@ashes.com</p>
            <p className="text-xs text-blue-200/60">Contraseña: admin123</p>
            <p className="text-xs text-blue-200/60 mt-3">O ingresa tu email como usuario regular</p>
          </div>
        </div>
      </div>
    </div>
  )
}
