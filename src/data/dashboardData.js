
export const products = [
  { id: 1, name: "Dewdrop Renewal Serum", price: 68 },
  { id: 2, name: "Moonwater Essence", price: 35 },
  { id: 3, name: "Cloud Veil Barrier Cream", price: 54 },
  { id: 4, name: "Peony Glow Toner", price: 29 },
  { id: 5, name: "Moisture Essence", price: 35 },
  { id: 6, name: "Glow Serum", price: 42 },
  { id: 7, name: "Cream & Balm", price: 28 },
  { id: 8, name: "Gentle Cleanser", price: 22 },
];

export const customers = [
  { id: 1, name: "Sokha Chan" },
  { id: 2, name: "Dara Kim" },
  { id: 3, name: "Malis Heng" },
  { id: 4, name: "Sreypov Lim" },
  { id: 5, name: "Bopha Sok" },
  { id: 6, name: "Vanna Chea" },
  { id: 7, name: "Pisey Ly" },
  { id: 8, name: "Nita Kong" },
];

export const orders = [
  {
    id: "#CC1028",
    customer: "Sokha Chan",
    product: "Dewdrop Renewal Serum",
    amount: 68,
    status: "Completed",
    date: "2026-10-26",
  },
  {
    id: "#CC1027",
    customer: "Dara Kim",
    product: "Moonwater Essence",
    amount: 35,
    status: "Processing",
    date: "2026-10-25",
  },
  {
    id: "#CC1026",
    customer: "Malis Heng",
    product: "Cloud Veil Barrier Cream",
    amount: 54,
    status: "Pending",
    date: "2026-10-24",
  },
  {
    id: "#CC1025",
    customer: "Sreypov Lim",
    product: "Peony Glow Toner",
    amount: 29,
    status: "Completed",
    date: "2026-10-23",
  },
  {
    id: "#CC1024",
    customer: "Bopha Sok",
    product: "Moisture Essence",
    amount: 35,
    status: "Completed",
    date: "2026-10-22",
  },
];

export const salesData = {
  week: [
    { day: "Mon", revenue: 450 },
    { day: "Tue", revenue: 650 },
    { day: "Wed", revenue: 520 },
    { day: "Thu", revenue: 800 },
    { day: "Fri", revenue: 600 },
    { day: "Sat", revenue: 950 },
    { day: "Sun", revenue: 720 },
  ],

  month: [
    { day: "Week 1", revenue: 3200 },
    { day: "Week 2", revenue: 4500 },
    { day: "Week 3", revenue: 3800 },
    { day: "Week 4", revenue: 5200 },
  ],

  year: [
    { day: "Jan", revenue: 8200 },
    { day: "Feb", revenue: 7600 },
    { day: "Mar", revenue: 9800 },
    { day: "Apr", revenue: 8800 },
    { day: "May", revenue: 11500 },
    { day: "Jun", revenue: 10200 },
    { day: "Jul", revenue: 12800 },
    { day: "Aug", revenue: 11900 },
    { day: "Sep", revenue: 13500 },
    { day: "Oct", revenue: 14200 },
    { day: "Nov", revenue: 12500 },
    { day: "Dec", revenue: 15800 },
  ],
};
