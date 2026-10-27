
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import productImage from "../assets/productcard.png";
import { useCart } from "../context/CartContext";

export default function ProductCard({
  id,
  image = productImage,
  name = "Dewdrop Renewal Serum",
  category = "Serum",
  price = 68,
  rating = 4.9,
  reviews = 218,
}) {
  
 const [isFavorite, setIsFavorite] = useState(false);
 const { addToCart } = useCart();

 const handleAddToCart = () => {
   if (id === undefined || id === null) {
     console.error(`Product "${name}" needs a unique id.`);
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

  const navigate = useNavigate();

  const handleProductClick = () => {
    navigate(`/product/${id}`);
  };

 return (
   <div className="w-full max-w-[280px] overflow-hidden rounded-2xl bg-white font-sans text-[#4A001F] shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-lg">

     {/* Product Image */}
      <div className="relative h-[20px] w-full overflow-hidden bg-[#FDF5FA] sm:h-[300px]">
        <img
          src={image}
          alt={name}
          onClick={handleProductClick}
          className="h-full w-full cursor-pointer object-contain p-2 transition-transform duration-300 hover:scale-105"
        />

        <span className="absolute left-3 top-3 rounded-full bg-[#FDF5FA] px-3 py-1 text-[11px] font-medium text-[#4A001F]">
          Bestseller
        </span>

        {/* Favorite Button */}
        <button
          type="button"
          onClick={() => setIsFavorite(!isFavorite)}
          aria-label="Toggle favorite"
          aria-pressed={isFavorite}
          className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-sm transition hover:scale-110"
        >
          {/* Keep your existing heart SVG here */}
        </button>
      </div>

     {/* Product Details */}
     <div className="flex flex-col px-4 pb-4 pt-3">
       <p className="text-xs text-[#817874]">
         {category}
       </p>

       <div className="mt-1 flex min-h-[40px] items-start justify-between gap-2">
          <h4 onClick={handleProductClick} className="cursor-pointer" >
            {name}
          </h4>

         <span className="shrink-0 text-sm font-semibold text-[#4A001F]">
           ${Number(price).toFixed(2)}
         </span>
       </div>

       {/* Rating Stars */}
       <div className="mt-2 flex items-center gap-2">
         <div
           className="flex text-sm leading-none text-yellow-400"
           aria-label={`${rating} out of 5 stars`}
         >
           {"★★★★★".split("").map((star, index) => (
             <span key={index}>{star}</span>
           ))}
         </div>

         <span className="text-xs text-[#817874]">
           {rating} ({reviews})
         </span>
       </div>

       {/* Add to Cart */}
       <button
         type="button"
         onClick={handleAddToCart}
         className="mt-4 w-full rounded-xl bg-[#E7567E] px-3 py-2.5 text-sm font-medium text-white transition-colors duration-200 hover:bg-[#d94770] active:scale-[0.98]"
       >
         Add to Cart
       </button>
     </div>
   </div>
 );
}

