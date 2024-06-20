'use client';

import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { TextField, Button } from '@mui/material';

export default function AddToCartButton({ product }) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const handleQuantityChange = (e) => {
    const inputValue = parseInt(e.target.value, 10) || 0; // Ensure a valid number or 0
    setQuantity(inputValue < 1 ? 1 : inputValue); // Set to 1 if less than 1
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  return (
    <div>
      <div className="flex items-center mt-5 mb-4">
        <TextField
          type="number"
          id="quantity"
          name="quantity"
          label="Quantity"
          variant="outlined"
          size="small"
          value={quantity}
          onChange={handleQuantityChange}
          inputProps={{ min: 1 }}
          data-test-id="product-quantity"
          sx={{ marginRight: '1rem', width: '100px', backgroundColor: 'white' }}
        />
      </div>
      <button
        onClick={handleAddToCart}
        className="btn-turqoise mt-5"
        data-test-id="product-add-to-cart"
      >
        Add to Cart
      </button>
      <button
        onClick={handleAddToCart}
        className="btn-turqoise mt-5"
        data-test-id="update-quantity"
      >
        Update Quantity
      </button>
    </div>
  );
}
