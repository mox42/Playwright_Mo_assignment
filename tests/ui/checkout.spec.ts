import { test, expect } from '../../src/fixtures/pageFixtures';
import { generateRandomString } from '../../src/utilities/randomDataGenerator';
import loginData from '../../Testdata/loginData.json';


test.describe('SauceDemo - End-to-End Checkout Flow', () => {
  test('TC_UI_003 - End-to-End Checkout Flow', async ({
    page,
    loginPage,
    productsPage,
    cartPage,
    checkoutPage,
  }) => {
    // Step 1: Login with valid credentials
    await loginPage.open();
    await loginPage.login(loginData.validUser.username, loginData.validUser.password);

    // Step 2: Verify successful navigation to the Products page
    await expect(page).toHaveURL(/.*inventory\.html/);


    // Step 3: Dynamically find the two most expensive products and add them to the cart
    const topProducts = await productsPage.getMostExpensiveProducts(2);
    expect(topProducts).toHaveLength(2);

    for (const product of topProducts) {
      await productsPage.addProductToCartByName(product.name);
    }

    const expectedSubtotal = parseFloat((topProducts[0].price + topProducts[1].price).toFixed(2));

    // Step 4: Navigate to the cart and proceed to checkout
    await productsPage.goToCart();
    await cartPage.proceedToCheckout();

    // Step 5: Fill out the checkout information form and continue
    await checkoutPage.fillCheckoutInformation('Mo', 'QA', generateRandomString(5));

    // Step 6: Verify the "Items total" before taxes is mathematically correct
    const actualSubtotal = await checkoutPage.getItemsTotal();
    expect(actualSubtotal).toBeCloseTo(expectedSubtotal, 2);

    // Step 7: Click Finish and assert the final order dispatch messages
    await checkoutPage.finishOrder();
    await expect(checkoutPage.completeHeader).toBeVisible();
    expect(await checkoutPage.getCompleteHeaderText()).toBe('Thank you for your order!');
    expect(await checkoutPage.getCompleteBodyText()).toContain('Your order has been dispatched');
  });

  });

