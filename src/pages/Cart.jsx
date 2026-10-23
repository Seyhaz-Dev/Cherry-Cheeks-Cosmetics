
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Cart() {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    clearCart,
    subtotal,
  } = useCart();

  return (
    <div className="min-h-screen bg-[#fffaf8] px-4 py-10 md:px-10">
      <div className="mx-auto max-w-5xl">
        <h1 className="mb-2 text-3xl font-bold text-gray-900">
          Shopping Cart
        </h1>

        <p className="mb-8 text-gray-500">
          Your Cherry Cheeks beauty essentials.
        </p>

        {cartItems.length === 0 ? (
          <div className="rounded-2xl bg-white p-10 text-center shadow-sm">
            <h2 className="mb-3 text-xl font-semibold">
              Your cart is empty
            </h2>

            <p className="mb-6 text-gray-500">
              Discover your favorite skincare products.
            </p>

            <Link
              to="/"
              className="inline-block rounded-full bg-pink-600 px-6 py-3 text-white hover:bg-pink-700"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-3">
            <div className="space-y-4 md:col-span-2">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 rounded-2xl bg-white p-4 shadow-sm"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-28 w-24 rounded-xl object-cover"
                  />

                  <div className="flex flex-1 flex-col">
                    <h2 className="font-semibold text-gray-900">
                      {item.name}
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                      {item.category}
                    </p>

                    <p className="mt-2 font-semibold text-pink-600">
                      ${Number(item.price).toFixed(2)}
                    </p>

                    <div className="mt-auto flex items-center justify-between pt-3">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className="h-8 w-8 rounded-full border"
                          aria-label="Decrease quantity"
                        >
                          −
                        </button>

                        <span>{item.quantity}</span>

                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="h-8 w-8 rounded-full border"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-sm text-red-500 hover:text-red-700"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              <button
                onClick={clearCart}
                className="text-sm text-gray-500 underline hover:text-red-500"
              >
                Clear Cart
              </button>
            </div>

            <div className="h-fit rounded-2xl bg-white p-6 shadow-sm">
              <h2 className="mb-5 text-xl font-semibold">
                Order Summary
              </h2>

              <div className="mb-4 flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>

              <div className="mb-5 flex justify-between border-t pt-4 font-bold">
                <span>Total</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>

              <button
                onClick={() => alert("Checkout coming soon!")}
                className="w-full rounded-full bg-pink-600 px-5 py-3 text-white hover:bg-pink-700"
              >
                Proceed to Checkout
              </button>

              <Link
                to="/"
                className="mt-4 block text-center text-sm text-gray-500 hover:text-pink-600"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
