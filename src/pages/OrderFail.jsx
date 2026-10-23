import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

function OrderFail() {
  return (
    <section className="min-h-screen w-full bg-[var(--color-background)] font-bold">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-8 sm:px-6 sm:py-10 lg:gap-10 lg:px-8 lg:py-12">
        <div className="flex w-full flex-col items-center gap-6 rounded-xl border border-gray-300 px-5 py-8 text-center sm:flex-row sm:items-start sm:gap-8 sm:px-8 sm:py-10 sm:text-left lg:px-10">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-red-500 sm:h-20 sm:w-20 lg:h-24 lg:w-24">
            <FontAwesomeIcon
              className="text-2xl text-gray-100 sm:text-3xl lg:text-4xl"
              icon={faXmark}
            />
          </div>
          <div className="flex flex-col gap-2 text-red-500">
            <h2>Your cart is currently unavailable.</h2>
            <p>Please check your cart information and try again.</p>
            <div className="mt-2">
              <Link
                to="/cart"
                className="inline-flex items-center justify-center rounded-xl bg-[var(--color-button)] px-5 py-2 text-[var(--color-white-text)] transition hover:opacity-80"
              >
                Try Again
              </Link>
            </div>
          </div>
        </div>

        <div className="flex w-full flex-col gap-6 lg:flex-row lg:justify-between lg:gap-10">
          <div className="flex w-full flex-col gap-6 lg:gap-10">
            <div className="flex w-full flex-col gap-5 rounded-xl border border-gray-300 px-5 py-5 sm:px-8 sm:py-6 lg:px-10">
              <h2>Shipping details</h2>
              <p>
                Maya Johnson <br />
                24 Maple Avenue, Apartment 3 <br />
                Brooklyn, NY 11201, United States
              </p>
              <span>
                Standard shipping / Estimated delivery: October 8–12
              </span>
            </div>

            <div className="flex w-full flex-col gap-5 rounded-xl border border-gray-300 px-5 py-5 sm:px-8 sm:py-6 lg:px-10">
              <h2>Payment confirmation</h2>
              <p>Paid $50.36 with Visa ending in 4242.</p>
            </div>
          </div>

          <div className="flex w-full flex-col gap-5 rounded-xl border border-gray-300 px-5 py-5 sm:px-8 sm:py-6 lg:w-96 lg:shrink-0 lg:px-10">
            <h2>Order summary</h2>
            <div className="flex justify-between">
              <p>Cherry Glow Blush × 1</p>
              <p>$24.00</p>
            </div>
            <div className="flex justify-between">
              <p>Cherry Glow Blush × 1</p>
              <p>$18.00</p>
            </div>
            <hr />
            <div className="flex justify-between">
              <p>Subtotal</p>
              <p>$42.00</p>
            </div>
            <div className="flex justify-between">
              <p>Shipping</p>
              <p>$5.00</p>
            </div>
            <div className="flex justify-between">
              <p>Estimated tax</p>
              <p>$3.36</p>
            </div>
            <span className="flex justify-between text-[18px]">
              <p>Total</p>
              <p>$50.36</p>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default OrderFail;
