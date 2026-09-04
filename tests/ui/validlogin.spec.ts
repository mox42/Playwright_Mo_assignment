import { test, expect } from '../../src/fixtures/pageFixtures';
import loginData from '../../Testdata/loginData.json';

test.describe('SauceDemo - Login', () => {
  test('TC_UI_001 - Valid Login', async ({ page, loginPage, productsPage }) => {
    await loginPage.open();
    await loginPage.login(loginData.validUser.username, loginData.validUser.password);

    await expect(page).toHaveURL(/.*inventory\.html/);
    expect(await productsPage.isLoaded()).toBe(true);
    await expect(productsPage.pageTitle).toHaveText('Products');
  });
});
