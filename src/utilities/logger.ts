/**
 * logger.ts
 * ---------
 * Minimal console logger used by global setup/teardown to clearly mark the
 * start and end of the whole test suite run, with a timestamp.
 */
export function logSuiteStart(): void {
  const now = new Date().toISOString();
  console.log('==========================================================');
  console.log(`🚀 TEST SUITE STARTED  |  ${now}`);
  console.log('==========================================================');
}

export function logSuiteEnd(): void {
  const now = new Date().toISOString();
  console.log('==========================================================');
  console.log(`🏁 TEST SUITE FINISHED |  ${now}`);
  console.log('==========================================================');
}
