export type Theme = "dark" | "blue" | "green" | "red"

export interface Result {
  id: string
  title: string
  description: string
  category: string
  filters: string[]
  tags: string[]
  url?: string
  thumbnail?: string
  createdAt: string
  requiresAuth?: boolean
}

export interface SearchHistory {
  id: string
  term: string
  category: string
  filters: string[]
  timestamp: string
  resultsCount: number
}

export interface UserPreferences {
  theme: Theme
  viewMode: "grid" | "list"
  lastCategory: string
}

export type UserRole = "admin" | "user"

export interface User {
  id: string
  email: string
  role: UserRole
  isGuest?: boolean
  createdAt: string
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
}
