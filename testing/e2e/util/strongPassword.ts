import { faker } from '@faker-js/faker';

export function strongPassword(): string {
  const upper = faker.string.alpha({ casing: 'upper', length: 1 });
  const lower = faker.string.alpha({ casing: 'lower', length: 1 });
  const digit = faker.string.numeric(1);
  const special = faker.helpers.arrayElement(['!', '@', '#', '$', '%', '^', '&', '*']);
  const allChars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
  const minLength = 8;
  const requiredChars = [upper, lower, digit, special];
  let rest = '';
  for (let i = 0; i < minLength - requiredChars.length; i++) {
    rest += allChars.charAt(Math.floor(Math.random() * allChars.length));
  }
  const base = [...requiredChars, ...rest.split('')];
  const password = faker.helpers.shuffle(base).join('');
  if (
    !/[a-z]/.test(password) ||
    !/[A-Z]/.test(password) ||
    !/[0-9]/.test(password) ||
    !/[!@#$%^&*]/.test(password) ||
    password.length < 8
  ) {
    return strongPassword();
  }
  return password;
}
