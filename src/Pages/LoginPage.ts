import { expect, type Locator, type Page } from "@playwright/test"; // Import expect, Locator, and Page from Playwright
import { BasePage } from "./BasePage"; // Import BasePage from the BasePage file

export class LoginPage extends BasePage {
    //=====================Locators=======================
    readonly usernameInput: Locator; // Create a variable for the username textbox
    readonly passwordInput: Locator; // Create a variable for the password textbox
    readonly loginButton: Locator; // Create a variable for the login button
    readonly SuccessfulloginMessage: Locator; // Create a variable for the successful login message
    readonly errorMessage: Locator;
    //=====================Variables=======================
    readonly url: string = "https://www.saucedemo.com//"; // Create a variable for the URL
    //=====================Constructor=======================
    constructor(page: Page) {
        super(page);
        this.usernameInput = page.getByPlaceholder('Username'); // Set the username textbox locator
        this.passwordInput = page.getByPlaceholder('Password'); // Set the password textbox locator
        this.loginButton = page.getByRole('button', { name: 'Login' }); // Set the login button locator
        this.SuccessfulloginMessage = page.locator("//span[@class='title']"); // Set the successful login message locator
        this.errorMessage = page.locator('[data-test="error"]');
    }
    //=====================Methods=======================
    //---------------------Actions---------------------
    async open(){
        await this.page.goto(this.url); // Open the URL
    }

    async login(username: string, password: string){
        await this.usernameInput.fill(username); // Fill in the username textbox
        await this.passwordInput.fill(password); // Fill in the password textbox
        await this.loginButton.click(); // Click the login button
    }

    //---------------------Assertions---------------------
    async assertSuccessfulLogin(){
        await expect(this.SuccessfulloginMessage).toHaveText("Products"); // Verify the successful login message
    }

    async getErrorMessageText(): Promise<string> {
    return (await this.errorMessage.textContent())?.trim() ?? '';
  }

}