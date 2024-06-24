import { test, expect } from '@playwright/test';

test.describe('E-commerce Complete Flow', () => {
  test('Complete e-commerce flow including cart manipulation and checkout', async ({
    page,
  }) => {
    // Navigate to a product page
    await page.goto('/products/1');
    // Add the product to the cart
    await page.click('[data-test-id="product-add-to-cart"]');

    // Go to the cart page
    await page.goto('/cart');

    // Change the product quantity in the cart
    await page.fill('[data-test-id="product-quantity"]', '2');
    await expect(page.locator('[data-test-id="product-quantity"]')).toHaveValue(
      '2',
    );

    // Remove the product from the cart
    await page.click('[data-test-id="cart-product-remove-1"]'); // Ajusta el ID según el producto real
    await expect(
      page.locator('[data-test-id="cart-product-1"]'),
    ).not.toBeVisible();

    // Verify cart is empty message
    await expect(page.locator('[data-test-id="cart-empty"]')).toBeVisible();

    // Add the product again for checkout
    await page.goto('/products/1');
    await page.click('[data-test-id="product-add-to-cart"]');

    // Proceed to checkout
    await page.goto('/cart');
    await page.click('[data-test-id="cart-checkout"]');

    // Fill in checkout details
    await page.fill('[data-test-id="checkout-first-name"]', 'Test User');
    await page.fill('[data-test-id="checkout-last-name"]', 'Tester');
    await page.fill('[data-test-id="checkout-email"]', 'testuser@example.com');
    await page.fill('[data-test-id="checkout-address"]', '123 Test St');
    await page.fill('[data-test-id="checkout-city"]', 'Testville');
    await page.fill('[data-test-id="checkout-postal-code"]', '12345');
    await page.fill('[data-test-id="checkout-country"]', 'Testland');
    await page.fill(
      '[data-test-id="checkout-credit-card"]',
      '4111111111111111',
    ); // Número de tarjeta de prueba
    await page.fill('[data-test-id="checkout-expiration-date"]', '12/25'); // Fecha de expiración de prueba
    await page.fill('[data-test-id="checkout-security-code"]', '123'); // Código de seguridad de prueba

    // Assuming there's a button to finalize the checkout process
    await page.click('[data-test-id="checkout-confirm-order"]');

    // Verify redirection to the thank you page
    await expect(page).toHaveURL('/thankyou');
    await expect(page.locator('text=Thank you for your order')).toBeVisible();
  });
});
