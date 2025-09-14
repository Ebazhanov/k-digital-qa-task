import { faker } from '@faker-js/faker';

/**
 * Generates a strong password that matches the following pattern:
 * - 1 uppercase letter
 * - 3 lowercase letters
 * - 2 digits
 * - 1 special character (!@#$%^&*)
 * - 1 alphanumeric character
 *
 * Example output: Abcd12!x
 */
export function strongPassword(): string {
  return (
    faker.helpers.fromRegExp(/[A-Z]{1}[a-z]{3}[0-9]{2}[!@#$%^&*]{1}/) + faker.string.alphanumeric(1)
  );
}
