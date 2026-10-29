
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import productImage from "../assets/productcard.png";
import { useCart } from "../context/CartContext";

export default function ProductCard({
  id,
  image = productImage,
  name = "Beauty Product",
  category = "Skincare",
  price = 0,
  rating = 4.8,
  reviews = 0,
  stockQuantity = 0,
}) {
  const [isFavorite, setIsFavorite] = useState(false);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = () => {
    if (id === undefined || id === null) {
      console.error(`Product "${name}" needs a unique id.`);
      return;
    }

    if (stockQuantity <= 0) {
      return;
    }

    addToCart({
      id,
      name,
      category,
      price: Number(price),
      image,
    });
  };

  const handleProductClick = () => {
    if (id !== undefined && id !== null) {
      navigate(`/product/${id}`);
    }
  };

  return (
    <article className="group flex h-full w-full min-w-0 flex-col overflow-hidden rounded-2xl border border-[#f4e5eb] bg-white font-sans text-[#4A001F] shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      {/* Product Image */}
      <div className="relative aspect-[4/4.5] w-full overflow-hidden bg-[#FDF5FA]">
        <button
          type="button"
          onClick={handleProductClick}
          className="h-full w-full cursor-pointer"
          aria-label={`View ${name}`}
        >
          <img
            src={image || productImage}
            alt={name}
            loading="lazy"
            onError={(event) => {
              event.currentTarget.onerror = null;
              event.currentTarget.src = productImage;
            }}
            className="h-full w-full object-cover p-3 transition-transform duration-500 group-hover:scale-105 sm:p-5"
          />
        </button>

        {/* Category Badge */}
        <span className="absolute left-2 top-2 max-w-[65%] truncate rounded-full bg-white/90 px-3 py-1 text-[10px] font-medium text-[#4A001F] shadow-sm sm:left-3 sm:top-3 sm:text-xs">
          {category}
        </span>

        {/* Favorite Button */}
        <button
          type="button"
          onClick={() => setIsFavorite((previous) => !previous)}
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          aria-pressed={isFavorite}
          className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-sm transition hover:scale-110 sm:right-3 sm:top-3 sm:h-9 sm:w-9"
        >
          <svg
            viewBox="0 0 24 24"
            fill={isFavorite ? "#E7567E" : "none"}
            stroke={isFavorite ? "#E7567E" : "#4A001F"}
            strokeWidth="1.7"
            className="h-4 w-4 sm:h-5 sm:w-5"
            aria-hidden="true"
          >
            <path
              d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {stockQuantity > 0 && stockQuantity <= 10 && (
          <span className="absolute bottom-2 left-2 rounded-md bg-amber-100 px-2 py-1 text-[10px] font-semibold text-amber-800 sm:bottom-3 sm:left-3 sm:text-xs">
            Low Stock
          </span>
        )}

        {stockQuantity <= 0 && (
          <span className="absolute bottom-2 left-2 rounded-md bg-gray-800 px-2 py-1 text-[10px] font-semibold text-white sm:bottom-3 sm:left-3 sm:text-xs">
            Sold Out
          </span>
        )}
      </div>

      {/* Product Details */}
      <div className="flex flex-1 flex-col p-3 sm:p-4">
        <p className="text-[10px] uppercase tracking-wider text-[#a18491] sm:text-xs">
          Cherry Cheeks
        </p>

        <button
          type="button"
          onClick={handleProductClick}
          className="mt-1 line-clamp-2 min-h-[2.5rem] text-left text-sm font-semibold leading-5 transition-colors hover:text-[#E7567E] sm:text-base"
        >
          {name}
        </button>

        {/* Rating */}
        <div className="mt-2 flex flex-wrap items-center gap-1.5">
          <span className="text-sm leading-none text-amber-400" aria-hidden="true">
            ★★★★★
          </span>

          <span className="text-xs text-[#817874]">
            {Number(rating).toFixed(1)}
            {Number(reviews) > 0 && ` (${reviews})`}
          </span>
        </div>

        {/* Price and Add to Cart */}
        <div className="mt-auto pt-4">
          <p className="text-base font-bold text-[#4A001F] sm:text-lg">
            ${Number(price).toFixed(2)}
          </p>

          <button
            type="button"
            onClick={handleAddToCart}
            disabled={stockQuantity <= 0}
            className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-[#E7567E] px-2 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-[#d94770] active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-gray-300 sm:text-sm"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              className="h-4 w-4"
              aria-hidden="true"
            >
              <path
                d="M3 3h2l2.2 11.2a2 2 0 0 0 2 1.6h7.9a2 2 0 0 0 2-1.6L21 7H6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="10" cy="20" r="1" />
              <circle cx="18" cy="20" r="1" />
            </svg>

            {stockQuantity <= 0 ? "Out of Stock" : "Add to Cart"}
          </button>
        </div>
      </div>
    </article>
  );
}
