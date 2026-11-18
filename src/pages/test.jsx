import { useEffect, useState } from 'react'

function App() {

  // Store products
  const [products, setProducts] = useState([])

  // Fetch products when the page loads
  useEffect(() => {

    async function getProducts() {

      // Request the JSON file
      const response = await fetch('/student-data/products.json')

      // Convert response into JSON
      const data = await response.json()

      // Store products
      setProducts(data)
    }

    // Call the function
    getProducts()

  }, [])

  return (
    <div>
      <h1>Cherry Cheeks Cosmetics</h1>

      <h2>Our Products</h2>

      {products.map((product) => (
        <div key={product.id}>
          <h3>{product.name}</h3>
          <p>Price: ${product.price}</p>
          <p>Category: {product.category}</p>
        </div>
      ))}

    </div>
  )
}

export default App