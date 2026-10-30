import { useEffect, useState } from "react";

import SearchBar from "../components/SearchBar";
import ProductCard from "../components/ProductCard";
import { sortProducts } from "../data/products";
import { ArrowRight } from "lucide-react";

// How many products show on one page (use 4 when you have more products)
const PAGE_SIZE = 8;

// Convert category IDs into category names
const categoryNames = {
  1: 'Skincare',
  2: 'Makeup',
  3: 'Haircare',
  4: 'Fragrance',
  5: 'Body Care',
}

export default function Categories() {

  // The page the person is on (starts at page 1)
  const [page, setPage] = useState(1);
  const [products, setProducts] = useState([]);

  // Live search, category filter and sort
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState("Sort: Featured");

  // Load products from teacher's JSON and localStorage
  useEffect(() => {
    async function getProducts() {
      const response = await fetch('/student-data/products.json')
      const data = await response.json()

      const localProducts = localStorage.getItem('cherry-cheeks-products')
      const adminProducts = localProducts ? JSON.parse(localProducts) : []

      const adminProductIds = new Set(adminProducts.map(p => p.id))
      const mergedProducts = [...adminProducts, ...data.filter(p => !adminProductIds.has(p.id))]

      setProducts(mergedProducts)
    }

    getProducts()
  }, [])

  const categoryIds = {
    Skincare: 1,
    Makeup: 2,
    Haircare: 3,
    Fragrance: 4,
    'Body Care': 5,
  }

  // Products that match the search + filter, then sorted
  const matchingProducts = sortProducts(
    products.filter((product) => {
      const matchesCategory =
      !filter || 
        product.categoryId === categoryIds[filter]

      const matchesSearch = product.name
        .toLowerCase()
        .includes(query.toLowerCase())

      return matchesCategory && matchesSearch
    }),
    sort,
  );

  // How many pages there are in total
  const totalPages = Math.max(1, Math.ceil(matchingProducts.length / PAGE_SIZE));

  // Page 1 starts at item 0, page 2 at item 2, page 3 at item 4 ...
  const startIndex = (page - 1) * PAGE_SIZE;

  // Only the products for THIS page
  const visibleProducts = matchingProducts.slice(startIndex, startIndex + PAGE_SIZE);

  // For the text "Showing 1–2 of 4"
  const firstShown = matchingProducts.length === 0 ? 0 : startIndex + 1;
  const lastShown = startIndex + visibleProducts.length;

  const handleQueryChange = (value) => {
    setQuery(value);
    setPage(1);
  };

  const handleFilterChange = (value) => {
    setFilter(value);
    setPage(1);
  };

  const handleSortChange = (value) => {
    setSort(value);
    setPage(1);
  };


  return (
    <main className="overflow-hidden bg-[#fbf8f5] font-['Outfit',sans-serif] text-[#292524]">
    
      <section
        id="products"
        className="mx-auto max-w-7xl scroll-mt-20 px-5 py-12 sm:px-8 md:py-16">

        <div className="mb-8 rounded-2xl border border-[#eee4df] bg-white p-3 sm:p-4">
          <SearchBar
              initialQuery={query}
              initialCategory={filter}
              initialSort={sort}
              categoryPlaceholder="Categories"
              customDropdownIcons
            onQueryChange={handleQueryChange}
            onFilterChange={handleFilterChange}
            onSortChange={handleSortChange}
          />
        </div>

        {visibleProducts.length > 0 ? (
          <div className="grid grid-cols-2 justify-items-center gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
            {visibleProducts.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                category={categoryNames[product.categoryId] || 'Other'}
                price={product.price}
                image={product.image}
                stockQuantity={product.stockQuantity}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-[#eee4df] bg-white px-6 py-16 text-center">
            <p className="text-lg font-semibold">No products found</p>
            <p className="mt-2 text-sm text-[#817874]">Try a different keyword or category.</p>
          </div>
        )}

        <section>

        {matchingProducts.length > 0 && (
        <div className="mx-auto flex w-full max-w-[1200px] flex-col items-center justify-between gap-4 border-b border-gray-100 px-4 py-4 sm:flex-row sm:px-8">

          {/* The text is now real numbers */}
          <p className="text-xs text-[#8b8490] sm:text-sm">
            Showing {firstShown}–{lastShown} of {matchingProducts.length}
          </p>

          <div className="flex items-center gap-1.5">

            {/* Previous: go back one page. disabled on page 1. */}
            <button
              type="button"
              aria-label="Previous page"
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
              className="flex h-[30px] w-[30px] items-center justify-center rounded-md border border-[#e9e4eb] bg-white text-sm text-[#8b8490] transition hover:border-pink-400 disabled:cursor-not-allowed disabled:opacity-40"
            >
              ‹
            </button>

            {/* One button for each page: 1, 2, 3 ... */}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
              <button
                key={number}
                type="button"
                onClick={() => setPage(number)}
                aria-current={number === page ? "page" : undefined}
                className={`flex h-[30px] w-[30px] items-center justify-center rounded-md border text-sm transition ${
                  number === page
                    ? "border-[#df5685] bg-[#df5685] text-white"
                    : "border-[#e9e4eb] bg-white text-[#8b8490] hover:border-pink-400 hover:text-pink-500"
                }`}
              >
                {number}
              </button>
            ))}

            {/* Next: go forward one page. disabled on the last page. */}
            <button
              type="button"
              aria-label="Next page"
              onClick={() => setPage(page + 1)}
              disabled={page === totalPages}
              className="flex h-[30px] w-[30px] items-center justify-center rounded-md border border-[#e9e4eb] bg-white text-sm text-[#8b8490] transition hover:border-pink-400 disabled:cursor-not-allowed disabled:opacity-40"
            >
              ›
            </button>

          </div>
        </div>
        )}

      </section>
      
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-14 sm:px-8 md:pb-20">
        <div className="grid items-center gap-6 overflow-hidden rounded-2xl bg-[#f6e9e4] p-7 sm:p-10 md:grid-cols-[1fr_auto] md:px-14 md:py-12">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#89565a]">
              Make room for care
            </p>
            <h2 className="mt-3 text-2xl font-semibold sm:text-3xl">
              A softer start, every day.
            </h2>
            <p className="mt-2 max-w-lg text-sm leading-6 text-[#817874]">
              Build a routine around the products your skin loves.
            </p>
          </div>
          <a
            href="#products"
            className="inline-flex w-fit items-center justify-center gap-2 rounded-full bg-[var(--color-button)] px-6 py-3 text-sm font-medium text-white transition-colors"
          >
            <span className="text-white">Shop Now</span>
            <ArrowRight size={16} aria-hidden="true" />
          </a>
        </div>
      </section> 
    </main>


  );
}