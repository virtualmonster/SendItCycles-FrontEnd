import { useReducer, useCallback } from 'react';

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItem = state.items.find(
        (item) => item.product_id === action.payload.product_id && item.frameSize === action.payload.frameSize
      );
      if (existingItem) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.product_id === action.payload.product_id && item.frameSize === action.payload.frameSize
              ? { ...item, quantity: item.quantity + action.payload.quantity }
              : item
          ),
        };
      }
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    }
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(
          (item) => !(item.product_id === action.payload.product_id && item.frameSize === action.payload.frameSize)
        ),
      };
    case 'UPDATE_QUANTITY':
      return {
        ...state,
        items: state.items.map((item) =>
          item.product_id === action.payload.product_id && item.frameSize === action.payload.frameSize
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };
    case 'CLEAR_CART':
      return { items: [] };
    default:
      return state;
  }
};

export const useCart = () => {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  const addItem = useCallback((product_id, quantity = 1, frameSize = 'M') => {
    dispatch({ type: 'ADD_ITEM', payload: { product_id, quantity, frameSize } });
  }, []);

  const removeItem = useCallback((product_id, frameSize) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { product_id, frameSize } });
  }, []);

  const updateQuantity = useCallback((product_id, quantity, frameSize) => {
    if (quantity <= 0) {
      removeItem(product_id, frameSize);
    } else {
      dispatch({ type: 'UPDATE_QUANTITY', payload: { product_id, quantity, frameSize } });
    }
  }, [removeItem]);

  const clearCart = useCallback(() => {
    dispatch({ type: 'CLEAR_CART' });
  }, []);

  return {
    items: state.items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
  };
};
