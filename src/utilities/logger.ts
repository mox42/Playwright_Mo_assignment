/**
 * logger.ts
 * ---------
 * Minimal console logger used by global setup/teardown to clearly mark the
 * start and end of the whole test suite run, with a timestamp.
 */
function getJordanTimestamp(): string {
  return new Date().toLocaleString('en-GB', {
    timeZone: 'Asia/Amman',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });
}

export function logSuiteStart(): void {
  const now = getJordanTimestamp();
  console.log('==========================================================');
  console.log(`🚀 TEST SUITE STARTED  |  ${now}`);
  console.log('==========================================================');
}

export function logSuiteEnd(): void {
  const now = getJordanTimestamp();
  console.log('==========================================================');
  console.log(`🏁 TEST SUITE FINISHED |  ${now}`);
  console.log('==========================================================');
}