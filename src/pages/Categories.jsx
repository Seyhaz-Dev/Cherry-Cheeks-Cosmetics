import { useState, useEffect } from "react";

import SearchBar from "../components/SearchBar";
import ProductCard from "../components/ProductCard";
import { filterProducts, products, sortProducts } from "../data/products";
import categoryImage from "../assets/category1.png";

const PAGE_SIZE = 8;

export default function Categories() {
  
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function getCategories() {
      try {
      
        const response = await fetch("public/student-data/categories.json");
        
        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }
        
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error loading categories:", error);
      }
    }

    getCategories();
  }, []);

 
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All Product");
  const [sort, setSort] = useState("Sort: Featured");

  const matchingProducts = sortProducts(
    filterProducts(products, { query, category: filter }),
    sort
  );

  const totalPages = Math.max(1, Math.ceil(matchingProducts.length / PAGE_SIZE));


  const startIndex = (page - 1) * PAGE_SIZE;

  const visibleProducts = matchingProducts.slice(
    startIndex,
    startIndex + PAGE_SIZE
  );

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
      {/* HERO SECTION */}
      <section className="mx-auto grid max-w-7xl items-center gap-9 px-5 pb-12 pt-10 sm:px-8 md:grid-cols-2 md:gap-14 md:pb-16 md:pt-16">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-[#89565a] sm:text-sm">
            Beauty & Skincare
          </p>
          <h1 className="mt-2 text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            Skincare <span className="text-[#e94f7d]">Routine</span>
          </h1>
          <p className="mt-2 max-w-lg text-sm leading-7 text-[#817874] sm:text-base">
            Find your favorite beauty products, from skincare to makeup,{" "}
            <br /> all in one place.
          </p>
          <a
            href="#products"
            className="mt-2 inline-flex items-center justify-center rounded-full bg-[#e94f7d] px-7 py-3 text-sm font-medium text-white transition-colors duration-300 hover:bg-[#d93d6c]"
          >
            Explore the collection
          </a>
        </div>
        <img
          src={categoryImage}
          alt="Cherry Cheeks skincare collection"
          className="aspect-[5/4] w-full rounded-[28px] object-cover sm:rounded-[36px]"
        />
      </section>

      {/* PRODUCTS & FILTER SECTION */}
      <section
        id="products"
        className="mx-auto max-w-7xl scroll-mt-20 px-5 py-12 sm:px-8 md:py-16"
      >
        <div className="mb-8 rounded-2xl border border-[#eee4df] bg-white p-3 sm:p-4">
          {/* Kept exactly as your original code */}
          <SearchBar
            onQueryChange={handleQueryChange}
            onFilterChange={handleFilterChange}
            onSortChange={handleSortChange}
          />
        </div>

        {/* PRODUCT GRID */}
        {visibleProducts.length > 0 ? (
          <div className="grid grid-cols-2 justify-items-center gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
            {visibleProducts.map((product) => (
              <ProductCard key={product.id} {...product} category={product.type} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-[#eee4df] bg-white px-6 py-16 text-center">
            <p className="text-lg font-semibold">No products found</p>
            <p className="mt-2 text-sm text-[#817874]">
              Try a different keyword or category.
            </p>
          </div>
        )}

        {/* PAGINATION */}
        {matchingProducts.length > 0 && (
          <div className="mx-auto mt-8 flex w-full max-w-[1200px] flex-col items-center justify-between gap-4 border-b border-gray-100 px-4 py-4 sm:flex-row sm:px-8">
            <p className="text-xs text-[#8b8490] sm:text-sm">
              Showing {firstShown}–{lastShown} of {matchingProducts.length}
            </p>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                aria-label="Previous page"
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
                className="flex h-[30px] w-[30px] items-center justify-center rounded-md border border-[#e9e4eb] bg-white text-sm text-[#8b8490] transition hover:border-pink-400 disabled:cursor-not-allowed disabled:opacity-40"
              >
                ‹
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (number) => (
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
                )
              )}

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

      {/* BOTTOM BANNER */}
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
            className="inline-flex w-fit items-center justify-center rounded-full bg-[#e94f7d] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[#d93d6c]"
          >
            Shop Now →
          </a>
        </div>
      </section>
    </main>
  );
}