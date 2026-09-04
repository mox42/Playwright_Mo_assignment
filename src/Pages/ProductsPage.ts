import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';



export class ProductsPage extends BasePage {
  readonly pageTitle: Locator;
  readonly inventoryItems: Locator;
  readonly cartIcon: Locator;

  constructor(page: Page) {
    super(page);
    this.pageTitle = page.locator('.title');
    this.inventoryItems = page.locator('.inventory_item');
    this.cartIcon = page.locator('.shopping_cart_link');
  }

  async isLoaded(): Promise<boolean> {
    return this.page.url().includes('/inventory.html');
  }

  /**
   * Reads every product's name and price from the DOM, sorts descending by
   * price and returns the top `count` items. This keeps TC_UI_003 resilient
   * to catalog changes instead of hardcoding specific product names.
   */
  async getMostExpensiveProducts(count: number): Promise<{ name: string; price: number }[]> {
    const items = await this.inventoryItems.all();
    const products: { name: string; price: number }[] = [];

    for (const item of items) {
      const name = (await item.locator('.inventory_item_name').textContent())?.trim() ?? '';
      const priceText = (await item.locator('.inventory_item_price').textContent())?.trim() ?? '$0';
      const price = parseFloat(priceText.replace('$', ''));
      products.push({ name, price });
    }

    return products.sort((a, b) => b.price - a.price).slice(0, count);
  }

  async addProductToCartByName(productName: string): Promise<void> {
    const item = this.inventoryItems.filter({ hasText: productName });
    await item.getByRole('button', { name: /Add to cart/i }).click();
  }

  async goToCart(): Promise<void> {
    await this.cartIcon.click();
  }
}
