import shopBanner from '../assets/herobanner.png'
import SearchBar from '../components/SearchBar'
import ProductCard from '../components/ProductCard'

function Shop() {
  return (
    <section className="px-4 py-6 text-[var(--color-text)] sm:px-6 sm:py-8 lg:px-8 lg:py-10">
      <div className="mx-auto max-w-7xl">

        <div className="mb-6">
          <SearchBar />
        </div>

        <div className="mb-12">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <ProductCard image="src/assets/productcard.png" category="Serum" name="Dewdrop Renewal Serum" price="68" rating="4.9" isBestseller={true}/>
            <ProductCard image="src/assets/productcard.png" category="Serum" name="Dewdrop Renewal Serum" price="68" rating="4.9" isBestseller={true}/>
            <ProductCard image="src/assets/productcard.png" category="Serum" name="Dewdrop Renewal Serum" price="68" rating="4.9" isBestseller={true}/>
            <ProductCard image="src/assets/productcard.png" category="Serum" name="Dewdrop Renewal Serum" price="68" rating="4.9" isBestseller={true}/>
          </div>

        </div>

        <div className="relative mx-auto my-12 overflow-hidden rounded-3xl">
          <img src={shopBanner} alt="Makeup products arranged on a pale pink background" className="h-38 w-full object-cover sm:h-64 md:h-70 lg:h-76" />

          <div className="absolute inset-0  flex flex-col items-center justify-center p-4 text-center sm:items-start sm:text-left sm:p-6 md:p-8 lg:p-12">
            <p className="text-xs font-semibold text-[var(--color-text)] sm:text-sm md:text-base lg:text-lg">
              The collection
            </p>
            <h3 className="mt-1 text-xl font-bold text-[var(--color-text)] sm:text-2xl md:text-3xl lg:text-4xl">
              Care, in every layer.
            </h3>
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