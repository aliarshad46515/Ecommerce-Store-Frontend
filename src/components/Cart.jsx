import React from 'react';
import { useCart } from '../context/CartContext';
import { Minus, Plus, Trash2 } from 'lucide-react';

export const Cart = () => {
  const { state, dispatch } = useCart();

  const updateQuantity = (productId, quantity) => {
    if (quantity < 1) {
      return;
    }
    dispatch({ type: 'UPDATE_QUANTITY', payload: { productId, quantity } });
  };

  if (!state || !state.items || state.items.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Your cart is empty</p>
      </div>
    );
  }

  const totalAmount = typeof state.total === 'number' ? state.total : 0;

  return (
    <div className="space-y-4">
      {state.items.map((item) => {
        if (!item || !item.product) {
          console.error('Invalid cart item structure:', item);
          return null;
        }
        const itemPrice = typeof item.product.price === 'number' ? item.product.price : 0;

        return (
          <div
            key={item.product.id}
            className="flex items-center gap-4 bg-white p-4 rounded-lg shadow-sm"
          >
            <img
              src={item.product.image || 'default-placeholder.png'}
              alt={item.product.name || 'Product Image'}
              className="w-20 h-20 object-cover rounded"
              onError={(e) => e.currentTarget.src = 'default-placeholder.png'}
            />
            <div className="flex-1">
              <h3 className="font-semibold">{item.product.name || 'Unnamed Product'}</h3>
              <p className="text-gray-600">${itemPrice.toFixed(2)}</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                className="p-1 hover:bg-gray-100 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={item.quantity <= 1}
              >
                <Minus size={16} />
              </button>
              <span className="w-8 text-center">{item.quantity || 0}</span>
              <button
                onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <Plus size={16} />
              </button>
            </div>
            <button
              onClick={() => dispatch({ type: 'REMOVE_FROM_CART', payload: item.product.id })}
              className="p-2 text-red-500 hover:bg-red-50 rounded"
              aria-label={`Remove ${item.product.name} from cart`}
            >
              <Trash2 size={20} />
            </button>
          </div>
        );
      })}
      <div className="border-t pt-4 mt-4">
        <div className="flex justify-between items-center">
          <span className="font-semibold">Total:</span>
          <span className="text-xl font-bold">${totalAmount.toFixed(2)}</span>
        </div>
        <button className="w-full mt-4 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors">
          Checkout
        </button>
      </div>
    </div>
  );
};