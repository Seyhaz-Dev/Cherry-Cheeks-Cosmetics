import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'

import Header from './components/Header'
import Footer from './components/Footer'
import { CartProvider } from './context/CartContext'
import { AuthProvider, useAuth } from './context/AuthContext'
import AdminLayout from './layouts/AdminLayout'
import { Box, MousePointerClick, ShoppingBag, UsersRound } from 'lucide-react'
import serumImage from './assets/glow-serum.png'
import nightCreamImage from './assets/night-cream.png'
import balmImage from './assets/cream-balm.png'

import Home from './pages/Home'
import Contact from './pages/Contact'
import Shop from './pages/Shop'
import Cart from './pages/Cart'


import Checkout from './pages/Checkout'

import Categories from './pages/Categories'
import ProductDetail from './pages/ProductDetail'
import Register from './pages/auth/Register'
import Login from './pages/auth/Login'
import OrderConfirmation from './pages/OrderConfirmation'

function AdminPage() {
  const stats = [
    { label: 'Total products', value: '24', change: '+12.8% vs last month', icon: Box },
    { label: 'Orders', value: '684', change: '+12.8% vs last month', icon: ShoppingBag },
    { label: 'Customers', value: '684', change: '+12.8% vs last month', icon: UsersRound },
    { label: 'Conversion', value: '3.8%', change: '+0.6% vs last month', icon: MousePointerClick },
  ]
  const salesBars = [38, 55, 45, 72, 57, 86, 68]
  const products = [
    { name: 'Dewdrop Renewal Serum', category: 'Serum · $68', image: serumImage, stock: '54 units', sales: '128', status: 'In stock' },
    { name: 'Camellia Night Cream', category: 'Night cream · $54', image: nightCreamImage, stock: '38 units', sales: '102', status: 'In stock' },
    { name: 'Cloud Veil Barrier Cream', category: 'Moisturizer · $54', image: balmImage, stock: '8 low', sales: '94', status: 'Low stock' },
  ]

  return (
    <div className="space-y-5">
      <section className="grid gap-4 sm:grid-cols-2 2xl:grid-cols-4">
        {stats.map(({ label, value, change, icon: Icon }) => (
          <article key={label} className="rounded-lg border border-[#f0d9e4] bg-white p-4 sm:p-5">
            <div className="flex items-start justify-between gap-3">
              <h2 className="text-sm text-[#75666d]">{label}</h2>
              <span className="flex size-9 items-center justify-center rounded-md bg-[#fbe3ee] text-[#cf6190]">
                <Icon size={17} aria-hidden="true" />
              </span>
            </div>
            <p className="mt-3 text-2xl font-semibold">{value}</p>
            <p className="mt-2 text-xs text-[#718574]">{change}</p>
          </article>
        ))}
      </section>

      <section className="rounded-lg border border-[#f0d9e4] bg-white p-5 sm:p-6" aria-label="Sales overview">
        <h2 className="font-semibold">Sales overview</h2>
        <p className="text-sm text-[#82757b]">Revenue over the last 7 days</p>
        <div className="mt-6 flex h-40 items-end gap-3 border-b border-[#eee5e9] px-2 sm:gap-6">
          {salesBars.map((height, index) => (
            <div key={index} className="flex h-full flex-1 items-end justify-center">
              <div className="w-full max-w-12 rounded-t-sm bg-[#f3a9c7]" style={{ height: `${height}%` }} />
            </div>
          ))}
        </div>
        <div className="mt-2 flex justify-between text-xs text-[#82757b]">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => <span key={day}>{day}</span>)}
        </div>
      </section>

      <section className="overflow-hidden rounded-lg border border-[#f0d9e4] bg-white">
        <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-5 sm:px-6">
          <div>
            <h2 className="font-semibold">Product management</h2>
            <p className="mt-1 text-sm text-[#82757b]">24 active products · 3 need attention</p>
          </div>
          <span className="text-sm font-medium text-[#a9365b]">Sample data</span>
        </div>
        <div className="overflow-x-auto px-5 pb-4 sm:px-6">
          <table className="w-full min-w-[620px] text-left text-sm">
            <thead className="border-b border-[#eee5e9] text-xs text-[#82757b]">
              <tr>
                <th className="py-3 font-medium">Product</th>
                <th className="py-3 font-medium">Stock</th>
                <th className="py-3 font-medium">Sales</th>
                <th className="py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.name} className="border-b border-[#eee5e9] last:border-0">
                  <td className="py-3 pr-4">
                    <div className="flex items-center gap-3">
                      <img src={product.image} alt="" className="size-10 rounded-md object-cover" />
                      <div>
                        <p className="font-semibold text-[#30252a]">{product.name}</p>
                        <p className="text-xs text-[#82757b]">{product.category}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 text-[#5f5359]">{product.stock}</td>
                  <td className="py-3 text-[#5f5359]">{product.sales}</td>
                  <td className="py-3">
                    <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${product.status === 'In stock' ? 'bg-[#d8f5df] text-[#326b40]' : 'bg-[#fff0c9] text-[#8d6500]'}`}>
                      {product.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}

function AdminRoute() {
  const { user } = useAuth()

  return user?.role === 'admin' ? <AdminLayout /> : <Navigate to="/" replace />
}

function AdminSection({ title }) {
  return (
    <section className="rounded-lg border border-[#f0d9e4] bg-white p-6">
      <p className="text-sm font-medium text-[#9a7182]">Store administration</p>
      <h1 className="mt-2 text-2xl font-semibold text-[#30252a]">{title}</h1>
      <p className="mt-2 text-sm text-[#75666d]">This section is ready for its management tools.</p>
    </section>
  )
}

function EntryRoute() {
  const { user } = useAuth()

  if (!user) {
    return <Navigate to="/login" replace />
  }

  if (user.role === 'admin') {
    return <Navigate to="/admin" replace />
  }

  return <Home />
}

function AppLayout() {
  const location = useLocation()
  const isAuthPage = ['/login', '/register'].includes(location.pathname)
  const isAdminPage = location.pathname.startsWith('/admin')

  return (
    <div className="flex min-h-screen flex-col">
      {!isAuthPage && !isAdminPage && <Header />}

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<EntryRoute />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/cart" element={<Cart />} />


      
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/orderComfirm" element={<OrderConfirmation/>}/>


          <Route path="/categories" element={<Categories />} />
          
          <Route path="/productDetail" element={<ProductDetail />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<AdminRoute />}>
            <Route index element={<AdminPage />} />
            <Route path="products" element={<AdminSection title="Products" />} />
            <Route path="orders" element={<AdminSection title="Orders" />} />
            <Route path="customers" element={<AdminSection title="Customers" />} />
            <Route path="settings" element={<AdminSection title="Settings" />} />
          </Route>
        </Routes>
      </main>

      {!isAuthPage && !isAdminPage && <Footer />}
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <AppLayout />
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App