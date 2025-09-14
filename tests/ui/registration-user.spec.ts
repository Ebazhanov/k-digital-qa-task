import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

const fakeUser = faker.person.firstName();
const fakeLastName = faker.person.lastName();
const fakePassword = faker.internet.password();
const fakeEmail = faker.internet.email({ firstName: fakeUser, lastName: fakeLastName });

test.describe('Registration Scenario (Success)', () => {
  test('Should register a new user with randomly generated data', async ({ page }) => {
    await page.goto('https://www.sofa.de/');
    await page.locator('[data-accept-action="all"]').click();
    await page.locator('.consentForm__container').waitFor({ state: 'hidden' });
    await page.getByTestId('headerBrandLogin').click();
    await page.getByTestId('registerAccount').click();
    await page.getByTestId('firstNameInput').fill(fakeUser);
    await page.getByTestId('lastNameInput').fill(fakeLastName);
    await page.locator('.accountNew #email').fill(fakeEmail);
    await page.getByTestId('passwordInput').fill(fakePassword);
    await page.getByTestId('password2Input').fill(fakePassword);
    await page.getByTestId('newsletterCheckbox').click();
    await page.getByTestId('agbCheckbox').click();
    await page.getByTestId('register-submit').click();
  });
});
