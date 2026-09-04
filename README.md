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
| `npx playwright test --ui` | Run UI tests only (Chromium + Firefox) |
| `npx playwright test --project=chromium` | Run UI tests on Chromium only |
| `npx playwright test --project=firefox` | Run UI tests on Firefox only |
| `npx playwright test --headed` | Run tests in headed (visible browser) mode |

Run a single spec file, e.g.:
```bash
npx playwright test tests/ui/checkout.spec.ts
```
`

## 6. Architecture Structure
```
playwright-automation/
├── .github/
│   └── workflows/
│       └── playwright.yml       # CI/CD: runs suite on push to main + daily at 3AM Jordan time
├── TestData/
│   └── loginData.json           # External data source for data-driven login tests
├── src/
│   ├── api/
│   │   └── BooksApiClient.ts    # Wraps Simple Books API endpoints (auth, orders)
│   ├── fixtures/
│   │   └── pageFixtures.ts      # Custom Playwright fixtures that auto-inject Page Objects
│   ├── pages/
│   │   ├── BasePage.ts          # Shared base class for all Page Objects
│   │   ├── LoginPage.ts         # Login screen locators & actions
│   │   ├── ProductsPage.ts      # Inventory listing + "most expensive product" logic
│   │   ├── CartPage.ts          # Shopping cart screen
│   │   └── CheckoutPage.ts      # Checkout info form + order overview + completion
│   └── utilities/
│       ├── randomDataGenerator.ts  # Random strings/emails/numbers for dynamic test data
│       ├── logger.ts               # Suite start/finish console logging helpers
│       ├── globalSetup.ts          # Registered in playwright.config.ts - logs suite start
│       └── globalTeardown.ts       # Registered in playwright.config.ts - logs suite finish
├── tests/
│   ├── ui/
│   │   ├── validlogin.spec.ts      # TC_UI_001 - Valid Login
│   │   ├── invalidLogin.spec.ts    # TC_UI_002 - Data-Driven Invalid Login
│   │   └── checkout.spec.ts        # TC_UI_003 - End-to-End Checkout Flow
│   └── api/
│       └── apiTest.spec.ts         # TC_API_001 & TC_API_002 - Create & Fetch Order
├── playwright-report/
│   └── index.html/               # Generated Playwright HTML report (git-ignored)
├── playwright.config.ts          # Browsers, projects, reporters, global setup/teardown
├── tsconfig.json
├── package.json
└── .gitignore
```

## 7. Test Scenarios

### UI Test Cases
| TC ID | Module | Test Name | Verifications |
|---|---|---|---|
| TC_UI_001 | Login | Valid Login | Valid credentials log in successfully and land on the Products page |
| TC_UI_002 | Login | Data-Driven Invalid Login Validation | No Username / No Password / Invalid Credentials each show the correct validation error, driven from `Testdata/loginData.json` |
| TC_UI_003 | Checkout | End-to-End Checkout Flow | Dynamically adds the 2 most expensive products, validates the pre-tax "Items total" is mathematically correct, completes checkout and asserts the order confirmation messages |

### API Test Cases
| TC ID | Module | Test Name | Verifications |
|---|---|---|---|
| TC_API_001 | Auth & Orders | [POST] Create New Book Order | Registers a dynamic API client to obtain a Bearer token, submits an order, asserts `201 Created` and a valid `orderId` in the response |
| TC_API_002 | Orders | [GET] Fetch Created Order | Retrieves the order created in TC_API_001, asserts `200 OK` and that `bookId`/`customerName` match what was submitted |

## 8. Viewing Reports
After a run, an HTML report is generated at `playwright-report/index.html`. Open it with:
```bash
npx playwright show-report
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
