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
    </section>
  );
}