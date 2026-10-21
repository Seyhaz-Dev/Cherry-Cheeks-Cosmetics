import { useState } from 'react'

import SearchBar from '../components/SearchBar'
import ProductCard from '../components/ProductCard'

import shopBanner from '../assets/herobanner.png'
import productImage from '../assets/productcard1.png'
import moonwaterImage from '../assets/moonwater.png'
import nightCreamImage from '../assets/night-cream.png'
import tonerImage from '../assets/peony-toner.png'
import moistureImage from '../assets/moisture-essence.png'
import serumImage from '../assets/glow-serum.png'
import creamImage from '../assets/cream-balm.png'
import cleanserImage from '../assets/cleanser.png'

const products = [
  {
    name: 'Dewdrop Renewal Serum',
    category: 'FACE SERUM',
    description: 'Hydrate, nourish & reveal your natural glow.',
    price: 68,
    rating: 4.9,
    reviews: 218,
    image: productImage,
  },
  {
    name: 'Moonwater Essence',
    category: 'ESSENCE',
    description: 'Refresh and hydrate for a soft, dewy look.',
    price: 35,
    rating: 4.8,
    reviews: 156,
    image: moonwaterImage,
  },
  {
    name: 'Camellia Night Cream',
    category: 'NIGHT CREAM',
    description: 'A comforting cream for your evening ritual.',
    price: 54,
    rating: 4.7,
    reviews: 124,
    image: nightCreamImage,
  },
  {
    name: 'Peony Glow Toner',
    category: 'FACE TONER',
    description: 'A refreshing step for smooth-looking skin.',
    price: 29,
    rating: 4.9,
    reviews: 189,
    image: tonerImage,
  },
  {
    name: 'Moisture Essence',
    category: 'ESSENCE',
    description: 'A lightweight essence for lasting hydration.',
    price: 42,
    rating: 4.6,
    reviews: 98,
    image: moistureImage,
  },
  {
    name: 'Glow Serum',
    category: 'FACE SERUM',
    description: 'Brighten and revitalize your skin.',
    price: 75,
    rating: 4.8,
    reviews: 134,
    image: serumImage,
  },
  {
    name: 'Cream Balm',
    category: 'BALM',
    description: 'A soothing balm for dry areas.',
    price: 38,
    rating: 4.5,
    reviews: 76,
    image: creamImage,
  },
  {
    name: 'Gentle Cleanser',
    category: 'CLEANSER',
    description: 'A gentle cleanser for all skin types.',
    price: 32,
    rating: 4.7,
    reviews: 112,
    image: cleanserImage,
  },
]

const itemsPerPage = 8

function Shop() {
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = Math.ceil(products.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const visibleProducts = products.slice(startIndex, startIndex + itemsPerPage)

  return (
    <section className="px-4 py-6 text-[var(--color-text)] sm:px-6 sm:py-8 lg:px-8 lg:py-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6">
          <SearchBar />
        </div>

        <div className="mb-12">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {visibleProducts.map((product, index) => (
              <ProductCard key={index} id={startIndex + index + 1} image={product.image} category={product.category} name={product.name} price={product.price} rating={product.rating} reviews={product.reviews}/>
            ))}
          </div>
        </div>

        <div className="mb-12 flex items-center justify-center gap-3">
          <button type="button" className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#e2d8dd] bg-white text-lg text-[#4a001f] transition hover:border-[#d3b5c4]" aria-label="Previous page" >
            {'<'}
          </button>

          <button type="button" className="flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--color-pink-text)] bg-[var(--color-pink-text)] text-sm font-semibold text-[var(--color-white-text)]" >
            1
          </button>

          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#e2d8dd] bg-white text-sm font-semibold text-[#4a001f] transition hover:border-[#d3b5c4]"
          >
            2
          </button>

          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#e2d8dd] bg-white text-lg text-[#4a001f] transition hover:border-[#d3b5c4]"
            aria-label="Next page"
          >
            {'>'}
          </button>
        </div>

        <div className="relative mx-auto my-12 overflow-hidden rounded-3xl">
          <img src={shopBanner} alt="Makeup products arranged on a pale pink background" className="h-38 w-full object-cover sm:h-64 md:h-70 lg:h-76" />

          <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center sm:items-start sm:text-left sm:p-6 md:p-8 lg:p-12">
            <p className="text-xs font-semibold text-[var(--color-text)] sm:text-sm md:text-base lg:text-lg">
              The collection
            </p>
            <h2 className="mt-1 text-xl font-bold text-[var(--color-text)] sm:text-2xl md:text-3xl lg:text-4xl">
              Care, in every layer.
            </h2>
            <p className="mt-1 max-w-2xl text-xs text-[var(--color-text)] sm:text-sm md:text-base lg:text-lg">
              Build your ritual with barrier-minded formulas created for lasting calm and luminosity.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Shop