import type { Product } from '../types/marketplace'

const noCostPlans = (price: number) => [3, 6, 9, 12, 18].map((months) => ({
  id: `${months}-months`, months, monthlyAmount: Math.ceil(price / months), totalAmount: price,
  badge: months === 12 ? 'Popular' : undefined,
}))

export const products: Product[] = [
  {
    id: 'iphone-17', brand: 'Apple', name: 'iPhone 17', price: 79900, category: 'Smartphones',
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=900&q=85',
    description: 'A beautifully capable iPhone with an advanced camera system and all-day battery life.',
    highlights: ['6.3-inch Super Retina display', 'Advanced dual-camera system', '128 GB storage'],
    variants: [{ id: '128', name: '128 GB', price: 79900 }, { id: '256', name: '256 GB', price: 89900 }], emiPlans: noCostPlans(79900),
  },
  {
    id: 'macbook-air', brand: 'Apple', name: 'MacBook Air M4', price: 99900, category: 'Laptops',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=900&q=85',
    description: 'Remarkably thin and light, built for work, creation, and everything in between.',
    highlights: ['Apple M4 chip', '13.6-inch Liquid Retina display', '16 GB unified memory'],
    variants: [{ id: '16-256', name: '16 GB / 256 GB', price: 99900 }, { id: '16-512', name: '16 GB / 512 GB', price: 119900 }], emiPlans: noCostPlans(99900),
  },
  {
    id: 'galaxy-s25', brand: 'Samsung', name: 'Galaxy S25', price: 74999, category: 'Smartphones',
    image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=900&q=85',
    description: 'Galaxy AI and a pro-grade camera in a compact everyday flagship.',
    highlights: ['50 MP triple camera', 'Galaxy AI', '256 GB storage'],
    variants: [{ id: '256', name: '256 GB', price: 74999 }, { id: '512', name: '512 GB', price: 84999 }], emiPlans: noCostPlans(74999),
  },
  {
    id: 'sony-xm6', brand: 'Sony', name: 'WH-1000XM6', price: 39990, category: 'Audio',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=85',
    description: 'Industry-leading noise cancellation, made for immersive listening anywhere.',
    highlights: ['Adaptive noise cancellation', 'Up to 30 hours battery', 'Multipoint connection'],
    variants: [{ id: 'black', name: 'Midnight Black', price: 39990 }, { id: 'silver', name: 'Platinum Silver', price: 39990 }], emiPlans: noCostPlans(39990),
  },
]

export const brands = [
  ['Air India', 'No-cost EMIs upto 18 months', '#e91037'], ['Apple Premium Reseller', 'No-cost EMIs upto 24 months', '#080808'],
  ['Croma', 'No-cost EMIs upto 6 months', '#21b2aa'], ['EaseMyTrip Holiday', 'No-cost EMIs upto 24 months', '#075da7'],
  ['Giva', 'No-cost EMIs upto 36 months', '#f4d7df'],
]

export const stores = [
  ['Pacholi Suzuki Railway Road', '64/9, New Railway Rd, near DSD college, Subhash Nagar, Sector 8, Gurugram', '294 KM', 'Suzuki'],
  ['Pacholi Suzuki Hayatpur', 'RAKBA 12, KANAL 11, MARLA 0, Hayatpur, SARSAI, Gurugram', '296 KM', 'Suzuki'],
  ['Malwa Honda Khandsa Road', '60, Khandsa Rd, Pace City I, Sector 10A, Gurugram', '296 KM', 'Honda'],
  ['Pacholi Suzuki Rajiv Chowk', '6/38, Rajiv Chowk, Sector 33, Rajiv Chowk, Gurugram', '296 KM', 'Suzuki'],
]
