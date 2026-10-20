import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import ProductCard from "./components/ProductCard";

function App() {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        {/* Home Page */}
        <Route
          path="/"
          element={
            <main className="min-h-screen bg-[#fff7f5] px-6 py-12">
              <h1 className="mb-10 text-center text-4xl font-bold text-[#89565a]">
                Our Products
              </h1>

              <div className="flex flex-wrap justify-center gap-8">
                <ProductCard />
              </div>
            </main>
          }
        />

        {/* Contact Page */}
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;