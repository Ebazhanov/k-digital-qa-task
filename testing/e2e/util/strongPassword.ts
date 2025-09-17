import { faker } from '@faker-js/faker';

export function strongPassword(): string {
  const upper = faker.string.alpha({ casing: 'upper', length: 1 });
  const lower = faker.string.alpha({ casing: 'lower', length: 1 });
  const digit = faker.string.numeric(1);
  const special = faker.helpers.arrayElement(['!', '@', '#', '$', '%', '^', '&', '*']);
  const allChars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
  const restLength = 6; // insgesamt 10 - 4 erforderlich
  let rest = '';
  for (let i = 0; i < restLength; i++) {
    rest += allChars.charAt(Math.floor(Math.random() * allChars.length));
  }
  const base = [upper, lower, digit, special, ...rest.split('')];
  return faker.helpers.shuffle(base).join('');
}
