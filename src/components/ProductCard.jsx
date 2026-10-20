import { useState } from "react";

export default function ProductCard() {
  const [isFavorite, setIsFavorite] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  return (
    <div className="w-full max-w-[340px] overflow-hidden rounded-[30px] bg-white font-sans shadow-lg ">
      {/* Product Image */}
      <div className="relative h-[230px] w-full overflow-hidden rounded-t-[10px]">
        <img
          src="src/assets/productcard.png" 
          alt="Dewdrop Renewal Serum"
          className="h-full w-full object-cover"
        />

        <span className="absolute left-7 top-7 rounded-full bg-white px-2 py-1  text-[#89565a]">
          Bestseller
        </span>

        <button
          onClick={() => setIsFavorite(!isFavorite)}
          aria-label="Toggle favorite"
          className="absolute right-7 top-7 flex h-8 w-8 items-center justify-center rounded-full bg-white transition hover:scale-100"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill={isFavorite ? "#e84f7d" : "none"}
            stroke={isFavorite ? "#e84f7d" : "#333333"}
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
      <div className="px-7 pb-5 pt-5">
        <p className=" text-sml text-[#817874] ">Serum</p>

        <div className="flex items-center justify-between gap-3">
          <h2 className="text-sml mt-2 font-semibold leading-tight tracking-tight text-[#292524]">
            Dewdrop Renewal Serum
          </h2>

          <span className="shrink-0 text-sml mt-2 font-semibold text-[#292524]">
            $68
          </span>
        </div>

        {/* Product Rating */}
        <div className="mt-2 flex items-center gap-3">
          <div className="flex text-sml leading-none text-[#ff9f24]">
            {"★★★★★".split("").map((star, index) => (
              <span key={index}>{star}</span>
            ))}
          </div>

          <span className="text-lg text-[#817874]">4.9</span>
        </div>

        {/* Add to Cart */}
        <button
          onClick={() => setCartCount(cartCount + 1)}
          className="mt-4 w-full rounded-2xl bg-[#e94f7d] pag-3 py-2 text-sml font-medium text-white shadow-md transition duration-200 hover:bg-[#d93d6c] active:scale-[0.98]"
        >
          {cartCount > 0
            ? `Added to cart (${cartCount})`
            : "Add to cart"}
        </button>
      </div>
    </div>
  );
}