import { test, expect } from '../../src/fixtures/pageFixtures';
import loginData from '../../Testdata/loginData.json';

test.describe('SauceDemo - Invalid Login Validation', () => {
  for (const scenario of loginData.invalidLoginScenarios) {
    test(`TC_UI_002 - ${scenario.scenarioName}`, async ({ loginPage }) => {
      await loginPage.open();
      await loginPage.login(scenario.username, scenario.password);

      await expect(loginPage.errorMessage).toBeVisible();
      const actualError = await loginPage.getErrorMessageText();
      expect(actualError).toContain(scenario.expectedError);
    });
  }
});
