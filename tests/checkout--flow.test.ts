import { test, expect } from '@playwright/test';

test.describe('Checkout Flow Test', () => {
  test('Checkout flow, payment page, thank you page', async ({ page }) => {
    // Add product to the cart
    await page.goto('http://localhost:3000/products/1');
    await page.click('button[data-test-id="product-add-to-cart"]');

    // Go to the cart
    await page.goto('http://localhost:3000/cart');

    // Proceed to checkout
    await page.click('button[data-test-id="cart-checkout"]');

    // Fill out the checkout form
    await page.fill('input[data-test-id="checkout-first-name"]', 'John');
    await page.fill('input[data-test-id="checkout-last-name"]', 'Doe');
    await page.fill(
      'input[data-test-id="checkout-email"]',
      'john.doe@example.com',
    );
    await page.fill('input[data-test-id="checkout-address"]', '123 Main St');
    await page.fill('input[data-test-id="checkout-city"]', 'Anytown');
    await page.fill('input[data-test-id="checkout-postal-code"]', '12345');
    await page.fill('input[data-test-id="checkout-country"]', 'USA');
    await page.fill(
      'input[data-test-id="checkout-credit-card"]',
      '4111111111111111',
    );
    await page.fill('input[data-test-id="checkout-expiration-date"]', '12/25');
    await page.fill('input[data-test-id="checkout-security-code"]', '123');

    // Confirm the order
    await page.click('button[data-test-id="checkout-confirm-order"]');

    // Verify that it redirects to the thank you page
    await expect(page).toHaveURL('http://localhost:3000/thankyou');
  });
});
