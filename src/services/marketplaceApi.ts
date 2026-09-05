import { products } from '../data/marketplaceMockData'
import type { Product } from '../types/marketplace'

const delay = (ms = 500) => new Promise((resolve) => window.setTimeout(resolve, ms))

export const marketplaceApi = {
  async getProducts(): Promise<Product[]> {
    await delay()
    if (import.meta.env.VITE_FORCE_API_ERROR === 'true') throw new Error('We could not load products. Please try again.')
    return products
  },
  async getProduct(id: string): Promise<Product> {
    await delay(350)
    const product = products.find((item) => item.id === id)
    if (!product) throw new Error('This product is no longer available.')
    return product
  },
}
