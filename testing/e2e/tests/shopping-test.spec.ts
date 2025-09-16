import { expect, test } from '@playwright/test';
import { CookiesPopup } from '../pages/cookiesPopup.js';
import { HomePage } from '../pages/homePage.js';
import { LoginPage } from '../pages/loginPage.js';

test.describe.serial('Registration Scenario (Success)', () => {
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

  test('Should login with correct credentials', async ({ page }) => {
    const homePage = HomePage(page);
    const loginPage = LoginPage(page);

    await test.step('Login with correct credentials', async () => {
      await loginPage.emailField().fill('Desiree_Windler@gmail.com');
      await loginPage.passwordField().fill('8WqP*X82');
      await loginPage.loginSubmitButton().click();
      await expect(homePage.userAvatarMenu()).toHaveText('Desiree' + ' ' + 'Windler');
    });
  });
});
