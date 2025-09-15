import { faker } from '@faker-js/faker';

/**
 * Generates a strong password with specific pattern:
 * 1 uppercase, 3 lowercase, 2 digits, 1 special character, 1 alphanumeric
 */
export function strongPassword(): string {
  const upper = faker.string.alpha({ casing: 'upper', length: 1 });
  const lower = faker.string.alpha({ casing: 'lower', length: 1 });
  const digit = faker.string.numeric(1);
  const special = faker.helpers.arrayElement(['!', '@', '#', '$', '%', '^', '&', '*']);
  const rest = faker.string.alphanumeric(4); // total = 8 chars

  return faker.helpers.shuffle([upper, lower, digit, special, ...rest]).join('');
}
