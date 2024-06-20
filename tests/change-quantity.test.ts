import { test, expect } from '@playwright/test';

test.describe('Change Quantity Flow', () => {
  test.beforeEach(async ({ page }) => {
    // Go to product page
    await page.goto('/products/1');

    // Add product to cart
    await page.click('[data-test-id="product-add-to-cart"]');
  });

  test('Change product quantity in cart', async ({ page }) => {
    // Go to cart
    await page.click('[data-test-id="cart-link"]');

    // Ensure quantity input is visible and enabled
    const quantityInput = page.locator(
      '[data-test-id="product-quantity"] input',
    );
    await expect(quantityInput).toBeVisible();
    await expect(quantityInput).toBeEnabled();

    // Change quantity
    await quantityInput.fill('2');

    // Click 'Update Quantity' button to update the cart with the new quantity
    await page.click('[data-test-id="update-quantity"]');

    // Verify updated quantity in cart (you can verify by checking the total price or other indicators)
    // const cartTotal = page.locator('[data-test-id="cart-total"]');
    // await expect(cartTotal).toContainText(
    //   'some expected value based on quantity change',
    // );
  });
});
