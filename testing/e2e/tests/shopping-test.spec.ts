import { expect, test } from '@playwright/test';
import { CookiesPopup } from '../pages/cookiesPopup.js';
import { HomePage } from '../pages/homePage.js';
import { LoginPage } from '../pages/loginPage.js';

// Helper function to add a product to cart and return to category page
async function addProductToCart(page, productTestId: string, isFirst = false) {
  await page.getByTestId(productTestId).click();
  await page.getByTestId('addToCartButton').click();
  if (isFirst) {
    await page.getByTestId('zipCodeInput').fill('13127');
    await page
      .getByRole('complementary')
      .getByTestId('deliveryInfoList')
      .waitFor({ state: 'visible' });
    await page
      .getByTestId('overlayContent')
      .getByRole('button', { name: 'In den Warenkorb' })
      .click();
  } else {
    await expect(page.getByText('Gute Wahl!')).toBeVisible();
  }
  await page.goto('https://www.sofa.de/ecksofas');
}

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

    test.slow();

    await test.step('Login with correct credentials', async () => {
      await loginPage.emailField().fill('Desiree_Windler@gmail.com');
      await loginPage.passwordField().fill('8WqP*X82');
      await loginPage.loginSubmitButton().click();
      await loginPage.loginSubmitButton().waitFor({ state: 'hidden' });
      await expect(homePage.userAvatarMenu()).toHaveText('Desiree' + ' ' + 'Windler');
    });

    // Product #1
    await page.goto('https://www.sofa.de/ecksofas');
    await page.getByTestId('p-id-70400015').click();
    await page.getByTestId('addToCartButton').click();
    await page.getByTestId('zipCodeInput').fill('13127');
    await page
      .getByRole('complementary')
      .getByTestId('deliveryInfoList')
      .waitFor({ state: 'visible' });
    await page
      .getByTestId('overlayContent')
      .getByRole('button', { name: 'In den Warenkorb' })
      .click();
    await expect(page.getByText('Gute Wahl!')).toBeVisible();
    await page.getByTestId('cartOverlayToCartButton').click();

    // Product #2
    await page.goto('https://www.sofa.de/ecksofas');
    await page.getByTestId('p-id-60405482').click();
    await page.getByTestId('addToCartButton').click();
    await expect(page.getByText('Gute Wahl!')).toBeVisible();

    // Product #3
    await page.goto('https://www.sofa.de/ecksofas');
    await page.getByTestId('p-id-60406764').click();
    await page.getByTestId('addToCartButton').click();
    await expect(page.getByText('Gute Wahl!')).toBeVisible();

    // Product #4
    await page.goto('https://www.sofa.de/ecksofas');
    await page.getByTestId('p-id-60406767').click();
    await page.getByTestId('addToCartButton').click();
    await expect(page.getByText('Gute Wahl!')).toBeVisible();

    // Product #5
    await page.goto('https://www.sofa.de/ecksofas');
    await page.getByTestId('p-id-60406769').click();
    await page.getByTestId('addToCartButton').click();
    await expect(page.getByText('Gute Wahl!')).toBeVisible();

    // Verify all products are in the cart
    await page.getByTestId('cartOverlayToCartButton').click();

    await expect(
      page.locator('.cartEntry__articleName').filter({ hasText: /^smart Ecksofa Valdi$/ }),
    ).toBeVisible();
    await expect(
      page
        .locator('.cartEntry__articleName')
        .filter({ hasText: /^Selsey Ecksofa mit Schlaffunktion Dandelino$/ }),
    ).toBeVisible();
    await expect(
      page
        .locator('.cartEntry__articleName')
        .filter({ hasText: /^Selsey Ecksofa mit Schlaffunktion Carnos$/ }),
    ).toBeVisible();
    await expect(
      page
        .locator('.cartEntry__articleName')
        .filter({ hasText: /^Selsey Ecksofa mit Schlaffunktion Ovo$/ }),
    ).toBeVisible();
    await expect(
      page
        .locator('.cartEntry__articleName')
        .filter({ hasText: /^Selsey Ecksofa mit Schlaffunktion Volio$/ }),
    ).toBeVisible();
  });
});
