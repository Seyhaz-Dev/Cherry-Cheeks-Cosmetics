import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'


import Header from './components/Header'
import Footer from './components/Footer'
import { CartProvider } from './context/CartContext'
import { AuthProvider, useAuth } from './context/AuthContext'
import AdminLayout from './layouts/AdminLayout'


import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Shop from './pages/Shop'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Categories from './pages/Categories'
import ProductDetail from './pages/ProductDetail'
import OrderConfirmation from './pages/OrderConfirmation'
import OrderFail from './pages/OrderFail'
import ProFile from './pages/ProFile'
import Register from './pages/auth/Register'
import Login from './pages/auth/Login'
import Dashboard from './pages/admin/Dashboard'
import ProductManagement from './pages/admin/ProductManagement'
import OrderManagement from './pages/admin/OrderManagement'
import CustomerManagement from './pages/admin/CustomerManagement'
import Settings from './pages/admin/Settings'
import Profile from './pages/ProFile'



function AdminRoute() {
const { user } = useAuth()


return user?.role === 'admin' ? <AdminLayout /> : <Navigate to="/" replace />
}


function AdminSection({ title }) {
return (
<section className="rounded-lg border border-[#f0d9e4] bg-white p-6">
<h1 className="mt-2 text-2xl font-semibold text-[#30252a]">{title}</h1>
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
<Route path="/about" element={<About />} />
<Route path="/contact" element={<Contact />} />
<Route path="/shop" element={<Shop />} />
<Route path="/cart" element={<Cart />} />
<Route path="/checkout" element={<Checkout />} />
<Route path="/orderComfirm" element={<OrderConfirmation />} />
<Route path="/categories" element={<Categories />} />
<Route path="/productDetail" element={<ProductDetail />} />
<Route path="/profile" element={<Profile />} />
<Route path="/register" element={<Register />} />
<Route path="/login" element={<Login />} />


<Route path="/admin" element={<AdminRoute />}>
  <Route index element={<Dashboard />} />
  <Route path="products" element={<ProductManagement />} />
  <Route path="orders" element={<OrderManagement />} />
  <Route path="customers" element={<CustomerManagement />} />
  <Route path="settings" element={<Settings />} />
</Route>
<Route path="/orderFail" element={<OrderFail />} />
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