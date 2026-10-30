import { createContext, useContext, useEffect, useState } from 'react'

const CustomerContext = createContext(null)
const STORAGE_KEY = 'cherry-cheeks-customers'
const SAMPLE_CUSTOMER_IDS = new Set(['CUST-101', 'CUST-102', 'CUST-103', 'CUST-104', 'CUST-105'])

const today = () =>
  new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })

export function CustomerProvider({ children }) {
  // Load saved customers so they survive a page refresh
  const [customers, setCustomers] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      const parsed = saved ? JSON.parse(saved) : []
      return Array.isArray(parsed)
        ? parsed.filter((customer) => !SAMPLE_CUSTOMER_IDS.has(customer.id) && Number(customer.totalOrders) > 0)
        : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(customers))
  }, [customers])

  const updateCustomer = (id, values) =>
    setCustomers((prev) => prev.map((c) => (c.id === id ? { ...c, ...values } : c)))

  const deleteCustomer = (id) => setCustomers((prev) => prev.filter((c) => c.id !== id))

  // Called from Checkout: creates the customer, or adds to an existing one (matched by email)
  const recordOrder = ({ name, email, phone, total }) =>
    setCustomers((prev) => {
      const key = String(email ?? '').trim().toLowerCase()
      const found = prev.find((c) => String(c.email ?? '').trim().toLowerCase() === key)

      if (found) {
        return prev.map((c) =>
          c.id === found.id
            ? {
                ...c,
                name,
                phone: phone || c.phone,
                totalOrders: Number(c.totalOrders || 0) + 1,
                totalSpent: Number(c.totalSpent || 0) + Number(total || 0),
              }
            : c
        )
      }

      return [
        {
          id: `CUST-${Date.now().toString().slice(-6)}`,
          name,
          email: String(email).trim(),
          phone: phone || 'N/A',
          totalOrders: 1,
          totalSpent: Number(total || 0),
          tier: 'Bronze',
          status: 'Active',
          joinedDate: today(),
          avatar: '',
        },
        ...prev,
      ]
    })

  return (
    <CustomerContext.Provider
      value={{ customers, updateCustomer, deleteCustomer, recordOrder }}
    >
      {children}
    </CustomerContext.Provider>
  )
}

export const useCustomers = () => useContext(CustomerContext)