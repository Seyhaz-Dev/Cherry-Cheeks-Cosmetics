
import { useState } from "react";

import {
  ShoppingCart,
  Package,
  TrendingUp,
  Users,
  ArrowUpRight,
  ArrowDownRight,
  Eye,
} from "lucide-react";

import {
  products,
  customers,
  orders,
  salesData,
} from "../../data/dashboardData.js";

const money = (amount) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);

function StatCard({ item }) {
  const Icon = item.icon;
  const ChangeIcon = item.positive ? ArrowUpRight : ArrowDownRight;

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

      <p className="mt-2 flex items-center gap-1 text-xs">
        <span
          className={`flex items-center font-medium ${
            item.positive ? "text-green-600" : "text-red-500"
          }`}
        >
          <ChangeIcon size={14} />
          {item.change}
        </span>

        <span className="text-[#82757b]">vs last month</span>
      </p>
    </div>
  );
}

function SalesChart() {
  const [period, setPeriod] = useState("week");
  const currentSales = salesData[period];

  const maxRevenue = Math.max(
    ...currentSales.map((item) => item.revenue),
    1
  );

  const axisMax = Math.ceil(maxRevenue / 4 / 100) * 100 || 100;
  const chartMax = axisMax * 4;

  return (
    <section className="rounded-xl bg-white p-4 sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-base font-semibold text-[#35242c]">
            Sales Overview
          </h2>

          <p className="mt-1 text-sm text-[#82757b]">
            Your revenue performance
          </p>
        </div>

        <select
          value={period}
          onChange={(event) => setPeriod(event.target.value)}
          className="rounded-md border border-[#e6d3dc] bg-white px-3 py-2 text-sm outline-none focus:border-[#e0568a]"
        >
          <option value="week">This week</option>
          <option value="month">This month</option>
          <option value="year">This year</option>
        </select>
      </div>

      <div className="mt-6 flex h-52 gap-3 sm:h-60">
        <div className="flex flex-col justify-between pb-7 text-xs text-[#82757b]">
          {[4, 3, 2, 1, 0].map((number) => (
            <span key={number}>{money(axisMax * number)}</span>
          ))}
        </div>

        <div className="relative flex flex-1 flex-col">
          <div className="absolute inset-0 bottom-7 flex flex-col justify-between">
            {[1, 2, 3, 4, 5].map((line) => (
              <div
                key={line}
                className="w-full border-t border-dashed border-[#f0e3e9]"
              />
            ))}
          </div>

          <div className="relative flex flex-1 items-end justify-around gap-2 pb-7">
            {currentSales.map((item) => (
              <div
                key={item.day}
                className="flex h-full min-w-0 flex-1 flex-col items-center justify-end"
              >
                <div
                  title={`${item.day}: ${money(item.revenue)}`}
                  className="w-full max-w-10 rounded-t-md bg-[#e0568a] transition-all duration-300 hover:bg-[#cc4a7b]"
                  style={{
                    height: `${(item.revenue / chartMax) * 100}%`,
                    minHeight: item.revenue > 0 ? "4px" : "0",
                  }}
                />
              </div>
            ))}
          </div>

          <div className="absolute inset-x-0 bottom-0 flex justify-around">
            {currentSales.map((item) => (
              <span
                key={item.day}
                className="flex-1 truncate text-center text-xs text-[#82757b]"
              >
                {item.day}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function RecentOrders() {
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

        <button
          type="button"
          onClick={() => {
            window.location.href = "/admin/orders";
          }}
          className="flex items-center gap-1 text-sm font-medium text-[#e0568a] hover:text-[#cc4a7b]"
        >
          View all <Eye size={15} />
        </button>
      </div>

      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[600px] text-left text-sm">
          <thead className="text-[#5f5359]">
            <tr>
              <th className="py-3 pr-4 font-medium">Order ID</th>
              <th className="px-4 py-3 font-medium">Customer</th>
              <th className="px-4 py-3 font-medium">Amount</th>
              <th className="px-4 py-3 font-medium">Status</th>
            </tr>
          </thead>

          <tbody>
            {orders.slice(0, 5).map((order) => (
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
                    {order.product}
                  </p>
                </td>

                <td className="whitespace-nowrap px-4 py-4 font-medium">
                  {money(order.amount)}
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
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default function Dashboard() {
  const totalRevenue = orders.reduce(
    (total, order) => total + order.amount,
    0
  );

  const stats = [
    {
      label: "Total Revenue",
      value: money(totalRevenue),
      change: "+12.8%",
      positive: true,
      icon: TrendingUp,
      color: "bg-[#fde0ec] text-[#e0568a]",
    },
    {
      label: "Total Orders",
      value: orders.length.toLocaleString(),
      change: "+8.2%",
      positive: true,
      icon: ShoppingCart,
      color: "bg-[#dceafe] text-[#3975d5]",
    },
    {
      label: "Total Products",
      value: products.length.toLocaleString(),
      change: "+4.5%",
      positive: true,
      icon: Package,
      color: "bg-[#c9f5d8] text-[#1f9d55]",
    },
    {
      label: "Total Customers",
      value: customers.length.toLocaleString(),
      change: "-2.1%",
      positive: false,
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

      <SalesChart />

      <RecentOrders />
    </div>
  );
}
