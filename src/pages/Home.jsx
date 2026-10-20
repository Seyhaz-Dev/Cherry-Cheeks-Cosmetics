import ProductCard from "../components/ProductCard";

/* ---------- Data (replace with API / CMS later) ---------- */
const categories = [
 { name: "Moisture Essence", rating: 4.8, price: "$35.00", count: 20 },
 { name: "Glow Serum", rating: 4.9, price: "$42.00", count: 14 },
 { name: "Cream & Balm", rating: 4.7, price: "$28.00", count: 18 },
 { name: "Cleansers", rating: 4.8, price: "$22.00", count: 12 },
];

const products = [
 { name: "Dewdrop Renewal Serum", category: "Serum", price: 68, rating: 4.9 },
 { name: "Moonwater Essence", category: "Essence", price: 35, rating: 4.8 },
 { name: "Camellia Night Cream", category: "Cream", price: 54, rating: 4.7 },
 { name: "Peony Glow Toner", category: "Toner", price: 29, rating: 4.9 },
];

const features = Array.from({ length: 3 }, () => ({
 title: "Botanical intelligence",
 text: "Centella, rice ferment, camellia and peony chosen for calm, resilient skin.",
}));

const reviews = [
 { name: "Sora K.", text: "My skin feels calm, bouncy, and glowing — not coated." },
 { name: "Dara S.", text: "My skin feels clean, bouncy, and glowing — not coated." },
 { name: "Mina R.", text: "My skin feels soft, bouncy, and glowing — not coated." },
];

const IMG = "/src/assets/productcard.png"; // change to your real images
const HERO = "/src/assets/hero.png";

/* ---------- Small helpers ---------- */
function SectionHead({ title, sub, link = "View All" }) {
 return (
   <div className="mb-8 flex items-end justify-between">
     <div>
       <h2 className="text-2xl font-semibold text-[#292524] sm:text-3xl">{title}</h2>
       <p className="mt-1 text-sm text-[#817874]">{sub}</p>
     </div>
     <a href="#" className="text-sm font-medium text-[#e94f7d] hover:underline">
       {link}
     </a>
   </div>
 );
}

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
