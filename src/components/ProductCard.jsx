
import { useState } from "react";
import productImage from "../assets/productcard.png";

export default function ProductCard() {
  const [isFavorite, setIsFavorite] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  return (
    <div className="w-full max-w-[280px] overflow-hidden rounded-2xl bg-white font-sans text-[#4A001F] shadow-md transition-shadow duration-300 hover:shadow-lg">

      {/* Product Image */}
      <div className="relative h-[175px] w-full overflow-hidden">
        <img
          src={productImage}
          alt="Dewdrop Renewal Serum"
          className="h-full w-full object-cover"
        />

        {/* Bestseller Badge */}
        <span className="absolute left-3 top-3 rounded-full bg-[#FDF5FA] px-3 py-1 text-[11px] font-medium text-[#4A001F]">
          Bestseller
        </span>

        {/* Favorite Button */}
        <button
          onClick={() => setIsFavorite(!isFavorite)}
          aria-label="Toggle favorite"
          aria-pressed={isFavorite}
          className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-sm transition-transform hover:scale-105"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill={isFavorite ? "#E7567E" : "none"}
            stroke={isFavorite ? "#E7567E" : "#4A001F"}
            strokeWidth="1.7"
            className="h-4 w-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z"
            />
          </svg>
        </button>
      </div>

      {/* Product Details */}
      <div className="px-4 pb-4 pt-3">
        <p className="text-xs text-[#817874]">
          Serum
        </p>

        <div className="mt-1 flex items-start justify-between gap-2">
          {/* Product Name */}
          <h4 className="text-sm font-semibold leading-snug tracking-tight text-[#4A001F]">
            Dewdrop Renewal Serum
          </h4>

          {/* Product Price */}
          <span className="shrink-0 text-sm font-semibold text-[#4A001F]">
            $68
          </span>
        </div>

        {/* Product Rating */}
        <div className="mt-2 flex items-center gap-2">
          <div className="flex text-sm leading-none text-[#E7567E]">
            {"★★★★★".split("").map((star, index) => (
              <span key={index}>{star}</span>
            ))}
          </div>

          <span className="text-xs text-[#817874]">
            4.9 (218)
          </span>
        </div>

        {/* Add to Cart */}
        <button
          onClick={() => setCartCount(cartCount + 1)}
          className="mt-3 w-full rounded-xl bg-[#E7567E] px-3 py-2 text-sm font-medium text-white shadow-sm transition-colors duration-200 hover:bg-[#d94770] active:scale-[0.98]"
        >
          {cartCount > 0
            ? `Added to cart (${cartCount})`
            : "Add to cart"}
        </button>
      </div>
    </div>
  );
}
