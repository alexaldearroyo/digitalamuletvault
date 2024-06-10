// src/components/AddToCartButton.js

'use client';

import { useState } from 'react';

export default function AddToCartButton({ product }) {
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (e) => {
    const inputValue = parseInt(e.target.value, 10) || 0; // Ensure a valid number or 0
    setQuantity(inputValue < 1 ? 1 : inputValue); // Set to 1 if less than 1
  };

  const handleAddToCart = () => {
    // Logic to add to cart
    console.log(`Added ${product.name} to cart with quantity: ${quantity}`);
  };

  return (
    <div>
      <div className="flex items-center mb-4">
        <label htmlFor="quantity" className="mr-2">
          Quantity:
        </label>
        <input
          type="number"
          id="quantity"
          name="quantity"
          min="1" // Set minimum value to 1
          value={quantity}
          onChange={handleQuantityChange} // Use the modified change handler
          className="border p-2"
          data-test-id="product-quantity"
        />
      </div>
      <button
        onClick={handleAddToCart}
        className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600"
        data-test-id="product-add-to-cart"
      >
        Add to Cart
      </button>
    </div>
  );
}
