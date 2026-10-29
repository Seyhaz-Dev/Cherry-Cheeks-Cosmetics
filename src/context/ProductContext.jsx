import { createContext, useContext, useEffect, useState } from 'react'

const ProductContext = createContext()

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadProducts() {
      try {
        // First try to load from localStorage (for admin-added products)
        const localProducts = localStorage.getItem('cherry-cheeks-products')
        if (localProducts) {
          setProducts(JSON.parse(localProducts))
          setLoading(false)
          return
        }

        // If no localStorage, load from JSON file
        const response = await fetch('/student-data/products.json')
        const data = await response.json()
        setProducts(data)
        setLoading(false)
      } catch (error) {
        console.error('Failed to load products:', error)
        setLoading(false)
      }
    }

    loadProducts()
  }, [])

  // Save products to localStorage whenever they change
  useEffect(() => {
    if (products.length > 0) {
      localStorage.setItem('cherry-cheeks-products', JSON.stringify(products))
    }
  }, [products])

  const addProduct = (product) => {
    setProducts((prev) => [{ ...product, id: Date.now(), brand: 'Cherry Cheeks', active: true }, ...prev])
  }

  const updateProduct = (id, updatedProduct) => {
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, ...updatedProduct } : p)))
  }

  const deleteProduct = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id))
  }

  return (
    <ProductContext.Provider value={{ products, setProducts, loading, addProduct, updateProduct, deleteProduct }}>
      {children}
    </ProductContext.Provider>
  )
}

export const useProducts = () => {
  const context = useContext(ProductContext)
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider')
  }
  return context
}
