/**
 * Generates a random alphanumeric string of the given length.
 * param length number of characters to generate (default: 8)
 */

export function generateRandomString(length: number = 8): string {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

/**
 * Generates a random integer between min (inclusive) and max (inclusive).
 */
export function generateRandomNumber(min: number = 1, max: number = 1000): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Generates a unique, valid-looking email address.
 * Uses timestamp + random string to guarantee uniqueness across parallel runs.
 */
export function generateRandomEmail(domain: string = 'example.com'): string {
  const timestamp = Date.now();
  const randomPart = generateRandomString(6);
  return `qa.${randomPart}.${timestamp}@${domain}`;
}

/**
 * Generates a random-looking full customer name, useful for API order payloads.
 */
export function generateRandomCustomerName(): string {
  const firstNames = ['Omar', 'Layla', 'Yousef', 'Farah', 'Karim', 'Dana', 'Sami', 'Rana'];
  const lastNames = ['Haddad', 'Nasser', 'Khalil', 'Saleh', 'Odeh', 'Barakat'];
  const first = firstNames[Math.floor(Math.random() * firstNames.length)];
  const last = lastNames[Math.floor(Math.random() * lastNames.length)];
  return `${first} ${last} ${generateRandomString(4)}`;
}
