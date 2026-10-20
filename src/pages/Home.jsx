
import { useState } from "react";
import ProductCard from "../components/ProductCard";

const products = [
  {
    name: "Dewdrop Renewal Serum",
    category: "FACE SERUM",
    description: "A daily dose of hydration for a radiant glow.",
    price: 35,
    rating: 4.9,
    reviews: 218,
    badge: "BESTSELLER",
    image:
      "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=800&q=85",
    sizes: [
      { label: "30 ml", price: 35 },
      { label: "50 ml", price: 48 },
    ],
  },
  {
    name: "Rose Petal Moisturizer",
    category: "MOISTURIZER",
    description: "Soft, nourishing care for beautifully supple skin.",
    price: 42,
    rating: 4.8,
    reviews: 156,
    badge: "FAN FAVORITE",
    image:
      "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=800&q=85",
    sizes: [
      { label: "30 ml", price: 30 },
      { label: "50 ml", price: 42 },
    ],
  },
  {
    name: "Cloud Nine Cleanser",
    category: "FACIAL CLEANSER",
    description: "A gentle daily cleanse for fresh, happy skin.",
    price: 28,
    rating: 4.9,
    reviews: 124,
    badge: "DAILY ESSENTIAL",
    image:
      "https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?auto=format&fit=crop&w=800&q=85",
    sizes: [
      { label: "100 ml", price: 28 },
      { label: "150 ml", price: 38 },
    ],
  },
];

const categories = [
  {
    name: "Cleansers",
    subtitle: "A fresh start",
    image:
      "https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?auto=format&fit=crop&w=700&q=85",
  },
  {
    name: "Serums",
    subtitle: "Your daily glow",
    image:
      "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=700&q=85",
  },
  {
    name: "Moisturizers",
    subtitle: "Deep nourishment",
    image:
      "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=700&q=85",
  },
];

