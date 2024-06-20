import { test, expect } from '@playwright/test';

test.describe('Remove from Cart Flow', () => {
  test.beforeEach(async ({ page }) => {
    // Go to product page
    await page.goto('/products/1');

    // Add product to cart
    await page.click('data-test-id=product-add-to-cart');
  });

  test('Remove product from cart', async ({ page }) => {
    // Go to cart
    await page.click('data-test-id=cart-link');

    // Remove product from cart
    await page.click('data-test-id=cart-product-remove-1');
    await expect(page.locator('data-test-id=cart-count')).toHaveText('0');
  });
});
