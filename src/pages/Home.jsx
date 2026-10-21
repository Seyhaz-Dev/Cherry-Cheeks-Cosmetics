import ProductCard from "../components/ProductCard";

import heroImage from "../assets/hero1.png";

import moistureImage from "../assets/moisture-essence.png";
import serumImage from "../assets/glow-serum.png";
import creamImage from "../assets/cream-balm.png";
import cleanserImage from "../assets/cleanser.png";

import productImage from "../assets/productcard1.png";
import moonwaterImage from "../assets/moonwater.png";
import nightCreamImage from "../assets/night-cream.png";
import tonerImage from "../assets/peony-toner.png";

// ==============================
// POPULAR CATEGORIES
// ==============================

const categories = [
  {
    name: "Moisture Essence",
    rating: 4.8,
    price: "$35.00",
    count: 20,
    image: moistureImage,
  },
  {
    name: "Glow Serum",
    rating: 4.9,
    price: "$42.00",
    count: 14,
    image: serumImage,
  },
  {
    name: "Cream & Balm",
    rating: 4.7,
    price: "$28.00",
    count: 18,
    image: creamImage,
  },
  {
    name: "Cleansers",
    rating: 4.8,
    price: "$22.00",
    count: 12,
    image: cleanserImage,
  },
];

// ==============================
// FEATURED PRODUCTS
// ==============================

const products = [
  {
    name: "Dewdrop Renewal Serum",
    category: "FACE SERUM",
    description: "Hydrate, nourish & reveal your natural glow.",
    price: 68,
    rating: 4.9,
    reviews: 218,
    image: productImage,
  },
  {
    name: "Moonwater Essence",
    category: "ESSENCE",
    description: "Refresh and hydrate for a soft, dewy look.",
    price: 35,
    rating: 4.8,
    reviews: 156,
    image: moonwaterImage,
  },
  {
    name: "Camellia Night Cream",
    category: "NIGHT CREAM",
    description: "A comforting cream for your evening ritual.",
    price: 54,
    rating: 4.7,
    reviews: 124,
    image: nightCreamImage,
  },
  {
    name: "Peony Glow Toner",
    category: "FACE TONER",
    description: "A refreshing step for smooth-looking skin.",
    price: 29,
    rating: 4.9,
    reviews: 189,
    image: tonerImage,
  },
];

// ==============================
// WHY CHERRY CHEEKS
// ==============================

const features = [
  {
    title: "Botanical Ingredients",
    text: "Inspired by centella, rice ferment, camellia and peony.",
    icon: "✿",
  },
  {
    title: "Gentle Skincare",
    text: "Thoughtfully selected products for a simple daily routine.",
    icon: "♡",
  },
  {
    title: "Everyday Self-Care",
    text: "Make a little time for yourself with every skincare ritual.",
    icon: "☼",
  },
];

// ==============================
// CUSTOMER REVIEWS
// ==============================

const reviews = [
  {
    name: "Sora K.",
    text: "My skin feels soft and hydrated. I love my daily skincare routine.",
  },
  {
    name: "Dara S.",
    text: "The products look beautiful and make my routine feel special.",
  },
  {
    name: "Mina R.",
    text: "A lovely skincare collection with a clean and elegant feeling.",
  },
];

// ==============================
// REUSABLE SECTION HEADING
// ==============================

