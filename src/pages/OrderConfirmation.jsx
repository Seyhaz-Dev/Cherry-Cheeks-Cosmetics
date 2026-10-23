function OrderConfirmation() {
  return (
    <section className="bg-[#fbf8f5] font-bold">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-4 sm:px-6 sm:py-6 lg:gap-10 lg:py-10">

            <div className="flex w-full flex-col gap-5 rounded-xl border border-gray-300 px-5 py-5 sm:px-8 sm:py-6 lg:px-10">
                <h2 className="text-green-500">✓ Thank you! Your order has been placed.</h2>
                <h4 className="">
                    Order #CC-1048  •  Placed October 5, 2026 <br /><br />
                    A confirmation email has been sent to maya@example.com.
                </h4>
            </div>

            <div className="flex w-full flex-col gap-6 lg:flex-row lg:justify-between lg:gap-10">

                <div className="flex w-full flex-col gap-6 lg:gap-10">

                    <div className="flex w-full flex-col gap-5 rounded-xl border border-gray-300 px-5 py-5 sm:px-8 sm:py-6 lg:px-10">
                        <h2 className="">Shipping details</h2>
                        <p className="">
                            Maya Johnson <br />
                            24 Maple Avenue, Apartment 3 <br />
                            Brooklyn, NY 11201, United States
                        </p>
                        <span className="">Standard shipping / Estimated delivery: October 8–12</span>
                    </div>
                    <div className="flex w-full flex-col gap-5 rounded-xl border border-gray-300 px-5 py-5 sm:px-8 sm:py-6 lg:px-10">
                        <h2>Payment confirmation</h2>
                        <p>Paid $50.36 with Visa ending in 4242.</p>
                    </div>

                </div>

                <div className="flex w-full flex-col gap-5 rounded-xl border border-gray-300 px-5 py-5 sm:px-8 sm:py-6 lg:w-96 lg:shrink-0 lg:px-10">
                    <h2 className="">Order summary</h2>
                    <div className="flex justify-between">
                        <p className="">
                            Cherry Glow Blush × 1
                        </p>
                        <p>
                            $24.00
                        </p>
                    </div>
                    <div className="flex justify-between">
                        <p className="">
                            Cherry Glow Blush × 1
                        </p>
                        <p>
                            $18.00
                        </p>
                    </div>
                    <br /><hr /><br />
                    <div className="flex justify-between">
                        <p className="">
                            Subtotal
                        </p>
                        <p>
                            $42.00
                        </p>
                    </div>
                    <div className="flex justify-between">
                        <p className="">
                            Shipping
                        </p>
                        <p>
                            $5.00
                        </p>
                    </div>
                    <div className="flex justify-between">
                        <p className="">
                            Estimated tax
                        </p>
                        <p>
                            $3.36
                        </p>
                    </div>
                    <span className="flex justify-between text-[18px]">
                        <p>
                            Total
                        </p>
                        <p>
                            $50.36
                        </p>
                    </span>
                </div>

            </div>
            
            <div className="flex justify-center sm:justify-end">
                <a href="/contact" className="text-center text-gray-500 sm:text-right">Need help with this order? Contact Us →</a>
            </div>

            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:gap-5">
                <button className="rounded-xl bg-[var(--color-button)] px-5 py-2 shadow hover:shadow-xl">
                    <a href="/" className="text-[var(--color-white-text)]">Return Home</a>
                </button>
                <button className="w-full rounded-xl bg-[var(--color-button)] px-5 py-2 shadow hover:shadow-xl sm:w-auto">
                    <a href="/shop" className="ml-0 text-[var(--color-white-text)] hover:ml-1">Continue shopping →</a>
                </button>
            </div>

        </div>
    </section>
  );
}

export default OrderConfirmation;
