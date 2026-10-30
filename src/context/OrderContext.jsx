import { createContext, useContext, useEffect, useState } from 'react'

const OrderContext = createContext(null)
const STORAGE_KEY = 'cherry-cheeks-orders'

const INITIAL_ORDERS = [
  { id: 'LB-101', customer: 'Olivia Bennett', date: 'Oct 05, 2026', items: '3 Items', total: 128.4, payment: 'Paid', status: 'Processing', lineItems: [] },
  { id: 'LB-102', customer: 'Ethan Reynolds', date: 'Oct 06, 2026', items: '1 Item', total: 45.0, payment: 'Paid', status: 'Pending', lineItems: [] },
]

export function OrderProvider({ children }) {
  // Load saved orders so they survive a page refresh
  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      return saved ? JSON.parse(saved) : INITIAL_ORDERS
    } catch {
      return INITIAL_ORDERS
    }
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(orders))
  }, [orders])

  const nextId = () => {
    const nums = orders.map((o) => parseInt(String(o.id).replace(/\D/g, ''), 10) || 0)
    return `LB-${Math.max(100, ...nums) + 1}`
  }

  // Called from Checkout when a customer places an order
  const addOrder = ({ customer, cartItems, total, payment = 'Unpaid' }) => {
    const count = cartItems.reduce((sum, i) => sum + (i.quantity || 1), 0)
    const newOrder = {
      id: nextId(),
      customer,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
      items: `${count} ${count === 1 ? 'Item' : 'Items'}`,
      total: Number(total),
      payment,
      status: 'Pending',
      lineItems: cartItems.map((i) => ({ name: i.name, price: i.price, quantity: i.quantity || 1 })),
    }
    setOrders((prev) => [newOrder, ...prev])
    return newOrder
  }

  const updateOrder = (id, values) =>
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, ...values } : o)))

  const deleteOrder = (id) => setOrders((prev) => prev.filter((o) => o.id !== id))

  return (
    <OrderContext.Provider value={{ orders,  addOrder, updateOrder, deleteOrder }}>
      {children}
    </OrderContext.Provider>
  )
}

export const useOrders = () => useContext(OrderContext)