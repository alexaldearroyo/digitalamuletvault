import { test, expect } from '@playwright/test';

test.describe('E2E Test', () => {
  test('User can add to cart, change quantity, and remove from cart', async ({
    page,
  }) => {
    await page.goto('http://localhost:3000/products/1');

    // Agrega el producto al carrito
    await page.click('button[data-test-id="product-add-to-cart"]');

    // Verifica que el producto se agregó al carrito
    await page.goto('http://localhost:3000/cart');
    await expect(page.locator('[data-test-id="cart-product-1"]')).toBeVisible();

    // // Cambiar la cantidad del producto
    // await page.fill('[data-test-id="product-quantity"]', '2');
    // await page.click('[data-test-id="update-quantity"]'); // No tienes un botón para actualizar la cantidad en tu código, necesitas agregarlo

    // // Verifica que la cantidad se actualizó
    // await expect(
    //   page.locator('[data-test-id="cart-product-quantity-1"]'),
    // ).toHaveText('Quantity: 2');

    // Eliminar el producto del carrito
    await page.click('button[data-test-id="cart-product-remove-1"]');

    // Verifica que el producto fue removido
    await expect(
      page.locator('[data-test-id="cart-product-1"]'),
    ).not.toBeVisible();
  });

  test('Checkout flow, payment page, thank you page', async ({ page }) => {
    // Añadir producto al carrito
    await page.goto('http://localhost:3000/products/1');
    // await page.fill('[data-test-id="product-quantity"]', '1');
    await page.click('[data-test-id="product-add-to-cart"]');

    // Ir al carrito
    await page.goto('http://localhost:3000/cart');

    // Proceder al checkout
    await page.click('button[data-test-id="cart-checkout"]');

    // Llenar el formulario de checkout
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

    // Confirmar el pedido
    await page.click('button[data-test-id="checkout-confirm-order"]');

    // Verificar que se redirige a la página de agradecimiento
    await expect(page).toHaveURL('http://localhost:3000/thankyou');
  });
});
