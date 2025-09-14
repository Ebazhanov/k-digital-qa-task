import test from '@playwright/test';
import { faker } from '@faker-js/faker';
import { CookiesPopup } from '../pages/cookiesPopup.js';
import { strongPassword } from '../util/strongPassword.js';
import { HomePage } from '../pages/homePage.js';

const fakeUser = faker.person.firstName();
const fakeLastName = faker.person.lastName();
const fakePassword = strongPassword();
const fakeEmail = faker.internet.email({ firstName: fakeUser, lastName: fakeLastName });

test.describe('Registration Scenario (Success)', () => {
  test('Should register a new user with randomly generated data', async ({ page }) => {
    const cookiesPopup = CookiesPopup(page);
    const homePage = HomePage(page);

    await test.step('Open the homepage', async () => {
      await page.goto('/');
    });

    await test.step('Accept cookies', async () => {
      await cookiesPopup.acceptAllButton().click();
      await cookiesPopup.consentFormPopup().waitFor({ state: 'hidden' });
    });

    await test.step('Open login menu', async () => {
      await homePage.loginMenu().click();
      await page.waitForURL('**/login');
    });

    await test.step('Open registration form', async () => {
      await page.getByTestId('registerAccount').click();
      await page.waitForURL('**/registrierung');
    });

    await test.step('Fill registration form', async () => {
      await page.getByTestId('accountNewSalutation').selectOption('Herr');
      await page.getByTestId('firstNameInput').fill(fakeUser);
      await page.getByTestId('lastNameInput').fill(fakeLastName);
      await page.locator('.accountNew #email').fill(fakeEmail);
      await page.getByTestId('passwordInput').fill(fakePassword);
      await page.getByTestId('password2Input').fill(fakePassword);
      await page.getByTestId('newsletterCheckbox').click();
      await page.getByTestId('agbCheckbox').click();
    });

    await test.step('Submit registration form', async () => {
      await page.getByTestId('register-submit').click();
      await page.waitForResponse((res) => res.url().includes('register') && res.status() === 200);
    });
  });
});
