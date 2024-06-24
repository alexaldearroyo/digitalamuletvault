import { test, expect } from '@playwright/test';

test.describe('Add and Remove Cart Test', () => {
  test('User can add to cart, change quantity, and remove from cart', async ({
    page,
  }) => {
    await page.goto('http://localhost:3000/products/1');

    // Add the product to the cart
    await page.click('button[data-test-id="product-add-to-cart"]');

    // Verify that the product was added to the cart
    await page.goto('http://localhost:3000/cart');
    await expect(page.locator('[data-test-id="cart-product-1"]')).toBeVisible();

    // Remove the product from the cart
    await page.click('button[data-test-id="cart-product-remove-1"]');

    // Verify that the product was removed
    await expect(
      page.locator('[data-test-id="cart-product-1"]'),
    ).not.toBeVisible();
  });
});
