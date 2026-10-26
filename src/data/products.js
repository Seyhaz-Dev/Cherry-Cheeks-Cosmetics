import dewdropImage from '../assets/productcard1.png'
import moonwaterImage from '../assets/moonwater.png'
import nightCreamImage from '../assets/night-cream.png'
import tonerImage from '../assets/peony-toner.png'
import moistureImage from '../assets/moisture-essence.png'
import serumImage from '../assets/glow-serum.png'
import creamImage from '../assets/cream-balm.png'
import cleanserImage from '../assets/cleanser.png'

export const products = [
  {
    id: 1,
    name: 'Dewdrop Renewal Serum',
    type: 'FACE SERUM',
    category: 'Skincare',
    description: 'Hydrate, nourish & reveal your natural glow.',
    price: 68,
    rating: 4.9,
    reviews: 218,
    image: dewdropImage,
  },
  {
    id: 2,
    name: 'Moonwater Essence',
    type: 'ESSENCE',
    category: 'Skincare',
    description: 'Refresh and hydrate for a soft, dewy look.',
    price: 35,
    rating: 4.8,
    reviews: 156,
    image: moonwaterImage,
  },
  {
    id: 3,
    name: 'Camellia Night Cream',
    type: 'NIGHT CREAM',
    category: 'Makeup',
    description: 'A comforting cream for your evening ritual.',
    price: 54,
    rating: 4.7,
    reviews: 124,
    image: nightCreamImage,
  },
  {
    id: 4,
    name: 'Peony Glow Toner',
    type: 'FACE TONER',
    category: 'Skincare',
    description: 'A refreshing step for smooth-looking skin.',
    price: 29,
    rating: 4.9,
    reviews: 189,
    image: tonerImage,
  },
  {
    id: 5,
    name: 'Moisture Essence',
    type: 'ESSENCE',
    category: 'Skincare',
    description: 'A lightweight essence for lasting hydration.',
    price: 42,
    rating: 4.6,
    reviews: 98,
    image: moistureImage,
  },
  {
    id: 6,
    name: 'Glow Serum',
    type: 'FACE SERUM',
    category: 'Skincare',
    description: 'Brighten and revitalize your skin.',
    price: 75,
    rating: 4.8,
    reviews: 134,
    image: serumImage,
  },
  {
    id: 7,
    name: 'Cream Balm',
    type: 'BALM',
    category: 'Skincare',
    description: 'A soothing balm for dry areas.',
    price: 38,
    rating: 4.5,
    reviews: 76,
    image: creamImage,
  },
  {
    id: 8,
    name: 'Gentle Cleanser',
    type: 'CLEANSER',
    category: 'Skincare',
    description: 'A gentle cleanser for all skin types.',
    price: 32,
    rating: 4.7,
    reviews: 112,
    image: cleanserImage,
  },
]

export function filterProducts(items, { query = '', category = 'All Product' } = {}) {
  const normalizedQuery = query.trim().toLowerCase()

  return items.filter((product) => {
    const searchableText = [product.name, product.type, product.category, product.description]
      .join(' ')
      .toLowerCase()

    const matchesQuery = !normalizedQuery || searchableText.includes(normalizedQuery)
    const matchesCategory = category === 'All Product' || product.category === category

    return matchesQuery && matchesCategory
  })
}

export function sortProducts(items, sort) {
  switch (sort) {
    case 'Price: Low to High':
      return [...items].sort((a, b) => a.price - b.price)
    case 'Price: High to Low':
      return [...items].sort((a, b) => b.price - a.price)
    case 'Rating':
      return [...items].sort((a, b) => b.rating - a.rating)
    case 'Newest':
      return [...items].sort((a, b) => b.id - a.id)
    default:
      return items
  }
}

export default products
