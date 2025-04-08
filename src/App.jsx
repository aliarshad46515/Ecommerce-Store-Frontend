import React, { useState } from "react";
import { ShoppingCart as CartIcon, ArrowRight } from "lucide-react";
import { CartProvider } from "./context/CartContext";
import { ProductCard } from "./components/ProductCard";
import { Cart } from "./components/Cart";
import { products } from "./data/products";

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <CartProvider>
      <div className="min-h-screen bg-gray-100">
        <header className="bg-white shadow-sm sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">DailyStore</h1>
            <button
              onClick={() => setIsCartOpen(!isCartOpen)}
              className="p-2 hover:bg-gray-100 rounded-full relative"
            >
              <CartIcon size={24} />
            </button>
          </div>
        </header>

        <section className="relative bg-blue-600 text-white">
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&q=80"
              alt="Store Banner"
              className="w-full h-full object-cover opacity-20"
            />
          </div>
          <div className="relative max-w-7xl mx-auto px-4 py-24">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Discover Premium Products for Your Lifestyle
              </h1>
              <p className="text-xl mb-8 text-blue-100">
                Explore our curated collection of high-quality electronics and
                accessories. Find the perfect items that match your style and
                needs.
              </p>
              <a
                href="#products"
                className="inline-flex items-center gap-2 bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
              >
                Shop Now
                <ArrowRight size={20} />
              </a>
            </div>
          </div>
        </section>

        <section className="bg-white py-12">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              Featured Categories
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative rounded-lg overflow-hidden h-48 group">
                <img
                  src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80"
                  alt="Electronics"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">
                      Electronics
                    </h3>
                    <p className="text-white/80">
                      Premium audio and smart devices
                    </p>
                  </div>
                </div>
              </div>
              <div className="relative rounded-lg overflow-hidden h-48 group">
                <img
                  src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80"
                  alt="Accessories"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">
                      Accessories
                    </h3>
                    <p className="text-white/80">Stylish watches and eyewear</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <main className="max-w-7xl mx-auto px-4 py-12" id="products">
          <div className="flex gap-8">
            <div
              className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${
                isCartOpen ? "flex-1" : "w-full"
              }`}
            >
              <h2 className="text-2xl font-bold text-gray-900 col-span-full mb-6">
                Our Products
              </h2>
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {isCartOpen && (
              <div className="w-96 bg-white p-6 rounded-lg shadow-lg h-fit sticky top-24">
                <h2 className="text-xl font-semibold mb-4">Shopping Cart</h2>
                <Cart />
              </div>
            )}
          </div>
        </main>

        <footer className="bg-white border-t">
          <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="text-center text-gray-600">
              <p>© 2025 StyleStore. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </CartProvider>
  );
}

export default App;
