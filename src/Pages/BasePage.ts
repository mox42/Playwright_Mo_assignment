import { Page } from '@playwright/test';

/**
 * BasePage
 * --------
 * Shared parent for all Page Objects. Holds the Playwright `page` instance
 * and any cross-cutting helpers (navigation, waits) so individual page
 * classes stay focused on their own locators/actions.
 */
export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto(url: string): Promise<void> {
    await this.page.goto(url);
  }
}