export default function HomePage() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  function handleSubscribe(event) {
    event.preventDefault();

    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  }

  return (
    <main className="overflow-hidden bg-[#fcf8f5] text-[#3d3030]">

      {/* HERO SECTION */}
      <section className="px-5 pb-12 pt-5 sm:px-8 lg:px-16">
        <div className="relative mx-auto grid max-w-7xl overflow-hidden rounded-[28px] bg-[#f1dfd8] lg:min-h-[540px] lg:grid-cols-2">

          <div className="relative z-10 flex flex-col items-start justify-center px-7 py-12 sm:px-12 lg:px-16 lg:py-16">
            <span className="rounded-full border border-[#ad6c75]/30 px-4 py-2 text-[10px] font-semibold tracking-[2px] text-[#925761]">
              YOUR SKIN, YOUR GLOW
            </span>

            <h1 className="mt-7 max-w-xl text-4xl font-medium leading-[1.15] tracking-tight sm:text-5xl lg:text-6xl">
              A little love for
              <span className="block font-serif italic text-[#ad6c75]">
                your skin.
              </span>
            </h1>

            <p className="mt-5 max-w-md text-sm leading-7 text-[#776461] sm:text-base">
              Discover thoughtful skincare made to nourish
              your skin, celebrate your natural beauty, and
              make every day feel special.
            </p>

            <a
              href="#products"
              className="mt-8 inline-flex items-center gap-3 rounded-full bg-[#ad6c75] px-7 py-4 text-sm font-medium text-white transition hover:bg-[#925761]"
            >
              Shop our collection
              <span aria-hidden="true">→</span>
            </a>

            <div className="mt-10 flex items-center gap-3">
              <div className="flex -space-x-2">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80"
                  alt=""
                  className="h-9 w-9 rounded-full border-2 border-[#f1dfd8] object-cover"
                />
                <img
                  src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=80&q=80"
                  alt=""
                  className="h-9 w-9 rounded-full border-2 border-[#f1dfd8] object-cover"
                />
                <img
                  src="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=80&q=80"
                  alt=""
                  className="h-9 w-9 rounded-full border-2 border-[#f1dfd8] object-cover"
                />
              </div>

              <p className="text-xs text-[#776461]">
                Made for your everyday ritual
              </p>
            </div>
          </div>

          <div className="relative min-h-[320px] lg:min-h-full">
            <img
              src="https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=1200&q=90"
              alt="Skincare products for your daily beauty routine"
              className="absolute inset-0 h-full w-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#3d3030]/20 to-transparent" />

            <div className="absolute bottom-5 right-5 rounded-2xl bg-white/90 px-5 py-4 backdrop-blur-sm sm:bottom-8 sm:right-8">
              <p className="font-serif text-lg italic text-[#ad6c75]">
                Feel good in your skin.
              </p>
              <p className="mt-1 text-[10px] tracking-widest text-stone-500">
                THE CHERRY CHEEKS WAY
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* BRAND PROMISE */}
      <section className="border-y border-[#eee2dc] bg-white px-5 py-6 sm:px-8 lg:px-16">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 text-center sm:grid-cols-4">
          {[
            "Gentle daily care",
            "Thoughtful formulas",
            "Made for your ritual",
            "A little self-love",
          ].map((item) => (
            <div key={item} className="flex items-center justify-center gap-2">
              <span className="text-[#ad6c75]">✳</span>
              <span className="text-xs font-medium text-stone-600 sm:text-sm">
                {item}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* CATEGORIES */}
      <section id="categories" className="px-5 py-16 sm:px-8 lg:px-16 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-9 flex items-end justify-between gap-4">
            <div>
              <p className="text-[10px] font-semibold tracking-[3px] text-[#ad6c75]">
                FIND YOUR FAVORITES
              </p>
              <h2 className="mt-3 text-3xl font-medium sm:text-4xl">
                Shop by category
              </h2>
              <p className="mt-3 text-sm text-stone-500">
                Your skin deserves a routine made just for you.
              </p>
            </div>

            <a
              href="#products"
              className="hidden text-sm font-medium text-[#ad6c75] hover:underline sm:block"
            >
              Explore all →
            </a>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            {categories.map((category) => (
              <a
                href="#products"
                key={category.name}
                className="group relative overflow-hidden rounded-[22px] bg-[#f1dfd8]"
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="aspect-[4/3] w-full object-cover transition duration-500 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />

                <div className="absolute inset-x-0 bottom-0 p-5 text-white sm:p-6">
                  <p className="text-xs text-white/80">
                    {category.subtitle}
                  </p>
                  <div className="mt-1 flex items-center justify-between">
                    <h3 className="text-xl font-medium">
                      {category.name}
                    </h3>
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 transition group-hover:bg-white group-hover:text-[#ad6c75]">
                      ↗
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section id="products" className="bg-white px-5 py-16 sm:px-8 lg:px-16 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 text-center">
            <p className="text-[10px] font-semibold tracking-[3px] text-[#ad6c75]">
              A LITTLE SOMETHING FOR YOU
            </p>

            <h2 className="mt-3 text-3xl font-medium sm:text-4xl">
              Our skincare favorites
            </h2>

            <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-stone-500">
              Meet the everyday essentials that make caring
              for your skin feel like self-love.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
            {products.map((product) => (
              <ProductCard key={product.name} {...product} />
            ))}
          </div>

          <div className="mt-10 text-center">
            <a
              href="#categories"
              className="inline-flex items-center gap-3 rounded-full border border-[#ad6c75] px-7 py-3.5 text-sm font-medium text-[#ad6c75] transition hover:bg-[#ad6c75] hover:text-white"
            >
              Explore our collection
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </section>

      {/* BRAND STORY */}
      <section className="px-5 py-16 sm:px-8 lg:px-16 lg:py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="overflow-hidden rounded-[26px] bg-[#f1dfd8]">
            <img
              src="https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=1200&q=85"
              alt="A peaceful skincare self-care ritual"
              className="aspect-[5/4] w-full object-cover"
            />
          </div>

          <div className="py-3 lg:py-10">
            <p className="text-[10px] font-semibold tracking-[3px] text-[#ad6c75]">
              OUR LITTLE STORY
            </p>

            <h2 className="mt-4 text-3xl font-medium leading-tight sm:text-4xl lg:text-5xl">
              Skincare is more than a routine.
              <span className="block font-serif italic text-[#ad6c75]">
                It's self-love.
              </span>
            </h2>

            <p className="mt-6 text-sm leading-7 text-stone-500">
              At Cherry Cheeks, we believe beauty begins with
              taking a moment for yourself. Our vision is to
              make skincare feel simple, comforting, and
              special — one little ritual at a time.
            </p>

            <p className="mt-4 text-sm leading-7 text-stone-500">
              Because you deserve to feel confident, cared for,
              and beautiful in your own skin.
            </p>

            <a
              href="#newsletter"
              className="mt-8 inline-flex items-center gap-2 border-b border-[#ad6c75] pb-2 text-sm font-medium text-[#ad6c75] hover:text-[#925761]"
            >
              Get to know us <span>→</span>
            </a>
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section id="newsletter" className="px-5 pb-16 sm:px-8 lg:px-16 lg:pb-24">
        <div className="mx-auto max-w-7xl rounded-[26px] bg-[#f1dfd8] px-6 py-12 text-center sm:px-12 sm:py-16">
          <p className="text-[10px] font-semibold tracking-[3px] text-[#925761]">
            A LITTLE LOVE IN YOUR INBOX
          </p>

          <h2 className="mt-4 text-3xl font-medium sm:text-4xl">
            Your glow starts here.
          </h2>

          <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#776461]">
            Get skincare tips, beauty inspiration, and updates
            from Cherry Cheeks.
          </p>

          <form
            onSubmit={handleSubscribe}
            className="mx-auto mt-7 flex max-w-lg flex-col gap-3 sm:flex-row"
          >
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Enter your email address"
              aria-label="Email address"
              required
              className="min-w-0 flex-1 rounded-full border border-[#e5c9c3] bg-white px-5 py-4 text-sm outline-none placeholder:text-stone-400 focus:border-[#ad6c75]"
            />

            <button
              type="submit"
              className="rounded-full bg-[#ad6c75] px-7 py-4 text-sm font-medium text-white transition hover:bg-[#925761]"
            >
              Join our community
            </button>
          </form>

          {subscribed && (
            <p role="status" className="mt-4 text-sm text-[#925761]">
              Thank you for joining Cherry Cheeks! ♡
            </p>
          )}
        </div>
      </section>

    </main>
  );
}
