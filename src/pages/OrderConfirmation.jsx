import { Link, Navigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

// ---------- helpers (outside the component, so they are always defined) ----------
const formatPrice = (price) => `$${Number(price || 0).toFixed(2)}`;

const formatDate = (date, opts = { year: "numeric", month: "long", day: "numeric" }) =>
  date ? date.toLocaleDateString("en-US", opts) : "";

const getProductName = (item) => item.name || item.product?.name || item.title || "Beauty Product";
const getProductQuantity = (item) => Number(item.quantity ?? item.qty ?? 1);
const getProductPrice = (item) =>
  Number(item.price ?? item.unitPrice ?? item.product?.price ?? 0);
const getLineTotal = (item) =>
  Number(item.lineTotal ?? getProductPrice(item) * getProductQuantity(item));

function OrderConfirmation() {
  const location = useLocation();
  const order = location.state?.order;

  const [invoiceData, setInvoiceData] = useState(null);
  const [products, setProducts] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [placedAt] = useState(() => new Date());

  useEffect(() => {
    if (!order) return undefined;
    let cancelled = false;

    const fetchData = async () => {
      try {
        const [invRes, prodRes, accRes] = await Promise.all([
          fetch("/student-data/invoices.json"),
          fetch("/student-data/products.json"),
          fetch("/student-data/accounts.json"),
        ]);

        const invoices = invRes.ok ? await invRes.json() : [];
        const productList = prodRes.ok ? await prodRes.json() : [];
        const accountList = accRes.ok ? await accRes.json() : [];
        if (cancelled) return;

        setProducts(productList);
        setAccounts(accountList);

        // Only use an invoice when it really matches this order (no more invoices[0] fallback)
        if (Array.isArray(invoices) && order.orderNumber) {
          const match = invoices.find(
            (inv) =>
              inv.invoiceNumber === order.orderNumber ||
              inv.invoiceNumber?.split("-").pop() === String(order.orderNumber).split("-").pop()
          );
          setInvoiceData(match || null);
        }
      } catch (error) {
        console.error("Failed to fetch invoice data:", error);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchData();
    return () => {
      cancelled = true;
    };
  }, [order]);

  // Refreshing the page loses location.state, so send the user away instead of showing fake data
  if (!order) return <Navigate to="/shop" replace />;

  const getProductById = (id) => products.find((p) => p.id === id);
  const getAccountById = (id) => accounts.find((a) => a.id === id);

  const customer = order.customer || {};
  const invoice = invoiceData;
  const account = invoice?.customerId != null ? getAccountById(invoice.customerId) : null;

  // ---------- customer info ----------
  const email = customer.email || customer?.user?.email || order.email || account?.email || "";

  const fullName =
    customer.fullName ||
    customer.name ||
    customer.full_name ||
    (account ? `${account.firstName || ""} ${account.lastName || ""}`.trim() : "");
  const nameParts = fullName.trim().split(/\s+/).filter(Boolean);

  const firstName =
    customer.firstName || customer.first_name || customer?.user?.firstName ||
    account?.firstName || nameParts[0] || order.firstName || "";
  const lastName =
    customer.lastName || customer.last_name || customer?.user?.lastName ||
    account?.lastName || nameParts.slice(1).join(" ") || order.lastName || "";

  const address = customer.address || customer.streetAddress || customer.addressLine1 || account?.address || "";
  const city = customer.city || account?.city || "";
  const state = customer.state || account?.state || "";
  const zipCode = customer.zipCode || customer.postalCode || account?.zipCode || "";
  const country = customer.country || account?.country || "";
  const phone =
    customer.phone || customer.phoneNumber || customer.telephone ||
    account?.phone || account?.phoneNumber || "";

  // ---------- items + totals: ONE source of truth so lines always add up ----------
  const orderItems = order.items || [];
  const items =
    orderItems.length > 0
      ? orderItems.map((item) => {
          const product = item.product
            ? getProductById(item.product.id) || item.product
            : getProductById(item.productId);
          return { ...item, product, name: item.name || product?.name };
        })
      : (invoice?.items || []).map((item) => {
          const product = getProductById(item.productId);
          return {
            name: product?.name || item.name,
            quantity: item.quantity ?? 1,
            price: item.unitPrice ?? product?.price ?? 0,
            lineTotal: item.lineTotal,
          };
        });

  const source = orderItems.length > 0 ? order : invoice || order;
  const subtotal = source.subtotal ?? items.reduce((sum, item) => sum + getLineTotal(item), 0);
  const shipping = Number(source.shipping ?? 0);
  const tax = Number(source.tax ?? 0);
  const total = source.total ?? Number(subtotal) + shipping + tax;

  // ---------- order meta ----------
  const orderNumber = order.orderNumber || invoice?.invoiceNumber || "";
  // Real date: the moment this confirmation page is shown (ignores mock dates in the JSON files).
  // useState keeps it stable across re-renders.
  const placedDate = placedAt;

  // ---------- payment (never invent card details) ----------
  const paymentMethod = String(invoice?.payments?.[0]?.method || order.paymentMethod || "").toUpperCase();
  const paymentRef = invoice?.payments?.[0]?.reference || "";
  const cardLast4 = paymentRef.includes("-")
    ? paymentRef.split("-").pop().slice(-4)
    : customer.cardLast4 || "";
  const paymentLabel =
    paymentMethod === "CARD" ? "card" : paymentMethod === "QR" ? "QR" : paymentMethod === "CASH" ? "cash" : paymentMethod.toLowerCase();

  // ---------- delivery estimate ----------
  const baseDate = placedDate || new Date();
  const start = new Date(baseDate);
  start.setDate(start.getDate() + 3);
  const end = new Date(baseDate);
  end.setDate(end.getDate() + 7);
  const dayOpts = { month: "long", day: "numeric" };
  const deliveryText = `${formatDate(start, dayOpts)}–${formatDate(end, dayOpts)}, ${end.getFullYear()}`;

  const cityLine = [city, state, zipCode, country].filter(Boolean).join(", ");
  const card = "flex w-full flex-col gap-5 rounded-xl border border-gray-300 px-5 py-5 sm:px-8 sm:py-6 lg:px-10";
  // fallback pink so the white text is always visible even if --color-button is undefined
  const button =
    "rounded-xl bg-[var(--color-button,#d9778f)] px-5 py-2 text-center !text-white shadow hover:shadow-xl";

  return (
    <section className="min-h-screen bg-[#fbf8f5] font-bold">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-4 sm:px-6 sm:py-6 lg:gap-10 lg:py-10">
        <div className={card}>
          <h2 className="text-green-500">✓ Thank you! Your order has been placed.</h2>
          <h4>
            {orderNumber && <>Order #{orderNumber}</>}
            {orderNumber && placedDate && " • "}
            {placedDate && <>Placed {formatDate(placedDate)}</>}
            {email && (
              <>
                <br />
                <br />
                A confirmation email has been sent to {email}.
              </>
            )}
          </h4>
        </div>

        <div className="flex w-full flex-col gap-6 lg:flex-row lg:justify-between lg:gap-10">
          <div className="flex w-full flex-col gap-6 lg:gap-10">
            <div className={card}>
              <h2>Shipping details</h2>
              <p>
                {[firstName, lastName].filter(Boolean).join(" ")}
                {(firstName || lastName) && (address || phone) && <br />}
                {address}
                {address && phone && <br />}
                {phone}
                {phone && cityLine && <br />}
                {cityLine}
              </p>
              <span>
                Standard shipping / Estimated delivery: {deliveryText}
              </span>
            </div>

            <div className={card}>
              <h2>Payment confirmation</h2>
              <p>
                Paid {formatPrice(total)}
                {paymentLabel ? ` with ${paymentLabel}` : ""}
                {paymentMethod === "CARD" && cardLast4 ? ` ending in ${cardLast4}` : ""}
                {paymentMethod === "QR" && paymentRef ? ` (${paymentRef})` : ""}.
              </p>
            </div>
          </div>

          <div className={`${card} lg:w-96 lg:shrink-0`}>
            <h2>Order summary</h2>
            {loading && items.length === 0 && <p className="text-gray-500">Loading…</p>}
            {items.map((item, index) => (
              <div key={index} className="flex items-start justify-between gap-4">
                <p className="flex-1 break-words">
                  {getProductName(item)} × {getProductQuantity(item)}
                </p>
                <p className="shrink-0">{formatPrice(getLineTotal(item))}</p>
              </div>
            ))}
            {items.length > 0 && <hr />}
            {items.length > 0 && (
              <div className="flex items-center justify-between">
                <p>Subtotal</p>
                <p>{formatPrice(subtotal)}</p>
              </div>
            )}
            <div className="flex items-center justify-between">
              <p>Shipping</p>
              <p>{formatPrice(shipping)}</p>
            </div>
            {tax > 0 && (
              <div className="flex items-center justify-between">
                <p>Tax</p>
                <p>{formatPrice(tax)}</p>
              </div>
            )}
            <div className="flex items-center justify-between text-[18px]">
              <p>Total</p>
              <p>{formatPrice(total)}</p>
            </div>
          </div>
        </div>

        <div className="flex justify-center sm:justify-end">
          <Link to="/contact" className="text-center text-gray-500 sm:text-right">
            Need help with this order? Contact Us →
          </Link>
        </div>

        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:gap-5">
          <Link to="/" className={button}>
            Return Home
          </Link>
          <Link to="/shop" className={`${button} w-full sm:w-auto`}>
            Continue shopping →
          </Link>
        </div>
      </div>
    </section>
  );
}

export default OrderConfirmation;