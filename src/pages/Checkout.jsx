import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useCustomers } from '../context/CustomerContext'
import { useOrders } from '../context/OrderContext'

const PAYMENT_METHODS = [
  {
    id: 'aba',
    name: 'ABA Pay',
    description: 'Pay using ABA Mobile.',
    logo: '',
  },
  {
    id: 'cash',
    name: 'Cash on Delivery',
    description: 'Pay when your order arrives.',
    logo: '',
  },
]

export default function Checkout() {
  const navigate = useNavigate();

  const { cartItems = [], subtotal, clearCart } = useCart();
  const { addOrder } = useOrders();
  const { recordOrder } = useCustomers();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    paymentMethod: "aba",
  });

  const [logoErrors, setLogoErrors] = useState({});

  const calculatedSubtotal = cartItems.reduce((total, item) => {
    const price = Number(item.price ?? item.product?.price ?? 0);
    const quantity = Number(item.quantity ?? 1);

    return total + price * quantity;
  }, 0);

  const subtotalAmount =
    typeof subtotal === "number" ? subtotal : calculatedSubtotal;
  const shipping = subtotalAmount > 0 ? 2 : 0;
  const total = subtotalAmount + shipping;

  const selectedPayment = PAYMENT_METHODS.find(
    (method) => method.id === formData.paymentMethod
  );

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const formatPrice = (price) =>
    `$${Number(price || 0).toFixed(2)}`;

  const getProductName = (item) =>
    item.name || item.product?.name || item.title || "Beauty Product";

  const getProductImage = (item) =>
    item.image || item.product?.image || item.productImage || "";

  const getProductPrice = (item) =>
    Number(item.price ?? item.product?.price ?? 0);

  const getProductQuantity = (item) =>
    Number(item.quantity ?? 1);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (cartItems.length === 0) {
      return;
    }

    const newOrder = {
      orderNumber: `CC-${Date.now().toString().slice(-8)}`,
      customer: { ...formData },
      items: [...cartItems],
      subtotal: subtotalAmount,
      shipping,
      total,
      paymentMethod: formData.paymentMethod,
      paymentStatus: "Awaiting Payment",
      orderDate: new Date().toISOString(),
    };

    try {
      // Send the order to Order Management (admin page)
      const adminOrder = addOrder({
        customer: formData.fullName,
        cartItems: cartItems.map((item) => ({
          name: getProductName(item),
          price: getProductPrice(item),
          quantity: getProductQuantity(item),
        })),
        total,
        payment: "Unpaid",
      });

      // Add or update the customer in Customer Management (admin page)
      recordOrder({
        name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        total,
      });

      const existingOrders = JSON.parse(
        localStorage.getItem("cherryCheeksOrders") || "[]"
      );

      localStorage.setItem(
        "cherryCheeksOrders",
        JSON.stringify([...existingOrders, newOrder])
      );

      // Navigate to the successful order page.
      navigate("/order-success", {
        state: { order: newOrder, orderId: adminOrder.id },
      });

      // Clear the cart after successfully saving the order.
      if (typeof clearCart === "function") {
        clearCart();
      }
    } catch (error) {
      console.error("Unable to save order:", error);
      alert("Unable to save your order. Please try again.");
    }
  };
  
  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div>
          

          <div className=" flex items-center gap-3 text-sm text-gray-500">
            <Link
              to="/cart"
              className="transition hover:text-pink-600"
            >
              Cart
            </Link>

            <span>/</span>

            <span className="font-semibold text-pink-600">
              Checkout
            </span>
          </div>

          <h1 className="mt-5 text-3xl font-bold text-gray-900 sm:text-4xl">
            Checkout
          </h1>

          <p className="mt-2 text-gray-500">
            Complete your details and choose your payment method.
          </p>
        </div>

        {cartItems.length === 0 ? (
          <div className="rounded-3xl bg-white px-6 py-16 text-center shadow-sm">
            <div className="mb-4 text-5xl">🛍️</div>

            <h2 className="text-2xl font-bold text-gray-900">
              Your cart is empty
            </h2>

            <p className="mt-2 text-gray-500">
              Add some beauty products before checking out.
            </p>

            <Link
              to="/shop"
              className="mt-6 inline-flex rounded-full bg-pink-600 px-7 py-3 font-semibold text-white transition hover:bg-pink-700"
            >
              Explore Products
            </Link>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 items-start gap-8 lg:grid-cols-3"
          >
            {/* Customer Information */}
            <div className="space-y-8 lg:col-span-2">
              <section className="rounded-2xl bg-white p-5 shadow-sm sm:p-8">
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-pink-100 font-bold text-pink-600">
                    1
                  </div>

                  <div>
                    <h2 className="text-xl font-bold text-gray-900">
                      Customer Information
                    </h2>
                    <p className="text-sm text-gray-500">
                      Enter your contact details.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="fullName"
                      className="mb-2 block text-sm font-semibold text-gray-700"
                    >
                      Full Name *
                    </label>

                    <input
                      id="fullName"
                      name="fullName"
                      type="text"
                      autoComplete="name"
                      placeholder="Enter your full name"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                      className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition placeholder:text-gray-400 focus:border-pink-500 focus:ring-2 focus:ring-pink-100"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="mb-2 block text-sm font-semibold text-gray-700"
                    >
                      Email Address *
                    </label>

                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition placeholder:text-gray-400 focus:border-pink-500 focus:ring-2 focus:ring-pink-100"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="mb-2 block text-sm font-semibold text-gray-700"
                    >
                      Phone Number *
                    </label>

                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      placeholder="Enter your phone number"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition placeholder:text-gray-400 focus:border-pink-500 focus:ring-2 focus:ring-pink-100"
                    />
                  </div>
                </div>
              </section>

              {/* Shipping Address */}
              <section className="rounded-2xl bg-white p-5 shadow-sm sm:p-8">
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-pink-100 font-bold text-pink-600">
                    2
                  </div>

                  <div>
                    <h2 className="text-xl font-bold text-gray-900">
                      Shipping Address
                    </h2>
                    <p className="text-sm text-gray-500">
                      Where should we deliver your order?
                    </p>
                  </div>
                </div>

                <div className="space-y-5">
                  <div>
                    <label
                      htmlFor="address"
                      className="mb-2 block text-sm font-semibold text-gray-700"
                    >
                      Street Address *
                    </label>

                    <textarea
                      id="address"
                      name="address"
                      autoComplete="street-address"
                      placeholder="House number, street, village..."
                      value={formData.address}
                      onChange={handleChange}
                      required
                      rows={3}
                      className="w-full resize-y rounded-xl border border-gray-200 px-4 py-3 outline-none transition placeholder:text-gray-400 focus:border-pink-500 focus:ring-2 focus:ring-pink-100"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="city"
                      className="mb-2 block text-sm font-semibold text-gray-700"
                    >
                      City / Province *
                    </label>

                    <input
                      id="city"
                      name="city"
                      type="text"
                      autoComplete="address-level2"
                      placeholder="e.g. Phnom Penh"
                      value={formData.city}
                      onChange={handleChange}
                      required
                      className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition placeholder:text-gray-400 focus:border-pink-500 focus:ring-2 focus:ring-pink-100"
                    />
                  </div>
                </div>
              </section>

              {/* Payment Method */}
              <section className="rounded-2xl bg-white p-5 shadow-sm sm:p-8">
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-pink-100 font-bold text-pink-600">
                    3
                  </div>

                  <div>
                    <h2 className="text-xl font-bold text-gray-900">
                      Payment Method
                    </h2>
                    <p className="text-sm text-gray-500">
                      Select your preferred payment method.
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  {PAYMENT_METHODS.map((method) => (
                    <label
                      key={method.id}
                      className={`flex cursor-pointer items-center gap-4 rounded-2xl border p-4 transition ${
                        formData.paymentMethod === method.id
                          ? "border-pink-500 bg-pink-50 ring-1 ring-pink-200"
                          : "border-gray-200 hover:border-pink-300"
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={method.id}
                        checked={formData.paymentMethod === method.id}
                        onChange={handleChange}
                        className="h-4 w-4 shrink-0 accent-pink-600"
                      />

                      <div className="flex h-12 w-20 shrink-0 items-center justify-center">
                        {method.logo && !logoErrors[method.id] ? (
                          <img
                            src={method.logo}
                            alt={`${method.name} logo`}
                            onError={() =>
                              setLogoErrors((previous) => ({
                                ...previous,
                                [method.id]: true,
                              }))
                            }
                            className="max-h-full max-w-full object-contain"
                          />
                        ) : (
                          <span className="text-center text-xs font-bold text-gray-400">
                            {method.name}
                          </span>
                        )}
                      </div>

                      <div className="min-w-0 flex-1">
                        <h3 className="font-semibold text-gray-900">
                          {method.name}
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">
                          {method.description}
                        </p>
                      </div>

                      {formData.paymentMethod === method.id && (
                        <span className="font-bold text-pink-600">
                          ✓
                        </span>
                      )}
                    </label>
                  ))}
                </div>

                <div className="mt-5 rounded-xl bg-gray-50 p-4 text-sm text-gray-600">
                  <p className="font-semibold text-gray-800">
                    Selected: {selectedPayment?.name}
                  </p>
                  <p className="mt-1">
                    Payment is not processed by this demo checkout.
                  </p>
                </div>
              </section>
            </div>

            {/* Order Summary */}
            <aside className="rounded-2xl bg-white p-5 shadow-sm sm:p-8 lg:sticky lg:top-6">
              <h2 className="text-xl font-bold text-gray-900">
                Order Summary
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                {cartItems.length} product type(s) in your cart
              </p>

              <div className="mt-6 max-h-80 space-y-5 overflow-y-auto">
                {cartItems.map((item, index) => {
                  const image = getProductImage(item);
                  const name = getProductName(item);
                  const quantity = getProductQuantity(item);
                  const price = getProductPrice(item);

                  return (
                    <div
                      key={item.id ?? item.product?.id ?? index}
                      className="flex gap-3"
                    >
                      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-pink-50">
                        {image ? (
                          <img
                            src={image}
                            alt={name}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center text-2xl">
                            💄
                          </div>
                        )}

                        <span className="absolute right-1 top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-pink-600 px-1 text-xs font-bold text-white">
                          {quantity}
                        </span>
                      </div>

                      <div className="min-w-0 flex-1">
                        <h3 className="line-clamp-2 text-sm font-semibold text-gray-900">
                          {name}
                        </h3>

                        <p className="mt-1 text-sm text-gray-500">
                          Qty: {quantity}
                        </p>

                        <p className="mt-2 font-semibold text-pink-600">
                          {formatPrice(price * quantity)}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="my-6 border-t border-gray-100" />

              <div className="space-y-3 text-sm">
                <div className="flex justify-between gap-4 text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-medium text-gray-900">
                    {formatPrice(subtotalAmount)}
                  </span>
                </div>

                <div className="flex justify-between gap-4 text-gray-600">
                  <span>Shipping</span>
                  <span className="font-medium text-gray-900">
                    {shipping === 0 ? "Free" : formatPrice(shipping)}
                  </span>
                </div>
              </div>

              <div className="my-5 border-t border-gray-100" />

              <div className="flex items-center justify-between gap-4">
                <span className="text-lg font-bold text-gray-900">
                  Total
                </span>

                <span className="text-2xl font-bold text-pink-600">
                  {formatPrice(total)}
                </span>
              </div>

              <button
                type="submit"
                className="mt-7 w-full rounded-full bg-pink-600 px-6 py-4 font-semibold text-white shadow-sm transition hover:bg-pink-700 focus:outline-none focus:ring-4 focus:ring-pink-200"
              >
                Place Order
              </button>

              <p className="mt-4 text-center text-xs leading-5 text-gray-500">
                Please check your information before placing your order.
              </p>

              <Link
                to="/cart"
                className="mt-5 block text-center text-sm font-semibold text-gray-600 transition hover:text-pink-600"
              >
                ← Return to Cart
              </Link>
            </aside>
          </form>
        )}
      </div>
    </main>
  );
}
