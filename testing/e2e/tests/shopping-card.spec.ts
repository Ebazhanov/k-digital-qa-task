import { test, type Page, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { CookiesPopup } from '../pages/cookiesPopup.js';
import { strongPassword } from '../util/strongPassword.js';
import { HomePage } from '../pages/homePage.js';
import { RegistrationPage } from '../pages/registrationPage.js';
import { LoginPage } from '../pages/loginPage.js';

let fakeUser: string;
let fakeLastName: string;
let fakePassword: string;
let fakeEmail: string;

test.describe.serial('Shopping Scenario', () => {
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

  test('Should register a new user', async ({ page }: { page: Page }) => {
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

  test('Should add to wischlist then to warencord', async ({ page }) => {
    const homePage = HomePage(page);
    const loginPage = LoginPage(page);

    await test.step('Login with correct credentials', async () => {
      await loginPage.emailField().fill(fakeEmail);
      await loginPage.passwordField().fill(fakePassword);
      await loginPage.loginSubmitButton().click();
      await loginPage.loginSubmitButton().waitFor({ state: 'hidden' });
      await expect(homePage.userAvatarMenu()).toHaveText(fakeUser + ' ' + fakeLastName);
    });

    // Product #1
    await page.goto('https://www.sofa.de/ecksofas');
    await page.locator('[data-testid="p-id-60406729"] [data-testid="wishlistHeart"]').click();
    await page
      .locator('[data-testid="p-id-60406729"] [data-testid="wishlistHeartFilled"]')
      .waitFor({ state: 'visible' });
    await page.locator('[data-testid="p-id-60408061"] [data-testid="wishlistHeart"]').click();
    await page
      .locator('[data-testid="p-id-60408061"] [data-testid="wishlistHeartFilled"]')
      .waitFor({ state: 'visible' });
    await page.locator('[data-testid="p-id-60405810"] [data-testid="wishlistHeart"]').click();
    await page
      .locator('[data-testid="p-id-60405810"] [data-testid="wishlistHeartFilled"]')
      .waitFor({ state: 'visible' });
    await page.locator('[data-testid="p-id-60408053"] [data-testid="wishlistHeart"]').click();
    await page
      .locator('[data-testid="p-id-60408053"] [data-testid="wishlistHeartFilled"]')
      .waitFor({ state: 'visible' });
    await page.locator('[data-testid="p-id-60406772"] [data-testid="wishlistHeart"]').click();
    await page
      .locator('[data-testid="p-id-60406772"] [data-testid="wishlistHeartFilled"]')
      .waitFor({ state: 'visible' });

    await page.getByTestId('headerBrandWishlist').click();
    await page
      .locator('.wishlist__postalCodeArea [data-testid="zipcode-logistic-inputInput"]')
      .clear();
    await page.waitForTimeout(500);
    await page
      .locator('.wishlist__postalCodeArea [data-testid="zipcode-logistic-inputInput"]')
      .fill('13127');
    await page.getByTestId('addAddToWishlist').click();
    await expect(page.locator('#overlayRight').getByText('Gute Wahl!')).toBeVisible();
    await page.getByRole('link', { name: 'Zum Warenkorb' }).click();

    await expect(
      page
        .locator('.cartEntry__articleName .simpleText')
        .filter({ hasText: /^Ecksofa mit Schlaffunktion Hamiel$/ }),
    ).toBeVisible();
    await expect(
      page.locator('.cartEntry__articleName .simpleText').filter({ hasText: /^Orto Ecksofa$/ }),
    ).toBeVisible();
    await page
      .locator('.cartEntry__articleName .simpleText')
      .filter({ hasText: /^Ecksofa mit Schlaffunktion Nalika$/ })
      .scrollIntoViewIfNeeded();
    await expect(
      page
        .locator('.cartEntry__articleName .simpleText')
        .filter({ hasText: /^Ecksofa mit Schlaffunktion Nalika$/ }),
    ).toBeVisible();
    await expect(
      page
        .locator('.cartEntry__articleName .simpleText')
        .filter({ hasText: /^Ecksofa mit Schlaffunktion Stevil$/ }),
    ).toBeVisible();
    await expect(
      page
        .locator('.cartEntry__articleName .simpleText')
        .filter({ hasText: /^Ecksofa mit Schlaffunktion Farese$/ }),
    ).toBeVisible();
  });
});
