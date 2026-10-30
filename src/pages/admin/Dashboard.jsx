
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  ArrowUpRight,
  ShoppingCart,
  Package,
  DollarSign,
  Users,
  Eye,
} from "lucide-react";
import { useCustomers } from "../../context/CustomerContext";
import { useOrders } from "../../context/OrderContext";

const money = (amount) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(Number(amount) || 0);

const getOrderTotal = (order) => Number(order.total ?? order.amount ?? 0);

function StatCard({ item }) {
  const Icon = item.icon;

  return (
    <div className="rounded-xl bg-white p-4 sm:p-5">
      <div className="flex items-start justify-between gap-2">
        <p className="text-sm text-[#5f5359]">{item.label}</p>

        <span
          className={`flex size-9 shrink-0 items-center justify-center rounded-lg ${item.color}`}
        >
          <Icon size={18} />
        </span>
      </div>

      <p className="mt-3 text-2xl font-semibold text-[#35242c]">
        {item.value}
      </p>
    </div>
  );
}

function OrderStatusSummary({ orders }) {
  const statuses = [
    { name: "Pending", color: "bg-[#e6a51a]" },
    { name: "Processing", color: "bg-[#3975d5]" },
    { name: "Completed", color: "bg-[#1f9d55]" },
  ];

  return (
    <section className="rounded-xl bg-white p-4 sm:p-6">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-base font-semibold text-[#35242c]">Order Status</h2>
          <p className="mt-1 text-sm text-[#82757b]">Current order progress</p>
        </div>
        <span className="text-sm text-[#82757b]">{orders.length} total</span>
      </div>

      <div className="mt-5 grid gap-5 sm:grid-cols-3">
        {statuses.map((status) => {
          const count = orders.filter((order) => order.status === status.name).length;
          const percentage = orders.length ? (count / orders.length) * 100 : 0;

          return (
            <div key={status.name}>
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="text-[#5f5359]">{status.name}</span>
                <span className="font-semibold text-[#35242c]">{count}</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-[#f3edf0]">
                <div
                  className={`h-full rounded-full ${status.color}`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function RecentOrders({ orders }) {
  const getStatusStyle = (status) => {
    if (status === "Completed") {
      return "bg-[#b9f3c9] text-[#1f6b3a]";
    }

    if (status === "Processing") {
      return "bg-[#dceafe] text-[#285ba8]";
    }

    return "bg-[#fde8b5] text-[#8a5a00]";
  };

  return (
    <section className="rounded-xl bg-white p-4 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-base font-semibold text-[#35242c]">
            Recent Orders
          </h2>

          <p className="mt-1 text-sm text-[#82757b]">
            Latest customer purchases
          </p>
        </div>

        <Link
          to="/admin/orders"
          className="flex items-center gap-1 text-sm font-medium text-[#e0568a] hover:text-[#cc4a7b]"
        >
          View all <Eye size={15} />
        </Link>
      </div>

      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[600px] text-left text-sm">
          <thead className="text-[#5f5359]">
            <tr>
              <th className="py-3 pr-4 font-medium">Order ID</th>
              <th className="px-4 py-3 font-medium">Customer / Items</th>
              <th className="px-4 py-3 font-medium">Amount</th>
              <th className="px-4 py-3 font-medium">Status</th>
            </tr>
          </thead>

          <tbody>
            {orders.slice(0, 5).map((order) => {
              const itemSummary = Array.isArray(order.lineItems) && order.lineItems.length > 0
                ? order.lineItems.map((item) => `${item.name}${item.quantity > 1 ? ` x${item.quantity}` : ""}`).join(", ")
                : order.items || "No items listed";

              return (
              <tr
                key={order.id}
                className="border-t border-[#f0e3e9] hover:bg-[#fff9fc]"
              >
                <td className="py-4 pr-4 font-medium text-[#e0568a]">
                  {order.id}
                </td>

                <td className="px-4 py-4">
                  <p className="font-medium text-[#35242c]">
                    {order.customer}
                  </p>

                  <p className="mt-1 text-xs text-[#82757b]">
                    {itemSummary}
                  </p>
                </td>

                <td className="whitespace-nowrap px-4 py-4 font-medium">
                  {money(getOrderTotal(order))}
                </td>

                <td className="px-4 py-4">
                  <span
                    className={`whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-semibold ${getStatusStyle(
                      order.status
                    )}`}
                  >
                    {order.status}
                  </span>
                </td>
              </tr>
              );
            })}
            {orders.length === 0 && (
              <tr>
                <td colSpan="4" className="py-8 text-center text-sm text-[#82757b]">
                  No orders yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default function Dashboard() {
  const { orders } = useOrders();
  const { customers } = useCustomers();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    let active = true;

    async function loadProducts() {
      try {
        const savedProducts = localStorage.getItem("cherry-cheeks-products");

        if (savedProducts) {
          const parsedProducts = JSON.parse(savedProducts);
          if (Array.isArray(parsedProducts)) {
            if (active) setProducts(parsedProducts);
            return;
          }
        }

        const response = await fetch("/student-data/products.json");
        if (!response.ok) throw new Error("Failed to load products");

        const loadedProducts = await response.json();
        if (active && Array.isArray(loadedProducts)) setProducts(loadedProducts);
      } catch (error) {
        console.error("Unable to load dashboard products:", error);
      }
    }

    loadProducts();
    return () => {
      active = false;
    };
  }, []);

  const totalRevenue = orders.reduce((total, order) => total + getOrderTotal(order), 0);

  const stats = [
    {
      label: "Total Revenue",
      value: money(totalRevenue),
      icon: DollarSign,
      color: "bg-[#fde0ec] text-[#e0568a]",
    },
    {
      label: "Total Orders",
      value: orders.length.toLocaleString(),
      icon: ShoppingCart,
      color: "bg-[#dceafe] text-[#3975d5]",
    },
    {
      label: "Total Products",
      value: products.length.toLocaleString(),
      icon: Package,
      color: "bg-[#c9f5d8] text-[#1f9d55]",
    },
    {
      label: "Total Customers",
      value: customers.length.toLocaleString(),
      icon: Users,
      color: "bg-[#fdebc0] text-[#d98a00]",
    },
  ];

  return (
    <div className="space-y-4 sm:space-y-5">
    
      <div className="grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-4">
        {stats.map((item) => (
          <StatCard key={item.label} item={item} />
        ))}
      </div>

      <OrderStatusSummary orders={orders} />

      <RecentOrders orders={orders} />
    </div>
  );
}
