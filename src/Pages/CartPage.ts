import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * CartPage
 * --------
 * Represents the shopping cart screen. Responsible for kicking off checkout.
 */
export class CartPage extends BasePage {
  readonly checkoutButton: Locator;
  readonly cartItems: Locator;

  constructor(page: Page) {
    super(page);
    this.checkoutButton = page.getByRole('button', { name: 'Checkout' });
    this.cartItems = page.locator('.cart_item');
  }

  async proceedToCheckout(): Promise<void> {
    await this.checkoutButton.click();
  }
}
