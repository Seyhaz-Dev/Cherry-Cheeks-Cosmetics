import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTruck } from "@fortawesome/free-solid-svg-icons";
import { faBagShopping } from "@fortawesome/free-solid-svg-icons";
import { useCart } from "../context/CartContext";

import cleanserImage from "../assets/cleanser.png";
import serumImage from "../assets/glow-serum.png";
import sunscreenImage from "../assets/productcard.png";
import moisturizerImage from "../assets/moisture-essence.png";
import lipTintImage from "../assets/productcard1.png";
import blushImage from "../assets/cream-balm.png";
import foundationImage from "../assets/product200.png";
import shampooImage from "../assets/productcard.png";
import conditionerImage from "../assets/night-cream.png";
import perfumeImage from "../assets/Dewy.png";
import bodyLotionImage from "../assets/cream-balm.png";
import handCreamImage from "../assets/peony-toner.png";

const productImages = {
  101: cleanserImage,
  102: serumImage,
  103: sunscreenImage,
  104: moisturizerImage,
  201: lipTintImage,
  202: blushImage,
  203: foundationImage,
  301: shampooImage,
  302: conditionerImage,
  401: perfumeImage,
  501: bodyLotionImage,
  502: handCreamImage,
};

const TEXTCHECK = [
  "Deeply hydrates for up to 48 hours",
  "Supports a stronger skin barrier",
  "Softens the look of fine dehydration lines",
];

const ITEMS = [
  {
    title: "How to use",
    body: "Apply 2–3 drops to clean skin, morning and night, before moisturizer.",
  },
  {
    title: "Ingredients",
    body: "Water, glycerin, rice ferment filtrate, ectoin, peony root extract...",
  },
  {
    title: "Shipping & returns",
    body: "Complimentary shipping over $75. Returns accepted within 30 days.",
  },
];

const FORMULA = [
  {
    name: "Rice ferment",
    description: "Amino acid-rich hydration and luminous softness.",
  },
  {
    name: "Peony root",
    description: "Antioxidant care for calm, even-looking skin.",
  },
  {
    name: "Ectoin",
    description: "A resilient moisture shield against daily stress.",
  },
];

const REVIEWS = [
  {
    name: "Eunji M",
    rating: 4.9,
    title: "A glass-skin staple",
    body: "Hydrating without stickiness. After three weeks my skin looks noticeably calmer and more even.",
  },
  {
    name: "Anna R",
    rating: 4.9,
    title: "Beautiful texture",
    body: "It layers perfectly under sunscreen and makeup. I already ordered a second bottle.",
  },
];

