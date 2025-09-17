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

const productIds = ['60406729', '60408061', '60405810', '60408053', '60406686'];
const productsInfo: { id: string; name: string; price: string }[] = [];
const expectedPrices: Record<string, string> = {
  '60406729': '989,00',
  '60405810': '709,00',
  '60408053': '659,00',
  '60406686': '989,00',
  '60408061': '869,00',
};

test.describe.serial('Shopping Scenario', () => {
  test.beforeAll(async () => {
    fakeUser = faker.person.firstName();
    fakeLastName = faker.person.lastName();
    fakePassword = strongPassword();
    fakeEmail = faker.internet.email({ firstName: fakeUser, lastName: fakeLastName });
  });

  test.beforeEach(async ({ page }) => {
    const cookiesPopup = CookiesPopup(page);

    await test.step('Navigate to login page', async () => {
      await page.goto('/login');
    });

    await test.step('Accept cookies', async () => {
      await cookiesPopup.acceptAllButton().click();
      await cookiesPopup.consentFormPopup().waitFor({ state: 'hidden' });
    });
  });

  test('Should register a new user', async ({ page }: { page: Page }) => {
    const homePage = HomePage(page);
    const registrationPage = RegistrationPage(page);

    await test.step('Open registration form', async () => {
      await page.goto('/registrierung');
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
      await registrationPage.submitButton().waitFor({ state: 'hidden' });
      //await page.waitForResponse((res) => res.url().includes('register') && res.status() === 200);
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

    await test.step('Log in as the user', async () => {
      await loginPage.emailField().fill(fakeEmail);
      await loginPage.passwordField().fill(fakePassword);
      await loginPage.loginSubmitButton().click();
      await homePage.userSuccessLoginIcon().waitFor({ state: 'visible' });
      await expect(homePage.userAvatarMenu()).toHaveText(fakeUser + ' ' + fakeLastName);
    });

    await test.step('Go to ecksofas category page', async () => {
      await page.goto('/ecksofas');
    });

    await test.step('Verify product name and price before adding to wishlist', async () => {
      for (const product of productsInfo) {
        await expect(productPage.productNameById(product.id)).toHaveText(product.name);
        await expect(productPage.productPriceById(product.id)).toContainText(
          expectedPrices[product.id],
        );
      }
    });

    await test.step('Add five products to wishlist', async () => {
      for (const id of productIds) {
        await productPage.productWishListHeartIconById(id).click();
        await productPage.productWishListSelectedIconById(id).waitFor({ state: 'visible' });
      }
    });

    await test.step('Go to wishlist and prepare for adding to basket', async () => {
      await page.goto('/wunschliste');
      await wishListPage.zipCodeField().clear();
      await wishListPage.zipCodeField().fill('13127');
      await wishListPage.addToWishList().click();
      await expect(toShopCardDialog.assertSuccessMessage('Gute Wahl!')).toBeVisible();
      await toShopCardDialog.toShoppingCardButton().click();
    });

    await test.step('Verify products details in the basket', async () => {
      for (const product of productsInfo) {
        await expect(
          shoppingBasketPage.articleName().filter({ hasText: product.name }),
        ).toBeVisible();
        await expect(shoppingBasketPage.articlePrice(product.id)).toContainText(
          expectedPrices[product.id],
        );
      }
    });
  });
});
