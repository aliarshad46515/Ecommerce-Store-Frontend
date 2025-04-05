import React from "react";
import { useCart } from "../context/CartContext";
import { ShoppingCart } from "lucide-react";

export const ProductCard = ({ product }) => {
  const { dispatch } = useCart();

  if (!product) {
    console.error("ProductCard rendered without a product prop.");
    return null;
  }

  const productPrice = typeof product.price === "number" ? product.price : 0;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
      <img
        src={product.image || "default-placeholder.png"}
        alt={product.name || "Product image"}
        className="w-full h-48 object-cover"
        onError={(e) => (e.currentTarget.src = "default-placeholder.png")}
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">
          {product.name || "Unnamed Product"}
        </h3>
        <p className="text-gray-600 mt-1">
          {product.description || "No description available."}
        </p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-xl font-bold text-gray-900">
            ${productPrice.toFixed(2)}
          </span>
          <button
            onClick={() => dispatch({ type: "ADD_TO_CART", payload: product })}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors"
            aria-label={`Add ${product.name || "product"} to cart`}
          >
            <ShoppingCart size={20} />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};