function ProductDetail() {
    const { id } = useParams();
    const { addToCart } = useCart();
    const navigate = useNavigate();

    const handleAddToBag = () => {
    addToCart(
        {
        ...product,
        image: productImages[product.id],
        },
        count
    );

    alert("Product added to your bag!");
    };

    const handleBuyNow = () => {
    addToCart(
        {
        ...product,
        image: productImages[product.id],
        },
        count
    );

    navigate("/cart");
    };

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    const [count, setCount] = useState(1);
    const [openIndex, setOpenIndex] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    
    const mainImage = selectedImage || productImages[product?.id];  

    useEffect(() => {
    async function getProducts() {
        const response = await fetch("/student-data/products.json");
        const data = await response.json();

        const selectedProduct = data.find(
        (item) => String(item.id) === id
        );

        setProduct(selectedProduct || null);
        setSelectedImage(null);
        setLoading(false);
    }

    getProducts();
    }, [id]);

    if (loading) {
    return <p className="p-8">Loading product...</p>;
    }

    if (!product) {
    return <p className="p-8">Product not found.</p>;
    }
  return (
    <section className="bg-[var(--color-background)]">
        <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-8 px-4 py-4 sm:px-6 sm:py-6 lg:grid-cols-2 lg:gap-12 lg:py-10">
            <div className="flex w-full flex-col">
                <p className="text-sm sm:text-base">
                    Shop / <span className="font-bold">{product.name}</span>
                </p>
                <img
                    className="mt-4 h-[400px] w-full rounded-4xl object-contain sm:h-[500px] lg:h-[600px]"
                    src={mainImage}
                    alt={product.name}
                />
                <div className="flex gap-3 pt-3">
                    <button
                        type="button"
                        onClick={() => setSelectedImage(productImages[product.id])}
                        className="h-16 w-16 overflow-hidden rounded-xl border-2 sm:h-20 sm:w-20"
                    >
                        <img
                        src={productImages[product.id]}
                        alt={product.name}
                        className="h-full w-full object-contain"
                        />
                    </button>
                </div>
            </div>

            <div className="flex w-full flex-col gap-4 text-start sm:gap-5 lg:pt-6">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--color-button)]">Serum Bestseller</p>
            <h2 className="text-2xl leading-tight sm:text-3xl lg:text-4xl"> {product.name} </h2>
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                <span className="text-yellow-500">★★★★★</span>
                <p>4.9</p>
                <p className="text-gray-500">184 reviews</p>
            </div>
            <p className="text-xl font-semibold sm:text-2xl"> ${Number(product.price).toFixed(2)} </p>
            <p className="font-bold text-gray-600">
                A cushiony, fast-absorbing serum that floods skin with hydration
                while strengthening the moisture barrier. Rice ferment, ectoin, and
                peony root leave skin visibly calm, plump, and dewy.
            </p>
            <div className="flex flex-col gap-2">
                {TEXTCHECK.map((text) => (
                <h4 key={text} className="flex gap-2">
                    <span>🗸</span>
                    {text}
                </h4>
                ))}
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4 lg:gap-6">
                <div className="flex w-28 shrink-0 items-center justify-between gap-1 rounded-md bg-gray-100 px-2 py-1 sm:w-24">
                <button
                    type="button"
                    className="cursor-pointer rounded-md transition-colors hover:bg-gray-200"
                    onClick={() => setCount((c) => Math.max(1, c - 1))}
                >
                    -
                </button>
                <input
                    type="text"
                    inputMode="numeric"
                    aria-label="Quantity"
                    className="min-w-0 flex-1 text-center outline-none"
                    value={count}
                    onChange={(e) => {
                    const digits = e.target.value.replace(/\D/g, "");
                    setCount(Number(digits) || 1);
                    }}
                />
                <button
                    type="button"
                    className="cursor-pointer rounded-md transition-colors hover:bg-gray-200"
                    onClick={() => setCount((c) => c + 1)}
                >
                    +
                </button>
                </div>
                <button type="button" onClick={handleAddToBag} className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-md bg-[var(--color-button)] px-4 py-3 transition hover:opacity-80 sm:w-auto sm:flex-1 sm:py-2 lg:max-w-xs">
                    <FontAwesomeIcon
                        icon={faBagShopping}
                        style={{ fontSize: "16px", color: "white" }}
                    />

                    <p className="font-bold text-[var(--color-white-text)]">
                        Add to bag ${(Number(product.price) * count).toFixed(2)}
                    </p>
                </button>
            </div>
            <button type="button" onClick={handleBuyNow} className="flex w-full cursor-pointer items-center justify-center rounded-md border border-[var(--color-button)] bg-gray-100 px-4 py-3 shadow-[var(--color-button)] transition hover:shadow-xl sm:py-2 lg:max-w-xs">
                <p className="font-bold">Buy now</p>
            </button>
            <div className="flex items-start gap-2 text-sm text-gray-600">
                <FontAwesomeIcon icon={faTruck} className="mt-0.5 shrink-0" style={{ fontSize: "15px" }} />
                <p>Complimentary shipping over $75 · Ships in 1–2 days</p>
            </div>

            <div className="w-full divide-y divide-pink-200 border-y border-pink-200">
                {ITEMS.map((item, i) => {
                const isOpen = openIndex === i;
                return (
                    <div key={item.title}>
                    <button
                        type="button"
                        aria-expanded={isOpen}
                        aria-controls={`panel-${i}`}
                        onClick={() => setOpenIndex(isOpen ? null : i)}
                        className="flex w-full cursor-pointer items-center justify-between py-4 text-left text-sm"
                    >
                        {item.title}
                        <svg
                        className={`h-4 w-4 transition-transform duration-200 ${
                            isOpen ? "rotate-45" : ""
                        }`}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        >
                        <path d="M12 4v16M4 12h16" />
                        </svg>
                    </button>

                    <div
                        id={`panel-${i}`}
                        className={`grid transition-all duration-200 ease-out ${
                        isOpen
                            ? "grid-rows-[1fr] opacity-100"
                            : "grid-rows-[0fr] opacity-0"
                        }`}
                    >
                        <div className="overflow-hidden">
                        <p className="pb-4">{item.body}</p>
                        </div>
                    </div>
                    </div>
                );
                })}
            </div>
            </div>
        </div>

        {/* Inside the formula */}
        <div className="mt-16 grid w-full grid-cols-1 md:mt-20 md:grid-cols-2">
        <img
            src={mainImage}
            alt="Dewy serum formula texture"
            className="h-100 w-full object-cover rounded-xl"
        />

            <div className="flex flex-col justify-center gap-4 bg-white px-6 py-10 sm:px-8 md:h-100 md:py-0 lg:px-16">
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--color-button)]">
                Inside the formula
                </p>
                <h2 className="text-2xl font-semibold leading-tight tracking-tight sm:text-3xl md:text-4xl">
                Botanicals, refined by science.
                </h2>

                <div className="mt-2 flex flex-col gap-4 sm:gap-5">
                {FORMULA.map((item) => (
                    <div key={item.name} className="flex flex-col gap-1">
                    <h4 className="text-sm font-semibold sm:text-base">{item.name}</h4>
                    <p className="text-xs sm:text-sm">{item.description}</p>
                    </div>
                ))}
                </div>
            </div>
        </div>

        {/* Reviews */}
        <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 md:py-16">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex flex-col gap-1">
                <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl md:text-4xl">
                Reviews
                </h2>
                <div className="flex items-center gap-3">
                <span className="text-xl font-medium sm:text-2xl">4.9</span>
                <div className="flex flex-col">
                    <div className="flex items-center gap-2 text-xs text-gray-600">
                    <span className="tracking-widest text-[var(--color-button)]">
                        ★★★★★
                    </span>
                    <span>4.9</span>
                    </div>
                    <p className="text-xs text-gray-600">Based on 184 reviews</p>
                </div>
                </div>
            </div>

            <button
                type="button"
                className="w-fit cursor-pointer rounded-full border border-[var(--color-button)] px-6 py-2 text-sm font-semibold text-[var(--color-button)] transition hover:bg-[var(--color-button)] hover:text-[var(--color-white-text)]"
            >
                Write a review
            </button>
            </div>

            <div className="mt-8 divide-y divide-pink-200 border-t border-pink-200">
            {REVIEWS.map((review) => (
                <article
                key={review.name}
                className="flex flex-col gap-3 py-6 md:flex-row md:gap-10 lg:gap-16"
                >
                <div className="flex flex-col gap-1 md:w-40 md:shrink-0">
                    <p className="text-sm font-semibold">{review.name}</p>
                    <p className="text-xs">✓ Verified buyer</p>
                </div>

                <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2 text-xs ">
                    <span className="tracking-widest text-yellow-500">★★★★★</span>
                    <span>{review.rating}</span>
                    </div>
                    <h3 className="text-base font-semibold sm:text-lg">{review.title}</h3>
                    <p className="text-sm">{review.body}</p>
                </div>
                </article>
            ))}
            </div>
        </div>
    </section>
  );
}

export default ProductDetail;