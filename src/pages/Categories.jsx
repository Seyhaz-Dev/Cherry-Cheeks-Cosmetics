import { useState } from "react";

import SearchBar from "../components/SearchBar";
import ProductCard from "../components/ProductCard";
import categoryImage from "../assets/category1.png";
import productImage from "../assets/productcard1.png";
import moonwaterImage from "../assets/moonwater.png";
import nightCreamImage from "../assets/night-cream.png";
import tonerImage from "../assets/peony-toner.png";

// How many products show on one page (use 4 when you have more products)
const PAGE_SIZE = 8;

const products = [
  {
    id: 1,
    name: "Dewdrop Renewal Serum",
    category: "FACE SERUM",
    price: 68,
    rating: 4.9,
    reviews: 218,
    image: productImage,
  },
  {
    id: 2,
    name: "Moonwater Essence",
    category: "ESSENCE",
    price: 35,
    rating: 4.8,
    reviews: 156,
    image: moonwaterImage,
  },
  {
    id: 3,
    name: "Camellia Night Cream",
    category: "NIGHT CREAM",
    price: 54,
    rating: 4.7,
    reviews: 124,
    image: nightCreamImage,
  },
  {
    id: 4,
    name: "Peony Glow Toner",
    category: "FACE TONER",
    price: 29,
    rating: 4.9,
    reviews: 189,
    image: tonerImage,
  },


];

export default function Categories() {

  // The page the person is on (starts at page 1)
  const [page, setPage] = useState(1);

  // How many pages there are in total (Math.ceil rounds up: 4 products / 2 = 2 pages)
  const totalPages = Math.max(1, Math.ceil(products.length / PAGE_SIZE));

  // Page 1 starts at item 0, page 2 at item 2, page 3 at item 4 ...
  const startIndex = (page - 1) * PAGE_SIZE;

  // Only the products for THIS page
  const visibleProducts = products.slice(startIndex, startIndex + PAGE_SIZE);

  // For the text "Showing 1–2 of 4"
  const firstShown = products.length === 0 ? 0 : startIndex + 1;
  const lastShown = startIndex + visibleProducts.length;


  return (
    <main className="overflow-hidden bg-[#fbf8f5] font-['Outfit',sans-serif] text-[#292524]">
      <section className="mx-auto grid max-w-7xl items-center gap-9 px-5 pb-12 pt-10 sm:px-8 md:grid-cols-2 md:gap-14 md:pb-16 md:pt-16">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-[#89565a] sm:text-sm">
            Beauty & Skincare
          </p>
          <h1 className="mt-2 text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            Skincare <span className="text-[#e94f7d]">Routine</span>
          </h1>
          <p className="mt-2 max-w-lg text-sm leading-7 text-[#817874] sm:text-base">
            Find your favorite beauty products, from skincare to makeup, <br /> all in one place.
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

      <section
        id="products"
        className="mx-auto max-w-7xl scroll-mt-20 px-5 py-12 sm:px-8 md:py-16">

        <div className="mb-8 rounded-2xl border border-[#eee4df] bg-white p-3 sm:p-4">
          <SearchBar />
        </div>

        <div className="grid grid-cols-2 justify-items-center gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
          {visibleProducts.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>

        <section>

        <div className="mx-auto flex w-full max-w-[1200px] flex-col items-center justify-between gap-4 border-b border-gray-100 px-4 py-4 sm:flex-row sm:px-8">

          {/* The text is now real numbers */}
          <p className="text-xs text-[#8b8490] sm:text-sm">
            Showing {firstShown}–{lastShown} of {products.length}
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
            className="inline-flex w-fit items-center justify-center rounded-full bg-[var(--color-button)] px-6 py-3 text-sm font-medium text-white transition-colors "
          >
            Shop Now  →
          </a>
        </div>
      </section> 
    </main>


  );
}