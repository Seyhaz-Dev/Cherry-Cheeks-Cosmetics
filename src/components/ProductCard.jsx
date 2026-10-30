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
  stockQuantity = 20, // missing value = in stock
}) {
  const [isFavorite, setIsFavorite] = useState(false);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const soldOut = stockQuantity <= 0;
  const lowStock = stockQuantity > 0 && stockQuantity <= 10;

  const handleAddToCart = () => {
    if (id === undefined || id === null) {
      console.error(`Product "${name}" needs a unique id.`);
      return;
    }
    if (soldOut) return;

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
    <article className="group flex h-full w-full min-w-0 flex-col font-sans text-[#4A001F]">
      {/* Image */}
      <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-[#FDF5FA]">
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
            className={`h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03] ${
              soldOut ? "opacity-50" : ""
            }`}
          />
        </button>

        {/* Favorite */}
        <button
          type="button"
          onClick={() => setIsFavorite((previous) => !previous)}
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          aria-pressed={isFavorite}
          className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 transition hover:bg-white"
        >
          <svg
            viewBox="0 0 24 24"
            fill={isFavorite ? "#E7567E" : "none"}
            stroke={isFavorite ? "#E7567E" : "#4A001F"}
            strokeWidth="1.8"
            className="h-4 w-4"
            aria-hidden="true"
          >
            <path
              d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      {/* Details */}
      <div className="flex flex-1 flex-col pt-3">
        <p className="truncate text-xs text-[#a18491]">{category}</p>

        <button
          type="button"
          onClick={handleProductClick}
          className="mt-0.5 line-clamp-2 text-left text-sm font-medium leading-5 transition-colors hover:text-[#E7567E] sm:text-base"
        >
          {name}
        </button>

        {/* Price + rating */}
        <div className="mt-1.5 flex items-center justify-between">
          <p className="text-base font-semibold">${Number(price).toFixed(2)}</p>
          <p className="flex items-center gap-1 text-xs text-[#817874]">
            <span className="text-amber-400" aria-hidden="true">
              ★
            </span>
            {Number(rating).toFixed(1)}
            {Number(reviews) > 0 && ` (${reviews})`}
          </p>
        </div>

        {/* Stock status */}
        <p
          className={`mt-2 flex items-center gap-1.5 text-xs font-medium ${
            soldOut
              ? "text-red-600"
              : lowStock
              ? "text-amber-600"
              : "text-emerald-600"
          }`}
        >
          <span
            className={`h-1.5 w-1.5 rounded-full ${
              soldOut
                ? "bg-red-500"
                : lowStock
                ? "bg-amber-500"
                : "bg-emerald-500"
            }`}
            aria-hidden="true"
          />
          {soldOut
            ? "Out of stock"
            : lowStock
            ? `Only ${stockQuantity} left`
            : `In stock (${stockQuantity})`}
        </p>

        {/* Add to cart */}
        <button
          type="button"
          onClick={handleAddToCart}
          disabled={soldOut}
          className="mt-3 flex w-full items-center justify-center gap-2 rounded-full bg-[#E7567E] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#d94770] active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400"
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
          {soldOut ? "Out of Stock" : "Add to Cart"}
        </button>
      </div>
    </article>
  );
}