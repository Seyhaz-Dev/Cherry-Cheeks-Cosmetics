
import { useEffect, useState } from "react";
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

// Category images
const categoryImages = {
  1: moistureImage,
  2: serumImage,
  3: creamImage,
  4: tonerImage,
  5: cleanserImage,
};

// Product images
const productImages = {
  101: cleanserImage,
  102: serumImage,
  103: productImage,
  104: creamImage,
  201: moonwaterImage,
  202: tonerImage,
  203: productImage,
  301: nightCreamImage,
  302: creamImage,
  401: productImage,
  501: moistureImage,
  502: cleanserImage,
};

const features = [
  {
    title: "Botanical Ingredients",
    text: "Discover beauty essentials for your everyday routine.",
    icon: "✿",
  },
  {
    title: "Thoughtful Beauty",
    text: "Explore skincare, makeup, haircare, and more.",
    icon: "♡",
  },
  {
    title: "Everyday Self-Care",
    text: "Make a little time for yourself every day.",
    icon: "☼",
  },
];

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
    text: "A lovely collection with a clean and elegant feeling.",
  },
];

function SectionHead({ title, sub, link = "View All" }) {
  return (
    <div className="mb-7 flex flex-wrap items-end justify-between gap-3">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight text-[#292524] sm:text-3xl">
          {title}
        </h2>

        <p className="mt-2 text-sm leading-6 text-[#817874] sm:text-base">
          {sub}
        </p>
      </div>

      <a
        href="/categories"
        className="shrink-0 text-sm font-medium text-[#e94f7d] transition hover:underline"
      >
        {link} →
      </a>
    </div>
  );
}

export default function Home() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Basic fetch: get categories and products from JSON files.
  useEffect(() => {
    async function getData() {
      try {
        const categoryResponse = await fetch(
          "/student-data/categories.json"
        );
        const categoryData = await categoryResponse.json();
        setCategories(categoryData);

        const productResponse = await fetch(
          "/student-data/products.json"
        );
        const productData = await productResponse.json();
        setProducts(productData);
        
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Could not load data. Please check your JSON files.");
      } finally {
        setLoading(false);
      }
    }

    getData();
  }, []);

  // Only display active products.
  const activeProducts = products.filter(
    (product) => product.active === true
  );

  // Connect each product to its category.
  const formattedProducts = activeProducts.map((product) => {
    const category = categories.find(
      (item) => item.id === product.categoryId
    );

    return {
      ...product,
      category: category?.name || "Beauty",
      description:
        product.description || `Discover ${product.name}.`,
      image: productImages[product.id] || productImage,
      rating: product.rating || 0,
      reviews: product.reviews || 0,
    };
  });

  return (
    <main className="overflow-hidden bg-[#fbf8f5] font-['Outfit',sans-serif] text-[#292524]">

      {/* HERO SECTION */}
      <section className="mx-auto grid max-w-7xl items-center gap-8 px-5 py-10 sm:px-8 sm:py-14 md:grid-cols-2 md:gap-12 lg:gap-16 lg:py-20">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#89565a] sm:text-sm">
            Cherry Cheeks · Seoul Skin Ritual
          </p>

          <h1 className="mt-4 text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            Quietly radiant,
            <span className="block text-[#e94f7d]">
              deeply restored.
            </span>
          </h1>

          <p className="mt-5 max-w-lg text-sm leading-7 text-[#817874] sm:text-base">
            Discover thoughtful beauty essentials for your
            everyday routine. From skincare to makeup, find
            your new favourites at Cherry Cheeks.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href="/shop"
              className="inline-flex items-center justify-center rounded-full bg-[#e94f7d] px-7 py-3 text-sm font-medium text-white transition hover:bg-[#d93d6c]"
            >
              Shop Now ↗
            </a>

            <a
              href="/about"
              className="inline-flex items-center justify-center rounded-full border border-[#e7dcd6] px-6 py-3 text-sm font-medium transition hover:bg-white"
            >
              Our Story
            </a>
          </div>

          <div className="mt-7 flex flex-wrap gap-x-5 gap-y-3 text-xs text-[#817874] sm:text-sm">
            <span>♡ Thoughtful Beauty</span>
            <span>✿ Everyday Care</span>
          </div>
        </div>

        <div className="relative mt-2 md:mt-0">
          <div className="absolute -inset-3 rounded-[32px] bg-[#f6dce2] blur-2xl sm:-inset-4" />

          <img
            src={heroImage}
            alt="Cherry Cheeks beauty collection"
            className="relative aspect-[5/4] w-full rounded-3xl object-cover sm:rounded-[36px]"
          />
        </div>
      </section>

      {/* INTRODUCTION */}
      <section
        id="about"
        className="mx-auto grid max-w-7xl gap-5 border-t border-[#eee4df] px-5 py-12 sm:px-8 sm:py-16 md:grid-cols-2 md:items-center md:py-20"
      >
        <h2 className="max-w-xl text-2xl font-semibold leading-snug sm:text-3xl lg:text-4xl">
          A little care can make a beautiful difference.
        </h2>

        <div>
          <p className="text-sm leading-7 text-[#817874] sm:text-base">
            Explore beauty essentials selected for your daily
            routine. Find products for your skin, hair, body,
            and personal style — all in one place.
          </p>

          <a
            href="#why-us"
            className="mt-4 inline-block text-sm font-medium text-[#e94f7d] hover:underline"
          >
            Discover Our Philosophy →
          </a>
        </div>
      </section>

      {/* CATEGORIES */}
      <section
        id="categories"
        className="mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-14"
      >
        <SectionHead
          title="Popular Categories"
          sub="Find the essentials for your everyday routine."
          link="Explore All"
        />

        {loading ? (
          <p className="py-8 text-center text-sm text-[#817874]">
            Loading categories...
          </p>
        ) : error ? (
          <p className="py-8 text-center text-sm text-red-500">
            {error}
          </p>
        ) : categories.length === 0 ? (
          <p className="py-8 text-center text-sm text-[#817874]">
            No categories found.
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-5">
            {categories.map((category) => {
              const categoryProducts = activeProducts.filter(
                (product) => product.categoryId === category.id
              );

              return (
                <a
                  href="/categories"
                  key={category.id}
                  className="group min-w-0"
                >
                  <div className="overflow-hidden rounded-2xl bg-[#f3e9e4]">
                    <img
                      src={
                        categoryImages[category.id] || productImage
                      }
                      alt={category.name}
                      loading="lazy"
                      className="h-32 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-40 lg:h-48"
                    />
                  </div>

                  <h3 className="mt-3 break-words text-sm font-semibold sm:text-base">
                    {category.name}
                  </h3>

                  <p className="mt-1 text-xs leading-5 text-[#817874] sm:text-sm">
                    {category.description}
                  </p>

                  <p className="mt-2 text-xs text-[#a0948e] sm:text-sm">
                    {categoryProducts.length} products
                  </p>
                </a>
              );
            })}
          </div>
        )}
      </section>

      {/* FEATURED PRODUCTS */}
      <section
        id="featured"
        className="mx-auto max-w-7xl scroll-mt-20 px-5 py-10 sm:px-8 sm:py-14 md:py-16"
      >
        <SectionHead
          title="Featured Products"
          sub="Discover your next beauty essential."
          link="Shop All"
        />
         

        {loading ? (
          <p className="py-8 text-center text-sm text-[#817874]">
            Loading products...
          </p>
        ) : error ? (
          <p className="py-8 text-center text-sm text-red-500">
            Products could not be loaded.
          </p>
        ) : formattedProducts.length === 0 ? (
          <p className="py-8 text-center text-sm text-[#817874]">
            No active products found.
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
            {formattedProducts.slice(0, 8).map((product) => (
              <div
                key={product.id}
                className="min-w-0 rounded-xl transition duration-300 hover:-translate-y-1 sm:rounded-2xl"
              >
                <ProductCard {...product} />

                <p className="mt-2 px-1 text-xs text-[#817874] sm:text-sm">
                  {product.stockQuantity > 0
                    ? `${product.stockQuantity} in stock`
                    : "Out of stock"}
                </p>
              </div>
            ))}
          </div>
        )}

        <div className="mt-9 text-center sm:mt-12">
          <a  
            href="/shop"
            className="inline-flex items-center justify-center rounded-full bg-[#e94f7d] px-7 py-3 text-sm font-medium text-white transition hover:bg-[#d93d6c]"
          >
            Explore All Products →
          </a>
        </div>
      </section>

      {/* WHY CHERRY CHEEKS */}
      <section
        id="why-us"
        className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16 md:py-20"
      >
        <div className="text-center">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#89565a]">
            Why Cherry Cheeks
          </p>

          <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">
            Less noise. More care.
          </h2>

          <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-[#817874] sm:text-base">
            Discover a thoughtful approach to your everyday
            beauty routine.
          </p>
        </div>

        <div className="mt-8 grid gap-4 sm:mt-10 sm:gap-5 md:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-2xl border border-[#f0e6e1] bg-white p-5 transition duration-300 hover:-translate-y-1 hover:shadow-lg sm:p-7"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#fbe9e4] text-xl text-[#e94f7d]">
                {feature.icon}
              </span>

              <h3 className="mt-4 font-semibold sm:mt-5">
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
      <section className="bg-[#f6e9e4] px-5 py-12 sm:px-8 sm:py-16 md:py-20">
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

          <div className="mt-8 grid gap-4 sm:mt-10 sm:gap-5 md:grid-cols-3">
            {reviews.map((review) => (
              <figure
                key={review.name}
                className="rounded-2xl bg-white p-5 shadow-sm sm:p-7"
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
      <section className="mx-auto max-w-2xl px-5 py-12 text-center sm:px-8 sm:py-16 md:py-20">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#89565a]">
          A Note From Us
        </p>

        <h2 className="mt-3 text-2xl font-semibold sm:text-3xl">
          Notes for luminous living.
        </h2>

        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#817874] sm:text-base">
          Beauty inspiration, thoughtful rituals, and updates
          from Cherry Cheeks, delivered to your inbox.
        </p>

        <form
          onSubmit={(event) => {
            event.preventDefault();
            alert("Thank you for subscribing!");
          }}
          className="mx-auto mt-7 flex w-full max-w-md flex-col gap-3 rounded-2xl border border-[#e7dcd6] bg-white p-3 sm:flex-row sm:items-center sm:rounded-full sm:pl-5"
        >
          <input
            type="email"
            placeholder="Enter your email address"
            aria-label="Email address"
            required
            className="min-w-0 flex-1 rounded-full bg-transparent px-3 py-3 text-sm outline-none placeholder:text-[#b3a8a3]"
          />

          <button
            type="submit"
            className="shrink-0 rounded-full bg-[#292524] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#e94f7d]"
          >
            Subscribe →
          </button>
        </form>

        <p className="mt-3 text-xs text-[#a0948e]">
          A little beauty inspiration, no unnecessary noise.
        </p>
      </section>
    </main>
  );
}
