import  SearchBar  from "../components/SearchBar";
import ProductCard from "../components/ProductCard";
export default function CategoryBanner() {
  return (
    <section className="mx-auto w-full overflow-hidden border-y-1 border-[#e8dedd] bg-[#faf8f4]">
      <div className="relative flex min-h-[285px] items-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-y-0 right-0 w-[55%]">
          <img
            src="src/assets/category1.png"
            alt="Beauty and skincare products"
            className="h-full w-full object-cover object-center"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-[#faf8f4] via-[#faf8f4]/40 to-transparent" />
        </div>

          <div className="relative z-10 px-8 py-10 sm:px-12 md:px-16">
          <p className="mb-2 text-sm font-medium text-black sm:text-base">
            Beauty && Skincare
          </p>

          <h1 className="mb-2 text-4xl font-bold tracking-tight text-black sm:text-5xl">
            Category
          </h1>

          <p className="max-w-[300px] text-xs leading-relaxed text-black sm:text-sm">
            Find your favorite beauty products, from
            <br className="hidden sm:block" />
            skincare to makeup, all in one place.
          </p>
        </div>
      </div>
    <div>
      <SearchBar/>
    </div>

    <div className="mx-auto mt-10 grid max-w-6xl grid-cols-1 gap-5 px-4 sm:grid-cols-2 lg:grid-cols-3">
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
    </div>


<section className="relative mx-auto mt-8 flex min-h-[240px] w-full max-w-[1200px] items-center overflow-hidden bg-[#faf7f2] px-6 sm:px-10 md:px-12">
  
  <img
    src="src/assets/category1.png"
    alt="Skincare products"
    className="pointer-events-none absolute right-0 top-0 h-full w-1/2 mr-15 object-cover object-center"/>

  <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#faf7f2] via-[#faf7f2]/90 to-transparent" />


  <div className="relative z-10 max-w-xl">
    <h2 className="text-4xl font-bold tracking-tight text-black sm:text-5xl md:text-6xl">
      Skincare Routine
    </h2>

    <p className="mt-3 text-sm text-gray-700 sm:text-base">
      Better skin starts with the right products.
    </p>

    <button
      type="button"
      onClick={() => (window.location.href = "/categories")}
      className="mt-5 inline-flex cursor-pointer items-center justify-center gap-3 rounded-full bg-[#f32b91] px-6 py-3 font-semibold text-white transition hover:bg-[#d91c7c] focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-offset-2"
    >
      Shop Now
      <span aria-hidden="true">→</span>
    </button>
  </div>
</section>


<div className="mx-auto flex w-full max-w-[1200px]  flex-col items-center justify-between gap-4 border-b border-gray-200 px-4 py-4 sm:flex-row sm:px-8">
  <p className="text-sm text-gray-400">
    Showing 1–3 of 8,492
  </p>

  <div className="relative z-10 flex items-center gap-2 ">

    <button
      type="button"
      aria-label="Previous page"
      onClick={() => console.log("Previous page")}
      className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-md border border-gray-200 bg-white text-gray-600 transition hover:border-pink-400 hover:text-pink-500">
      ‹
    </button>

    <button
      type="button"
      aria-current="page"
      className="flex h-9 w-9  cursor-pointer items-center justify-center rounded-md border border-[#f32b91] active:text-white bg-[#f32b91] text-white">
      1
    </button>
,
    <button
      type="button"
      onClick={() => console.log("Page 2")}
      className="flex h-9 w-9  cursor-pointer items-center justify-center rounded-md border border-gray-200 bg-white text-gray-600 transition hover:border-pink-400 hover:text-pink-500">
      2
    </button>

    <button
      type="button"
      aria-label="Next page"
      onClick={() => console.log("Next page")}
      className="flex h-9 w-9 cursor-pointer mr-7 items-center justify-center rounded-md border border-gray-200 bg-white text-gray-600 transition hover:border-pink-400 hover:text-pink-500"
    >
      ›
    </button>
  </div>
</div>
  
   </section>
  );
}