function SectionHead({
  title,
  sub,
  link = "View All",
}) {
  return (
    <div className="mb-7 flex items-end justify-between gap-3">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight text-[#292524] sm:text-3xl">
          {title}
        </h2>

        <p className="mt-2 text-sm leading-6 text-[#817874]">
          {sub}
        </p>
      </div>

      <a
        href="#featured"
        className="shrink-0 text-sm font-medium text-[#e94f7d] transition hover:underline"
      >
        {link} →
      </a>
    </div>
  );
}

// ==============================
// HOME PAGE
// ==============================

export default function Home() {
  return (
    <main className="overflow-hidden bg-[#fbf8f5] font-['Outfit',sans-serif] text-[#292524]">

      {/* HERO SECTION */}

      <section className="mx-auto grid max-w-7xl items-center gap-9 px-5 pb-12 pt-10 sm:px-8 md:grid-cols-2 md:gap-14 md:pb-20 md:pt-16">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-[#89565a] sm:text-sm">
            Cherry Cheeks · Seoul Skin Ritual
          </p>

          <h1 className="mt-5 text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            Quietly radiant,
            <span className="block text-[#e94f7d]">
              deeply restored.
            </span>
          </h1>

          <p className="mt-5 max-w-lg text-sm leading-7 text-[#817874] sm:text-base">
            Discover thoughtful Korean skincare inspired by botanical
            ingredients and a gentle approach to healthy-looking skin.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href="#featured"
              className="inline-flex items-center justify-center rounded-full bg-[#e94f7d] px-7 py-3 text-sm font-medium !text-white transition-colors duration-300 hover:bg-[#d93d6c]"
            >
              Shop Now ↗
            </a>

            <a
              href="#about"
              className="inline-flex items-center justify-center rounded-full border border-[#e7dcd6] px-6 py-3 text-sm font-medium transition-colors duration-300 hover:bg-white"
            >
              Our Story
            </a>
          </div>

          <div className="mt-8 flex flex-wrap gap-x-5 gap-y-3 text-xs text-[#817874] sm:text-sm">
            <span>♡ Thoughtful Ingredients</span>
            <span>✿ Everyday Care</span>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-4 rounded-[32px] bg-[#f6dce2] blur-2xl" />

          <img
            src={heroImage}
            alt="Cherry Cheeks skincare collection"
            className="relative aspect-[5/4] w-full rounded-[28px] object-cover sm:rounded-[36px]"
          />
        </div>
      </section>

      {/* INTRO SECTION */}

      <section
        id="about"
        className="mx-auto grid max-w-7xl gap-5 border-t border-[#eee4df] px-5 py-14 sm:px-8 md:grid-cols-2 md:items-center md:py-20"
      >
        <h2 className="max-w-xl text-2xl font-semibold leading-snug sm:text-3xl">
          A gentler standard for transformative skincare.
        </h2>

        <div>
          <p className="text-sm leading-7 text-[#817874] sm:text-base">
            We bring together botanical inspiration and thoughtfully
            selected skincare ingredients. Every routine is an opportunity
            to nourish your skin and enjoy a moment of self-care.
          </p>

          <a
            href="#why-us"
            className="mt-4 inline-block text-sm font-medium text-[#e94f7d] hover:underline"
          >
            Discover Our Philosophy →
          </a>
        </div>
      </section>

      {/* POPULAR CATEGORIES */}

      <section
        id="categories"
        className="mx-auto max-w-7xl px-5 py-12 sm:px-8"
      >
        <SectionHead
          title="Popular Categories"
          sub="Find the essentials for your skincare routine."
          link="Explore All"
        />

        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {categories.map((category) => (
            <a
              href="#featured"
              key={category.name}
              className="group min-w-0"
            >
              <div className="h-[140px] overflow-hidden rounded-2xl bg-[#f3e9e4] sm:h-[180px] lg:h-[210px]">
                <img
                  src={category.image}
                  alt={category.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <h3 className="mt-3 text-sm font-semibold sm:text-base">
                {category.name}
              </h3>

              <p className="mt-1 text-xs text-[#817874] sm:text-sm">
                <span className="text-[#eaa12c]">★</span>{" "}
                {category.rating} · {category.price}
              </p>

              <p className="mt-1 text-xs text-[#a0948e]">
                {category.count} products
              </p>
            </a>
          ))}
        </div>
      </section>

      {/* FEATURED PRODUCTS */}

      <section
        id="featured"
        className="mx-auto max-w-7xl scroll-mt-20 px-5 py-12 sm:px-8 md:py-16"
      >
        <SectionHead
          title="Featured Products"
          sub="Your new favourites, thoughtfully selected."
          link="Shop All"
        />

        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {products.map((product, index) => (
            <div
              key={product.name}
              className="featured-product-animation min-w-0"
              style={{
                animationDelay: `${index * 0.15}s`,
              }}
            >
              <ProductCard {...product} />
            </div>
          ))}
        </div>
      </section>

      {/* WHY CHERRY CHEEKS */}

      <section
        id="why-us"
        className="mx-auto max-w-7xl px-5 py-14 sm:px-8 md:py-20"
      >
        <div className="text-center">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#89565a]">
            Why Cherry Cheeks
          </p>

          <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">
            Less noise. More care.
          </h2>

          <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-[#817874]">
            Discover a more thoughtful approach to your everyday skincare.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-2xl border border-[#f0e6e1] bg-white p-6 transition duration-300 hover:-translate-y-1 hover:shadow-lg sm:p-7"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#fbe9e4] text-xl text-[#e94f7d]">
                {feature.icon}
              </span>

              <h3 className="mt-5 font-semibold">
                {feature.title}
              </h3>

              <p className="mt-2 text-sm leading-6 text-[#817874]">
                {feature.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CUSTOMER REVIEWS */}

      <section className="bg-[#f6e9e4] px-5 py-16 sm:px-8 md:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#89565a]">
              Kind Words
            </p>

            <h2 className="mt-3 text-2xl font-semibold sm:text-3xl">
              Loved, every day.
            </h2>

            <p className="mt-3 text-sm text-[#817874]">
              Little moments of care, shared by our community.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {reviews.map((review) => (
              <figure
                key={review.name}
                className="rounded-2xl bg-white p-6 shadow-sm sm:p-7"
              >
                <div
                  className="text-sm tracking-widest text-yellow-400"
                  aria-label="5 out of 5 stars"
                >
                  ★★★★★
                </div>

                <blockquote className="mt-4 text-sm leading-7 text-[#625956]">
                  “{review.text}”
                </blockquote>

                <figcaption className="mt-6 flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#fbe9e4] text-sm font-semibold text-[#e94f7d]">
                    {review.name.charAt(0)}
                  </span>

                  <div>
                    <p className="text-sm font-semibold">
                      {review.name}
                    </p>

                    <p className="mt-1 text-xs text-[#817874]">
                      Customer review
                    </p>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}

      <section className="mx-auto max-w-2xl px-5 py-16 text-center sm:px-8 md:py-20">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#89565a]">
          A Note From Us
        </p>

        <h2 className="mt-3 text-2xl font-semibold sm:text-3xl">
          Notes for luminous living.
        </h2>

        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#817874]">
          Skincare inspiration, thoughtful rituals, and updates from
          Cherry Cheeks, delivered to your inbox.
        </p>

        <form
          onSubmit={(event) => {
            event.preventDefault();
            alert("Thank you for subscribing!");
          }}
          className="mx-auto mt-7 flex max-w-md items-center gap-2 rounded-full border border-[#e7dcd6] bg-white p-2 pl-4"
        >
          <input
            type="email"
            placeholder="Enter your email address"
            aria-label="Email address"
            required
            className="min-w-0 flex-1 bg-transparent py-2 text-sm outline-none placeholder:text-[#b3a8a3]"
          />

          <button
            type="submit"
            className="shrink-0 rounded-full bg-[#292524] px-4 py-3 text-xs font-medium !text-white transition-colors duration-300 hover:bg-[#e94f7d] sm:px-5 sm:text-sm"
          >
            Subscribe →
          </button>
        </form>

        <p className="mt-3 text-xs text-[#a0948e]">
          A little beauty inspiration, no unnecessary noise.
        </p>
      </section>

/* ---------- Page ---------- */
export default function Home() {
 return (
   <main className="bg-[#fbf8f5] font-['Outfit',sans-serif] text-[#292524]">
     {/* HERO */}
     <section className="mx-auto grid max-w-6xl items-center gap-8 px-6 pt-12 md:grid-cols-2 md:pt-20">
       <div>
         <p className="text-sm text-[#89565a]">Seoul Skin Ritual 01</p>
         <h1 className="mt-4 text-4xl font-semibold leading-[1.1] sm:text-6xl">
           Quietly radiant, deeply restored.
         </h1>
         <p className="mt-5 max-w-md text-[#817874]">
           High-performance Korean skincare guided by botanical intelligence and
           a devotion to the barrier.
         </p>
         <a
           href="#featured"
           className="mt-8 inline-block rounded-full bg-[#e94f7d] px-7 py-3 text-sm font-medium text-white shadow-lg shadow-[#e94f7d]/30 transition hover:bg-[#d93d6c] active:scale-95"
         >
           Shop now
         </a>
       </div>

       <div className="relative">
         <div className="absolute -inset-6 -z-0 rounded-[48px] bg-gradient-to-br from-[#f9d5dd] to-[#fbe9e4] blur-2xl" />
         <img
           src={HERO}
           alt="Woman applying Cherry Cheeks skincare"
           className="relative aspect-[5/4] w-full rounded-[36px] object-cover"
         />
       </div>
     </section>

     {/* INTRO */}
     <section className="mx-auto mt-16 grid max-w-6xl gap-6 px-6 md:grid-cols-2 md:items-center">
       <h2 className="text-2xl font-semibold sm:text-3xl">
         A gentler standard for transformative skincare.
       </h2>
       <div>
         <p className="text-sm leading-relaxed text-[#817874]">
           We pair time-honored Korean botanicals with clinically considered
           actives. Every formula is made to strengthen, soothe, and honor your
           natural balance.
         </p>
         <a href="#" className="mt-3 inline-block text-sm font-medium text-[#e94f7d] hover:underline">
           Discover our ingredients
         </a>
       </div>
     </section>

     {/* POPULAR CATEGORIES */}
     <section className="mx-auto mt-20 max-w-6xl px-6">
       <SectionHead title="Popular Categories" sub="Best-selling groups, this week" />
       <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
         {categories.map((c) => (
           <a key={c.name} href="#" className="group block">
             <div className="aspect-[4/3] overflow-hidden rounded-2xl">
               <img
                 src={IMG}
                 alt={c.name}
                 className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
               />
             </div>
             <h3 className="mt-3 text-sm font-semibold">{c.name}</h3>
             <p className="mt-0.5 text-xs text-[#817874]">
               <span className="text-[#ff9f24]">★</span> {c.rating} · {c.price} ({c.count} products)
             </p>
           </a>
         ))}
       </div>
     </section>

     {/* FEATURED PRODUCTS (uses your ProductCard) */}
     <section id="featured" className="mx-auto mt-20 max-w-6xl px-6">
       <SectionHead title="Featured products" sub="Best-selling products, this week" />
       <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
         {products.map((p) => (
           <ProductCard key={p.name} {...p} image={IMG} />
         ))}
       </div>
     </section>

     {/* WHY CHERRY CHEEKS */}
     <section className="mx-auto mt-24 max-w-6xl px-6">
       <p className="text-sm text-[#89565a]">Why Cherry Cheeks</p>
       <h2 className="mt-1 text-3xl font-semibold">Less noise. More care.</h2>
       <p className="mt-1 text-sm text-[#817874]">What your skin needs, and nothing it doesn't.</p>
       <div className="mt-8 grid gap-5 md:grid-cols-3">
         {features.map((f, i) => (
           <div key={i} className="rounded-2xl bg-white p-6 shadow-[0_8px_24px_-14px_rgba(137,86,90,0.3)]">
             <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#fbe9e4] text-[#e94f7d]">✿</span>
             <h3 className="mt-4 font-semibold">{f.title}</h3>
             <p className="mt-1 text-sm text-[#817874]">{f.text}</p>
           </div>
         ))}
       </div>
     </section>

     {/* TESTIMONIALS */}
     <section className="mt-24 bg-[#f6e9e4] py-20">
       <div className="mx-auto max-w-6xl px-6">
         <p className="text-center text-sm text-[#89565a]">Loved, every day</p>
         <h2 className="mt-1 text-center text-3xl font-semibold">Rituals our community keeps</h2>
         <div className="mt-10 grid gap-5 md:grid-cols-3">
           {reviews.map((r) => (
             <figure key={r.name} className="rounded-2xl bg-white p-6 shadow-sm">
               <div className="text-sm text-[#ff9f24]">★★★★★ <span className="text-[#817874]">5.0</span></div>
               <blockquote className="mt-3 text-sm">{r.text}</blockquote>
               <figcaption className="mt-5 flex items-center gap-3">
                 <span className="h-9 w-9 rounded-full bg-[#f6e9e4]" />
                 <span className="text-sm">
                   <b className="block font-semibold">{r.name}</b>
                   <span className="text-xs text-[#817874]">Verified buyer</span>
                 </span>
               </figcaption>
             </figure>
           ))}
         </div>
       </div>
     </section>

     {/* NEWSLETTER */}
     <section className="mx-auto max-w-xl px-6 py-20 text-center">
       <h2 className="text-2xl font-semibold">Notes for luminous living</h2>
       <p className="mt-2 text-sm text-[#817874]">
         Skincare guidance, quiet rituals, and first access to new formulas.
       </p>
       <div className="mt-6 flex items-center rounded-full border border-[#e7dcd6] bg-white p-1.5 pl-5">
         <input
           type="email"
           placeholder="Email address"
           aria-label="Email address"
           className="flex-1 bg-transparent text-sm outline-none placeholder:text-[#b3a8a3]"
         />
         <button
           aria-label="Subscribe"
           className="flex h-9 w-9 items-center justify-center rounded-full bg-[#292524] text-white transition hover:bg-[#e94f7d]"
         >
           →
         </button>
       </div>
     </section>
   </main>
 );
}
