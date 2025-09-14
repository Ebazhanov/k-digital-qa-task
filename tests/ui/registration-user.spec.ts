import test from '@playwright/test';
import { faker } from '@faker-js/faker';

function strongPassword(): string {
  return (
    faker.helpers.fromRegExp(/[A-Z]{1}[a-z]{3}[0-9]{2}[!@#$%^&*]{1}/) + faker.string.alphanumeric(1)
  );
}

const fakeUser = faker.person.firstName();
const fakeLastName = faker.person.lastName();
const fakePassword = strongPassword();
const fakeEmail = faker.internet.email({ firstName: fakeUser, lastName: fakeLastName });

test.describe('Registration Scenario (Success)', () => {
  test('Should register a new user with randomly generated data', async ({ page }) => {
    await page.goto('https://www.sofa.de/');
    await page.locator('[data-accept-action="all"]').click();
    await page.locator('.consentForm__container').waitFor({ state: 'hidden' });
    await page.getByTestId('headerBrandLogin').click();
    await page.getByTestId('registerAccount').click();
    await page.getByTestId('accountNewSalutation').selectOption('Herr');
    await page.getByTestId('firstNameInput').fill(fakeUser);
    await page.getByTestId('lastNameInput').fill(fakeLastName);
    await page.locator('.accountNew #email').fill(fakeEmail);
    await page.getByTestId('passwordInput').fill(fakePassword);
    await page.getByTestId('password2Input').fill(fakePassword);
    await page.getByTestId('newsletterCheckbox').click();
    await page.getByTestId('agbCheckbox').click();
    await page.getByTestId('register-submit').click();
    await page.waitForResponse((res) => res.url().includes('register') && res.status() === 200);
  });
});
