import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';


export class CheckoutPage extends BasePage {
  // Step One - information form
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;
  readonly continueButton: Locator;

  // Step Two - overview
  readonly itemTotalLabel: Locator;
  readonly finishButton: Locator;

  // Completion
  readonly completeHeader: Locator;
  readonly completeText: Locator;

  constructor(page: Page) {
    super(page);
    this.firstNameInput = page.locator('[data-test="firstName"]');
    this.lastNameInput = page.locator('[data-test="lastName"]');
    this.postalCodeInput = page.locator('[data-test="postalCode"]');
    this.continueButton = page.locator('[data-test="continue"]');

    this.itemTotalLabel = page.locator('.summary_subtotal_label');
    this.finishButton = page.locator('[data-test="finish"]');

    this.completeHeader = page.locator('.complete-header');
    this.completeText = page.locator('.complete-text');
  }

  async fillCheckoutInformation(firstName: string, lastName: string, postalCode: string): Promise<void> {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
    await this.continueButton.click();
  }

  /**
   * Reads the "Item total" (subtotal before tax) shown on the overview step
   * and returns it as a number, e.g. "Item total: $58.29" -> 58.29
   */
  async getItemsTotal(): Promise<number> {
    const text = (await this.itemTotalLabel.textContent())?.trim() ?? '';
    const match = text.match(/[\d.]+/);
    return match ? parseFloat(match[0]) : NaN;
  }

  async finishOrder(): Promise<void> {
    await this.finishButton.click();
  }

  async getCompleteHeaderText(): Promise<string> {
    return (await this.completeHeader.textContent())?.trim() ?? '';
  }

  async getCompleteBodyText(): Promise<string> {
    return (await this.completeText.textContent())?.trim() ?? '';
  }
}
