import { test, type Page, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { CookiesPopup } from '../pages/cookiesPopup.js';
import { strongPassword } from '../util/strongPassword.js';
import { HomePage } from '../pages/homePage.js';
import { RegistrationPage } from '../pages/registrationPage.js';
import { LoginPage } from '../pages/loginPage.js';
import { ProductPage } from '../pages/productPage';
import { WishListPage } from '../pages/wishListPage';
import { ToShopCardDialog } from '../pages/common/toShopCardDialog';
import { ShoppingBasketPage } from '../pages/shoppingBasketPage';

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
      //await page.waitForURL('**/registrierung');
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

  test('Should add five products to wishlist and verify in cart', async ({ page }) => {
    const homePage = HomePage(page);
    const loginPage = LoginPage(page);
    const productPage = ProductPage(page);
    const wishListPage = WishListPage(page);
    const toShopCardDialog = ToShopCardDialog(page);
    const shoppingBasketPage = ShoppingBasketPage(page);

    const productIds = ['60406729', '60408061', '60405810', '60408053', '60406772'];
    const productsInfo: { id: string; name: string; price: string }[] = [];

    await test.step('Login with correct credentials', async () => {
      await loginPage.emailField().fill(fakeEmail);
      await loginPage.passwordField().fill(fakePassword);
      await loginPage.loginSubmitButton().click();
      await loginPage.loginSubmitButton().waitFor({ state: 'hidden' });
      await expect(homePage.userAvatarMenu()).toHaveText(fakeUser + ' ' + fakeLastName);
    });

    await test.step('Add five products to wishlist', async () => {
      await page.goto('/ecksofas');
      for (const id of productIds) {
        await productPage.productWishListHeartIconById(id).click();
        await productPage.productWishListSelectedIconById(id).waitFor({ state: 'visible' });
      }
    });

    await test.step('Save price and product name before adding', async () => {
      for (const id of productIds) {
        const name = await page
          .locator(`[data-testid="p-id-${id}"] [data-testid="product-title"]`)
          .innerText();
        const price = await page
          .locator(`[data-testid="p-id-${id}"] [data-testid="orgp"]`)
          .innerText();
        productsInfo.push({ id, name, price });
      }
    });

    await test.step('Go to wishlist and prepare for adding to basket', async () => {
      await homePage.userWishList().click();
      await wishListPage.zipCodeField().clear();
      await page.waitForTimeout(500); //TODO should be improved
      await wishListPage.zipCodeField().fill('13127');
      await wishListPage.addToWishList().click();
      await expect(toShopCardDialog.assertSuccessMessage('Gute Wahl!')).toBeVisible();
      await toShopCardDialog.toShoppingCardButton().click();
    });

    await test.step('Verify all products are in the basket', async () => {
      for (const product of productsInfo) {
        await expect(
          shoppingBasketPage.articleName().filter({ hasText: product.name }),
        ).toBeVisible();
        // Optionally, you can also check the price if needed
        // await expect(shoppingBasketPage.articlePrice().filter({ hasText: product.price })).toBeVisible();
      }
    });
  });
});
