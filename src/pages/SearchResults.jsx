import { useSearchParams } from 'react-router-dom'

import SearchBar from '../components/SearchBar'
import ProductCard from '../components/ProductCard'
import { filterProducts, products, sortProducts } from '../data/products'

function SearchResults() {
  const [searchParams] = useSearchParams()

  const query = (searchParams.get('q') ?? '').trim()
  const category = searchParams.get('category') ?? 'All Product'
  const sort = searchParams.get('sort') ?? 'Sort: Featured'

  const results = sortProducts(filterProducts(products, { query, category }), sort)

  return (
    <section className="bg-[#fbf8f5] px-4 py-6 text-[var(--color-text)] sm:px-6 sm:py-8 lg:px-8 lg:py-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 rounded-2xl border border-[#eee4df] bg-white p-3 sm:p-4">
          <SearchBar />
        </div>

        <div className="mb-6">
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            {query ? `Results for "${query}"` : 'All products'}
          </h1>
          <p className="mt-2 text-sm text-[#817874]">
            {results.length} {results.length === 1 ? 'product' : 'products'} found
          </p>
        </div>

        {results.length > 0 ? (
          <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
            {results.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                image={product.image}
                category={product.type}
                name={product.name}
                price={product.price}
                rating={product.rating}
                reviews={product.reviews}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-[#eee4df] bg-white px-6 py-16 text-center">
            <p className="text-lg font-semibold">No products found</p>
            <p className="mt-2 text-sm text-[#817874]">
              Try a different keyword or choose another category.
            </p>
          </div>
        )}
      </div>
    </section>
  )
}

export default SearchResults
