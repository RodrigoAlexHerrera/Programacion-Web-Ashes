import { CATEGORIES } from "./categories"

export function getFiltersByCategory(categoryId: string): string[] {
  const category = CATEGORIES.find((c) => c.id === categoryId)
  return category?.filters || []
}
