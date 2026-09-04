import { logSuiteEnd } from './logger';

/**
 * globalTeardown.ts
 * -----------------
 * Runs once after the entire Playwright test suite finishes.
 * Registered in playwright.config.ts.
 */
export default async function globalTeardown(): Promise<void> {
  logSuiteEnd();
}
