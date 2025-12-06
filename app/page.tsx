"use client"

import { useState, useEffect } from "react"
import Header from "@/components/Header"
import SearchBar from "@/components/SearchBar"
import Categories from "@/components/Categories"
import Filters from "@/components/Filters"
import Results from "@/components/Results"
import SettingsPanel from "@/components/SettingsPanel"
import ManagementModal from "@/components/ManagementModal"
import StatsPanel from "@/components/StatsPanel"
import LoginForm from "@/components/LoginForm"
import PermissionsBadge from "@/components/PermissionsBadge"
import ProfileModal from "@/components/ProfileModal"
import { useLocalStorage } from "@/hooks/useLocalStorage"
import { loadUser, logout } from "@/utils/auth"
import { SAMPLE_RESULTS } from "@/data/sampleResults"
import { getThemeClasses } from "@/utils/themes"
import type { Theme, Result, SearchHistory, User } from "@/types"

export default function Home() {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const [theme, setTheme] = useLocalStorage<Theme>("ashes-theme", "dark")
  const [viewMode, setViewMode] = useLocalStorage<"grid" | "list">("ashes-viewMode", "grid")
  const [searchTerm, setSearchTerm] = useLocalStorage<string>("ashes-searchTerm", "")
  const [selectedCategory, setSelectedCategory] = useLocalStorage<string>("ashes-category", "")
  const [selectedFilters, setSelectedFilters] = useLocalStorage<string[]>("ashes-filters", [])
  const [results, setResults] = useLocalStorage<Result[]>("ashes-results", [])
  const [searchHistory, setSearchHistory] = useLocalStorage<SearchHistory[]>("ashes-history", [])
  const [showSettings, setShowSettings] = useState(false)
  const [showManagement, setShowManagement] = useState(false)
  const [showStats, setShowStats] = useState(false)
  const [showProfile, setShowProfile] = useState(false)

  useEffect(() => {
    const storedUser = loadUser()
    setUser(storedUser)
    setIsLoading(false)
  }, [])

  useEffect(() => {
    if (results.length === 0) {
      setResults(SAMPLE_RESULTS)
    }
  }, [])

  const handleSearch = (term: string) => {
    setSearchTerm(term)
    if (term.trim()) {
      const newSearch: SearchHistory = {
        id: Date.now().toString(),
        term,
        category: selectedCategory,
        filters: selectedFilters,
        timestamp: new Date().toISOString(),
        resultsCount: 0,
      }
      setSearchHistory((prev) => [newSearch, ...prev].slice(0, 10))
    }
  }

  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme)
  }

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(selectedCategory === category ? "" : category)
    setSelectedFilters([])
  }

  const handleFilterToggle = (filter: string) => {
    setSelectedFilters((prev) => (prev.includes(filter) ? prev.filter((f) => f !== filter) : [...prev, filter]))
  }

  const handleClearFilters = () => {
    setSearchTerm("")
    setSelectedCategory("")
    setSelectedFilters([])
  }

  const handleLogout = () => {
    logout()
    setUser(null)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-slate-900 to-slate-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-purple-500"></div>
      </div>
    )
  }

  if (!user) {
    return <LoginForm onLoginSuccess={setUser} />
  }

  const themeClasses = getThemeClasses(theme)
  const isAuthenticated = !user.isGuest

  return (
    <div className={`min-h-screen bg-gradient-to-br ${themeClasses} transition-all duration-500`}>
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full blur-3xl opacity-30" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-tl from-purple-500/10 to-pink-500/10 rounded-full blur-3xl opacity-30" />
      </div>

      <Header
        user={user}
        theme={theme}
        onSettingsClick={() => setShowSettings(true)}
        onStatsClick={() => {
          if (user.role === "admin") {
            setShowStats(true)
          }
        }}
        onManagementClick={() => {
          if (user.role === "admin") {
            setShowManagement(true)
          }
        }}
        onProfileClick={() => setShowProfile(true)}
        onLogout={handleLogout}
      />

      <main className="relative z-10 container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          <PermissionsBadge user={user} />

          <SearchBar value={searchTerm} onChange={handleSearch} resultsCount={results.length} />

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mt-8">
            <div className="lg:col-span-1 space-y-4">
              <Categories selectedCategory={selectedCategory} onCategorySelect={handleCategorySelect} />
            </div>

            <div className="lg:col-span-3 space-y-4">
              {selectedCategory && (
                <Filters
                  category={selectedCategory}
                  selectedFilters={selectedFilters}
                  onFilterToggle={handleFilterToggle}
                />
              )}

              <Results
                results={results}
                searchTerm={searchTerm}
                selectedCategory={selectedCategory}
                selectedFilters={selectedFilters}
                viewMode={viewMode}
                onViewModeChange={setViewMode}
                onClearFilters={handleClearFilters}
                isAuthenticated={isAuthenticated}
              />
            </div>
          </div>
        </div>
      </main>

      {showSettings && (
        <SettingsPanel
          currentTheme={theme}
          onThemeChange={handleThemeChange}
          onClose={() => setShowSettings(false)}
          searchHistory={searchHistory}
          onHistorySelect={(search) => {
            setSearchTerm(search.term)
            setSelectedCategory(search.category)
            setSelectedFilters(search.filters)
          }}
          onClearHistory={() => setSearchHistory([])}
          onExport={() => {
            const data = { results, searchHistory, preferences: { theme, viewMode } }
            const json = JSON.stringify(data, null, 2)
            const blob = new Blob([json], { type: "application/json" })
            const url = URL.createObjectURL(blob)
            const a = document.createElement("a")
            a.href = url
            a.download = "ashes-data.json"
            a.click()
          }}
          onImport={(file) => {
            const reader = new FileReader()
            reader.onload = (e) => {
              const data = JSON.parse(e.target?.result as string)
              setResults(data.results || [])
              setSearchHistory(data.searchHistory || [])
            }
            reader.readAsText(file)
          }}
          onReset={() => setResults(SAMPLE_RESULTS)}
          onLogout={handleLogout}
        />
      )}

      {showProfile && !user.isGuest && (
        <ProfileModal
          user={user}
          results={results}
          searchHistory={searchHistory}
          onClose={() => setShowProfile(false)}
          onRecommendationSelect={(result) => {
            setSearchTerm(result.title)
            setSelectedCategory(result.category)
            setSelectedFilters(result.filters)
          }}
        />
      )}

      {user.role === "admin" && showManagement && (
        <ManagementModal results={results} onSave={setResults} onClose={() => setShowManagement(false)} />
      )}

      {user.role === "admin" && showStats && (
        <StatsPanel results={results} searchHistory={searchHistory} onClose={() => setShowStats(false)} />
      )}
    </div>
  )
}
