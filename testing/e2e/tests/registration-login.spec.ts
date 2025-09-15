import { test, type Page, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { CookiesPopup } from '../pages/cookiesPopup.js';
import { strongPassword } from '../util/strongPassword.js';
import { HomePage } from '../pages/homePage.js';
import { RegistrationPage } from '../pages/registrationPage.js';
import { LoginPage } from '../pages/loginPage.js';

const LOGIN_ERROR_MESSAGE = 'Benutzername nicht gefunden oder Passwort falsch.';

let fakeUser: string;
let fakeLastName: string;
let fakePassword: string;
let fakeEmail: string;

test.describe.serial('Registration Scenario (Success)', () => {
  test.beforeAll(async () => {
    fakeUser = faker.person.firstName();
    fakeLastName = faker.person.lastName();
    fakePassword = strongPassword();
    fakeEmail = faker.internet.email({ firstName: fakeUser, lastName: fakeLastName });
  });

  test.beforeEach(async ({ page }) => {
    const cookiesPopup = CookiesPopup(page);
    const homePage = HomePage(page);

    await test.step('Open the homepage', async () => {
      await page.goto('/');
    });

    await test.step('Accept cookies', async () => {
      await cookiesPopup.acceptAllButton().click();
      await cookiesPopup.consentFormPopup().waitFor({ state: 'hidden' });
    });

    await test.step('Navigate to login page', async () => {
      await homePage.userAvatarMenu().click();
    });
  });

  test('Should register a new user with randomly generated data', async ({
    page,
  }: {
    page: Page;
  }) => {
    const homePage = HomePage(page);
    const registrationPage = RegistrationPage(page);
    const loginPage = LoginPage(page);

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

  test('Should login with correct credentials', async ({ page }) => {
    const homePage = HomePage(page);
    const loginPage = LoginPage(page);

    await test.step('Login with correct credentials', async () => {
      await loginPage.emailField().fill(fakeEmail);
      await loginPage.passwordField().fill(fakePassword);
      await loginPage.loginSubmitButton().click();
      await expect(homePage.userAvatarMenu()).toHaveText(fakeUser + ' ' + fakeLastName);
    });
  });

  test('Should not login with wrong password', async ({ page }) => {
    const loginPage = LoginPage(page);

    await test.step('Login with wrong password', async () => {
      await loginPage.emailField().fill(fakeEmail);
      await expect(loginPage.emailField()).toHaveValue(fakeEmail);
      await loginPage.passwordField().fill('wrongPassword123!');
      await expect(loginPage.passwordField()).toHaveValue('wrongPassword123!');
      await loginPage.loginSubmitButton().click();
      await expect(page.getByText(LOGIN_ERROR_MESSAGE)).toBeVisible();
    });
  });
});
