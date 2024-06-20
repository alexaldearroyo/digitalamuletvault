import { test, expect } from '@playwright/test';

test.describe('Checkout Flow', () => {
  test('Checkout flow, payment page, thank you page', async ({ page }) => {
    // Go to products page
    await page.goto('/products/1');

    // Add products to cart
    await page.click('data-test-id=product-add-to-cart');

    // Go to cart
    await page.click('data-test-id=cart-link');

    // Go to checkout page
    await page.click('data-test-id=cart-checkout');

    // Fulfill checkout form
    await page.fill('data-test-id=checkout-first-name', 'John');
    await page.fill('data-test-id=checkout-last-name', 'Doe');
    await page.fill('data-test-id=checkout-email', 'john.doe@example.com');
    await page.fill('data-test-id=checkout-address', '123 Main St');
    await page.fill('data-test-id=checkout-city', 'Anytown');
    await page.fill('data-test-id=checkout-postal-code', '12345');
    await page.fill('data-test-id=checkout-country', 'USA');
    await page.fill('data-test-id=checkout-credit-card', '4111111111111111');
    await page.fill('data-test-id=checkout-expiration-date', '12/25');
    await page.fill('data-test-id=checkout-security-code', '123');

    // Confirm order
    await page.click('data-test-id=checkout-confirm-order');

    // Go to thankyou page
    await page.waitForURL('/thankyou');

    // Check thankyou page
    await expect(
      page.locator('h1:has-text("Thank you for your order")'),
    ).toHaveText('Thank you for your order');
  });
});
