import { useEffect, useState } from "react";

export default function ProductCard({
  name = "Dewdrop Renewal Serum",
  category = "Serum",
  benefit = "Barrier-repair glow with centella + rice ferment",
  price = 68,
  sizes, // optional: [{ label: "30ml", price: 48 }, ...]
  rating = 4.9,
  reviews = 218,
  image = "/src/assets/productcard.png",
  badge = "Bestseller",
}) {
  const options = sizes ?? [
    { label: "30ml", price: Math.round(price * 0.7) },
    { label: "50ml", price },
  ];

  const [isFavorite, setIsFavorite] = useState(false);
  const [size, setSize] = useState(options.length - 1);
  const [cartCount, setCartCount] = useState(0);
  const [justAdded, setJustAdded] = useState(false);

  useEffect(() => {
    if (!justAdded) return;
    const t = setTimeout(() => setJustAdded(false), 1600);
    return () => clearTimeout(t);
  }, [justAdded]);

  const addToCart = () => {
    setCartCount((c) => c + 1);
    setJustAdded(true);
  };

  return (
    <article className="group relative w-full rounded-[32px] bg-white p-3 ring-1 ring-[#f1e4de] shadow-[0_12px_32px_-16px_rgba(137,86,90,0.35)] transition duration-500 hover:-translate-y-1.5 hover:shadow-[0_28px_50px_-18px_rgba(233,79,125,0.45)]">
      {/* Image */}
      <div className="relative aspect-[4/4.2] overflow-hidden rounded-[24px] bg-[#fbe9e4]">
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-110"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#4a1f2b]/40 via-transparent to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />

        {badge && (
          <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-[#89565a] backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-[#e94f7d]" />
            {badge}
          </span>
        )}

        <button
          onClick={() => setIsFavorite(!isFavorite)}
          aria-label="Toggle favorite"
          aria-pressed={isFavorite}
          className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 backdrop-blur transition duration-200 hover:scale-110 active:scale-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#e94f7d]"
        >
          <svg
            viewBox="0 0 24 24"
            fill={isFavorite ? "#e94f7d" : "none"}
            stroke={isFavorite ? "#e94f7d" : "#333"}
            strokeWidth="1.7"
            className={`h-[18px] w-[18px] transition duration-300 ${isFavorite ? "scale-110" : ""}`}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z"
            />
          </svg>
        </button>

        {/* Slide-up hint on hover */}
        <div className="absolute inset-x-3 bottom-3 translate-y-3 rounded-2xl bg-white/90 px-4 py-2.5 text-center text-xs font-medium text-[#292524] opacity-0 backdrop-blur transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          {benefit}
        </div>

        {cartCount > 0 && (
          <span className="absolute bottom-3 left-3 flex h-7 min-w-7 items-center justify-center rounded-full bg-[#292524] px-2 text-xs font-semibold text-white group-hover:opacity-0">
            {cartCount}
          </span>
        )}
      </div>

      {/* Details */}
      <div className="px-3 pb-3 pt-4">
        <div className="flex items-center justify-between text-xs text-[#817874]">
          <span>{category}</span>
          <span className="flex items-center gap-1">
            <span className="text-[#ff9f24]">★</span>
            <b className="font-semibold text-[#292524]">{rating}</b>
            <span>({reviews})</span>
          </span>
        </div>

        <h3 className="mt-1.5 text-[17px] font-semibold leading-snug tracking-tight text-[#292524]">
          {name}
        </h3>

        {/* Size picker */}
        <div className="mt-3 flex gap-2" role="radiogroup" aria-label="Size">
          {options.map((o, i) => (
            <button
              key={o.label}
              role="radio"
              aria-checked={size === i}
              onClick={() => setSize(i)}
              className={`rounded-full px-3 py-1 text-xs font-medium transition ${
                size === i
                  ? "bg-[#292524] text-white"
                  : "bg-[#f7efeb] text-[#817874] hover:bg-[#f1e4de]"
              }`}
            >
              {o.label}
            </button>
          ))}
        </div>

        {/* Price + Add */}
        <div className="mt-4 flex items-center justify-between gap-3">
          <span className="text-2xl font-semibold tracking-tight text-[#292524]">
            ${options[size].price}
          </span>

          <button
            onClick={addToCart}
            className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium text-white shadow-lg transition duration-300 active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e94f7d] ${
              justAdded
                ? "bg-[#3f9b6e] shadow-[#3f9b6e]/30"
                : "bg-[#e94f7d] shadow-[#e94f7d]/30 hover:bg-[#d93d6c]"
            }`}
          >
            {justAdded ? (
              <>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" className="h-4 w-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m5 13 4 4L19 7" />
                </svg>
                Added
              </>
            ) : (
              <>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 7h12l-1 12H7L6 7Zm3 0a3 3 0 0 1 6 0" />
                </svg>
                Add to cart
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
}