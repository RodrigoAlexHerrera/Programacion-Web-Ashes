export type Theme = "dark" | "blue" | "green" | "red"

export const THEME_CONFIG: Record<
  Theme,
  {
    name: string
    gradientFrom: string
    gradientTo: string
    accentColor: string
    accentLight: string
    primaryColor: string
    secondaryColor: string
  }
> = {
  dark: {
    name: "Oscuro (Morado)",
    gradientFrom: "from-slate-950",
    gradientTo: "to-purple-950",
    accentColor: "purple-500",
    accentLight: "purple-400",
    primaryColor: "purple-600",
    secondaryColor: "pink-500",
  },
  blue: {
    name: "Azul",
    gradientFrom: "from-slate-900",
    gradientTo: "to-blue-950",
    accentColor: "blue-500",
    accentLight: "blue-400",
    primaryColor: "blue-600",
    secondaryColor: "cyan-500",
  },
  green: {
    name: "Verde",
    gradientFrom: "from-slate-900",
    gradientTo: "to-green-950",
    accentColor: "green-500",
    accentLight: "green-400",
    primaryColor: "green-600",
    secondaryColor: "emerald-500",
  },
  red: {
    name: "Rojo",
    gradientFrom: "from-slate-900",
    gradientTo: "to-red-950",
    accentColor: "red-500",
    accentLight: "red-400",
    primaryColor: "red-600",
    secondaryColor: "orange-500",
  },
}

export function getThemeClasses(theme: Theme): string {
  const config = THEME_CONFIG[theme]
  return `${config.gradientFrom} ${config.gradientTo}`
}

export function getThemeAccentColor(theme: Theme): string {
  return THEME_CONFIG[theme].accentColor
}

export function getThemeAccentLightColor(theme: Theme): string {
  return THEME_CONFIG[theme].accentLight
}
