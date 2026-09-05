export type EmiPlan = { id: string; months: number; monthlyAmount: number; totalAmount: number; badge?: string }

export type Product = {
  id: string
  name: string
  brand: string
  price: number
  image: string
  category: string
  description: string
  highlights: string[]
  variants: { id: string; name: string; price: number }[]
  emiPlans: EmiPlan[]
}

export type ShopTab = 'brands' | 'stores' | 'marketplace'
