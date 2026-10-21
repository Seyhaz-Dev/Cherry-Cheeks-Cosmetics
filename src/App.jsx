import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'

import Header from './components/Header'
import Footer from './components/Footer'
import { CartProvider } from './context/CartContext'

import Home from './pages/Home'
import Contact from './pages/Contact'
import Shop from './pages/Shop'
import Register from './pages/auth/Register'
import Login from './pages/auth/Login'

function AppLayout() {
  const isAuthPage = ['/login', '/register'].includes(location.pathname)

  return (
    <div className="flex min-h-screen flex-col">
      {!isAuthPage && <Header />}

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </main>

      {!isAuthPage && <Footer />}
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <AppLayout />
      </CartProvider>
    </BrowserRouter>
  )
}

export default App