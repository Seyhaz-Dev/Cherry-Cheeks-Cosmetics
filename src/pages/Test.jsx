
import { useState, useEffect } from "react";

function Shop() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function getCategories() {
      const response = await fetch("/student-data/categories.json");

      const data = await response.json();

      setCategories(data);
    }

    getCategories();
  }, []);

  return (
    <div>
      <h1>Shop Categories</h1>

      {categories.map((category) => (
        <p key={category.id}>{category.name}</p>
      ))}
    </div>
  );
}

export default Shop;
