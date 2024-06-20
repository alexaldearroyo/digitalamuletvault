import { test, expect } from '@playwright/test';

test.describe('Add to Cart Flow', () => {
  test('Add product to cart', async ({ page }) => {
    // Go to product page
    await page.goto('/products/1');

    // Add product to cart
    await page.click('data-test-id=product-add-to-cart');
    await expect(page.locator('data-test-id=cart-count')).toHaveText('1');
  });
});
