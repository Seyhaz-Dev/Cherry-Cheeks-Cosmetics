import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

import SearchBar from '../components/SearchBar'
import ProductCard from '../components/ProductCard'
import { filterProducts, products, sortProducts } from '../data/products'

import shopBanner from '../assets/herobanner.png'

const itemsPerPage = 8

function Shop() {
  const [currentPage, setCurrentPage] = useState(1)
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState('All Product')
  const [sort, setSort] = useState('Sort: Featured')

  const matchingProducts = sortProducts(
    filterProducts(products, { query, category: filter }),
    sort,
  )

  const totalPages = Math.max(1, Math.ceil(matchingProducts.length / itemsPerPage))
  const startIndex = (currentPage - 1) * itemsPerPage
  const visibleProducts = matchingProducts.slice(startIndex, startIndex + itemsPerPage)

  const handleQueryChange = (value) => {
    setQuery(value)
    setCurrentPage(1)
  }

  const handleFilterChange = (value) => {
    setFilter(value)
    setCurrentPage(1)
  }

  const handleSortChange = (value) => {
    setSort(value)
    setCurrentPage(1)
  }

  return (
    <section className="px-4 py-10 text-[var(--color-text)]  bg-[#fbf8f5] sm:px-6 sm:py-8 lg:px-8 lg:py-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6">
          <SearchBar
            onQueryChange={handleQueryChange}
            onFilterChange={handleFilterChange}
            onSortChange={handleSortChange}
          />
        </div>

        <div className="mb-12">
          {visibleProducts.length > 0 ? (
            <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
              {visibleProducts.map((product) => (
                <ProductCard key={product.id} id={product.id} image={product.image} category={product.type} name={product.name} price={product.price} rating={product.rating} reviews={product.reviews}/>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-[#eee4df] bg-white px-6 py-16 text-center">
              <p className="text-lg font-semibold">No products found</p>
              <p className="mt-2 text-sm text-[#817874]">Try a different keyword or category.</p>
            </div>
          )}
        </div>

        {matchingProducts.length > 0 && (
        <nav className="mb-12 flex items-center justify-center gap-3" aria-label="Product pages">
          <button
            type="button"
            onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
            disabled={currentPage === 1}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#e2d8dd] bg-white text-[#4a001f] transition hover:border-[#d3b5c4] disabled:cursor-not-allowed disabled:opacity-40"
            aria-label="Previous page"
          >
            <ChevronLeft size={18} aria-hidden="true" />
          </button>

          {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
            <button
              key={page}
              type="button"
              onClick={() => setCurrentPage(page)}
              aria-current={currentPage === page ? 'page' : undefined}
              className={`flex h-10 w-10 items-center justify-center rounded-xl border text-sm font-semibold transition ${currentPage === page ? 'border-[var(--color-pink-text)] bg-[var(--color-pink-text)] text-[var(--color-white-text)]' : 'border-[#e2d8dd] bg-white text-[#4a001f] hover:border-[#d3b5c4]'}`}
            >
              {page}
            </button>
          ))}

          <button
            type="button"
            onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
            disabled={currentPage === totalPages}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#e2d8dd] bg-white text-[#4a001f] transition hover:border-[#d3b5c4] disabled:cursor-not-allowed disabled:opacity-40"
            aria-label="Next page"
          >
            <ChevronRight size={18} aria-hidden="true" />
          </button>
        </nav>
        )}

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