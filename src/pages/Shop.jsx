import shopBanner from '../assets/herobanner.png'


function Shop() {
    return (
        <section className="px-4 py-6 text-[var(--color-text)] sm:px-6 sm:py-8 lg:px-8">
            <div className="mx-auto max-w-7xl">
                <div className="w-full overflow-hidden rounded-lg">
                    <img src={shopBanner} alt="Makeup products arranged on a pale pink background" className="aspect-[889/350] w-full object-cover" />
                    <div className="flex flex-col items-start gap-2 py-6 sm:py-8">
                        <p className="text-lg font-medium">Shop All Products</p>
                        <h1>Quietly radiant, deeply restored.</h1>
                        <span>Find your favorite makeup, skincare and more, all in one place.</span>
                    </div>
                </div>
                
                
            </div>
        </section>
    )
}


export default Shop