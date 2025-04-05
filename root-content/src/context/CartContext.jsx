import React, { createContext, useContext, useReducer } from 'react';

const CartContext = createContext(null);

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      if (!action.payload || typeof action.payload.id === 'undefined' || typeof action.payload.price !== 'number') {
        console.error('ADD_TO_CART: Invalid payload', action.payload);
        return state;
      }

      const existingItem = state.items.find(item => item.product.id === action.payload.id);

      if (existingItem) {
        const currentQuantity = typeof existingItem.quantity === 'number' ? existingItem.quantity : 0;
        return {
          ...state,
          items: state.items.map(item =>
            item.product.id === action.payload.id
              ? { ...item, quantity: currentQuantity + 1 }
              : item
          ),
          total: (state.total || 0) + action.payload.price
        };
      }

      return {
        ...state,
        items: [...state.items, { product: action.payload, quantity: 1 }],
        total: (state.total || 0) + action.payload.price
      };
    }

    case 'REMOVE_FROM_CART': {
      if (typeof action.payload === 'undefined') {
         console.error('REMOVE_FROM_CART: Invalid payload', action.payload);
         return state;
      }
      const itemToRemove = state.items.find(item => item.product.id === action.payload);
      const costToRemove = (itemToRemove && typeof itemToRemove.product.price === 'number' && typeof itemToRemove.quantity === 'number')
                         ? itemToRemove.product.price * itemToRemove.quantity
                         : 0;

      return {
        ...state,
        items: state.items.filter(item => item.product.id !== action.payload),
        total: (state.total || 0) - costToRemove
      };
    }

    case 'UPDATE_QUANTITY': {
      if (!action.payload || typeof action.payload.productId === 'undefined' || typeof action.payload.quantity !== 'number') {
         console.error('UPDATE_QUANTITY: Invalid payload', action.payload);
         return state;
      }
      const { productId, quantity } = action.payload;

      if (quantity < 1) {
          // Instead of just warning, filter out the item if quantity is less than 1
          const itemToRemove = state.items.find(item => item.product.id === productId);
          const costToRemove = (itemToRemove && typeof itemToRemove.product.price === 'number' && typeof itemToRemove.quantity === 'number')
                             ? itemToRemove.product.price * itemToRemove.quantity
                             : 0;
          return {
              ...state,
              items: state.items.filter(item => item.product.id !== productId),
              total: (state.total || 0) - costToRemove
          };
      }

      const itemToUpdate = state.items.find(item => item.product.id === productId);

      if (!itemToUpdate || typeof itemToUpdate.product.price !== 'number' || typeof itemToUpdate.quantity !== 'number') {
          console.error('UPDATE_QUANTITY: Item not found or invalid item structure for ID:', productId);
          return state;
      }

      const quantityDiff = quantity - itemToUpdate.quantity;
      const costDiff = itemToUpdate.product.price * quantityDiff;

      return {
        ...state,
        items: state.items.map(item =>
          item.product.id === productId
            ? { ...item, quantity }
            : item
        ),
        total: (state.total || 0) + costDiff
      };
    }

    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const initialState = { items: [], total: 0 };
  const [state, dispatch] = useReducer(cartReducer, initialState);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};