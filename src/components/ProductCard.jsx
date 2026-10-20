import { useState } from "react";
import productImage from "../assets/productcard.png";

export default function ProductCard({
  name = "Dewdrop Renewal Serum",
  category = "FACE SERUM",
  description = "Hydrate, nourish & reveal your natural glow.",
  price = 68,
  rating = 4.9,
  reviews = 218,
  image = productImage,
  badge = "BESTSELLER",
  sizes,
}) {
  const productSizes = sizes || [
    { label: "30 ml", price: Math.round(price * 0.7) },
    { label: "50 ml", price },
  ];

  const [favorite, setFavorite] = useState(false);
  const [selectedSize, setSelectedSize] = useState(
    productSizes.length - 1
  );
  const [added, setAdded] = useState(false);

  return (
    <article className="group w-full max-w-[220px] overflow-hidden rounded-xl border border-[#FDF5FA] bg-white transition hover:-translate-y-1 hover:shadow-md">
      {/* Product Image */}
      <div className="relative m-1.5 overflow-hidden rounded-lg bg-[#FDF5FA]">
        <img
          src={image}
          alt={name}
          className="aspect-square w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {badge && (
          <span className="absolute left-2 top-2 rounded-full bg-white px-2 py-1 text-[8px] font-semibold tracking-wide text-[var(--color-pink-text)]">
            {badge}
          </span>
        )}

        <button
          type="button"
          onClick={() => setFavorite(!favorite)}
          aria-label="Toggle favorite"
          aria-pressed={favorite}
          className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-white text-base text-[var(--color-pink-text)]"
        >
          {favorite ? "♥" : "♡"}
        </button>

        <div className="absolute bottom-2 left-2 flex items-center gap-1 rounded-full bg-white/95 px-2 py-1 text-[9px]">
          <span className="text-amber-500">★</span>
          <span className="font-medium">{rating}</span>
          <span className="text-gray-400">({reviews})</span>
        </div>
      </div>

      {/* Product Information */}
      <div className="px-2.5 pb-3 pt-1">
        <p className="text-[8px] font-semibold tracking-[1px] text-[var(--color-pink-text)]">
          {category}
        </p>

        <h3 className="mt-1.5 line-clamp-2 text-sm font-medium leading-snug text-[#4A001F]">
          {name}
        </h3>

        <p className="mt-1 line-clamp-2 min-h-[30px] text-[10px] leading-[15px] text-gray-500">
          {description}
        </p>

        {/* Size Selection */}
        <div className="mt-2.5 flex gap-1.5">
          {productSizes.map((item, index) => (
            <button
              key={item.label}
              type="button"
              onClick={() => setSelectedSize(index)}
              aria-pressed={selectedSize === index}
              className={`rounded-full border px-2.5 py-1 text-[9px] transition ${
                selectedSize === index
                  ? "border-[var(--color-button)] bg-[var(--color-button)] text-white"
                  : "border-[#F5DCE8] text-[#4A001F] hover:border-[var(--color-button)]"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Price and Button */}
        <div className="mt-3 flex items-center justify-between gap-1.5 border-t border-[#FDF5FA] pt-2.5">
          <div>
            <p className="text-[8px] text-gray-400">PRICE</p>
            <p className="text-sm font-semibold text-[#4A001F]">
              ${Number(productSizes[selectedSize].price).toFixed(2)}
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              setAdded(true);
              setTimeout(() => setAdded(false), 1500);
            }}
            className={`rounded-full px-3 py-2 text-[9px] font-medium text-white transition ${
              added
                ? "bg-green-700"
                : "bg-[var(--color-button)] hover:opacity-80"
            }`}
          >
            {added ? "✓ Added" : "+ Add"}
          </button>
        </div>
      </div>
    </article>
  );
}
