import { logSuiteStart } from './logger';

/**
 * globalSetup.ts
 * --------------
 * Runs once before the entire Playwright test suite starts.
 */
export default async function globalSetup(): Promise<void> {
  logSuiteStart();
}
