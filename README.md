# Playwright Automation Framework — SauceDemo (UI) & Simple Books API

## 1. Project Title
**playwright-automation** — Junior QA Automation Engineer Technical Assessment

## 2. Project Description
A Playwright (TypeScript) test automation framework built with the Page Object Model. It covers three end-to-end UI scenarios on [SauceDemo](https://www.saucedemo.com/) (valid login, data-driven invalid login, and a full checkout flow) and two API scenarios against the [Simple Books API](https://simple-books-api.click) (create an order, fetch an order), using Playwright's native request context and browser automation across Chromium and Firefox.

## 3. Prerequisites
Make sure the following are installed before setup:

| Tool | Required Version |
|---|---|
| Node.js | v18.x or v20.x (LTS) |
| npm | v9+ (bundled with Node.js) |

Verify with:
```bash
node -v
npm -v
```

## 4. Setup & Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/<your-username>/playwright-automation.git
   cd playwright-automation
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Install Playwright browsers (Chromium & Firefox):
   ```bash
   npx playwright install --with-deps chromium firefox
   ```

## 5. Running Tests

| Command | Description |
|---|---|
| `npx playwright test` | Run the full suite (UI + API) on all configured projects |
| `npm run test:ui` | Run UI tests only (Chromium + Firefox) |
| `npm run test:api` | Run API tests only |
| `npm run test:chromium` | Run UI tests on Chromium only |
| `npm run test:firefox` | Run UI tests on Firefox only |
| `npm run test:headed` | Run tests in headed (visible browser) mode |

Run a single spec file, e.g.:
```bash
npx playwright test tests/ui/checkout.spec.ts
```

## 6. Viewing Reports
After a run, an HTML report is generated at `playwright-report/html-report/`. Open it with:
```bash
npm run report
```
This launches a local server and opens the interactive report (test results, traces, screenshots, and videos for any failures) in your default browser.

---

## Notes on Framework Design
- **Locator strategy**: prioritizes `data-test` attributes and accessible roles/placeholders (`getByRole`, `getByPlaceholder`) over brittle CSS/XPath selectors, per the assignment's code quality criteria.
- **No hardcoded waits**: all synchronization relies on Playwright's built-in auto-waiting and web-first assertions (`expect(locator).toBeVisible()`, etc.) — no `page.waitForTimeout()` sleeps.
- **Data-driven execution**: login test data lives in `data/loginData.json` and is looped over in `invalidLogin.spec.ts`.
- **Dynamic values**: `src/utils/randomDataGenerator.ts` produces unique emails, customer names, and postal codes so re-running the suite never collides with prior test data (important for the Simple Books API's one-client-per-email registration).
- **Global logging**: `globalSetup`/`globalTeardown` print a clear banner marking exactly when the whole suite begins and ends, regardless of how many workers/projects run.
- **Bonus — Fixtures**: `src/fixtures/pageFixtures.ts` extends Playwright's base `test` so Page Objects (`loginPage`, `productsPage`, `cartPage`, `checkoutPage`) are automatically instantiated and injected into each test, instead of manual `new LoginPage(page)` calls.
- **Bonus — CI/CD**: `.github/workflows/playwright.yml` runs the full suite headlessly on every push to `main` and daily at 3:00 AM Jordan time, uploading the HTML report as a build artifact.
