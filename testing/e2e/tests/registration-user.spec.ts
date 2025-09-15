import { test, type Page, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { CookiesPopup } from '../pages/cookiesPopup.js';
import { strongPassword } from '../util/strongPassword.js';
import { HomePage } from '../pages/homePage.js';
import { RegistrationPage } from '../pages/registrationPage.js';
import { LoginPage } from '../pages/loginPage.js';

const fakeUser = faker.person.firstName();
const fakeLastName = faker.person.lastName();
const fakePassword = strongPassword();
const fakeEmail = faker.internet.email({ firstName: fakeUser, lastName: fakeLastName });

test.describe('Registration Scenario (Success)', () => {
  test('Should register a new user with randomly generated data', async ({
    page,
  }: {
    page: Page;
  }) => {
    const cookiesPopup = CookiesPopup(page);
    const homePage = HomePage(page);
    const registrationPage = RegistrationPage(page);
    const loginPage = LoginPage(page);

    await test.step('Open the homepage and accept cookies', async () => {
      await page.goto('/');
      await cookiesPopup.acceptAllButton().click();
      await cookiesPopup.consentFormPopup().waitFor({ state: 'hidden' });
    });

    await test.step('Navigate to login page', async () => {
      await homePage.userAvatarMenu().click();
      await page.waitForURL('**/login');
    });

    await test.step('Open registration form', async () => {
      await loginPage.registerAccountButton().click();
      await page.waitForURL('**/registrierung');
    });

    await test.step('Fill registration form', async () => {
      await registrationPage.salutationMenu().selectOption('Herr');
      await registrationPage.firstNameField().fill(fakeUser);
      await registrationPage.lastNameField().fill(fakeLastName);
      await registrationPage.emailField().fill(fakeEmail);
      await registrationPage.passwordField().fill(fakePassword);
      await registrationPage.repeatPasswordField().fill(fakePassword);
      await registrationPage.newsLetterCheckbox().click();
      await registrationPage.agbCheckbox().click();
    });

    await test.step('Submit registration form', async () => {
      await registrationPage.submitButton().click();
      await page.waitForResponse((res) => res.url().includes('register') && res.status() === 200);
    });

    await test.step('Verify successfully registered User', async () => {
      await expect(homePage.userAvatarMenu()).toHaveText(fakeUser + ' ' + fakeLastName);
    });
  });
});
