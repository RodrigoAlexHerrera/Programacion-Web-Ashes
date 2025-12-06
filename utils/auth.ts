import type { User } from "@/types"

const ADMIN_EMAIL = "admin@ashes.com"
const ADMIN_PASSWORD = "admin123"

export const validateCredentials = (email: string, password: string): boolean => {
  return email === ADMIN_EMAIL && password === ADMIN_PASSWORD
}

export const createUser = (email: string, role: "admin" | "user" | "guest"): User => {
  return {
    id: Math.random().toString(36).substring(7),
    email,
    role: role === "guest" ? "user" : role,
    isGuest: role === "guest",
    createdAt: new Date().toISOString(),
  }
}

export const saveUser = (user: User): void => {
  if (typeof window !== "undefined") {
    localStorage.setItem("ashes-user", JSON.stringify(user))
  }
}

export const loadUser = (): User | null => {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("ashes-user")
    return stored ? JSON.parse(stored) : null
  }
  return null
}

export const logout = (): void => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("ashes-user")
  }
}
