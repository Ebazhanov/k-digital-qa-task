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

    await test.step('Login with correct credentials', async () => {
      await loginPage.emailField().fill(fakeEmail);
      await loginPage.passwordField().fill(fakePassword);
      await loginPage.loginSubmitButton().click();
      await loginPage.loginSubmitButton().waitFor({ state: 'hidden' });
      await expect(homePage.userAvatarMenu()).toHaveText(fakeUser + ' ' + fakeLastName);
    });

    await test.step('Go to ecksofas category page', async () => {
      await page.goto('/ecksofas');
    });

    await test.step('Save price and product name before adding', async () => {
      // Save product info without using a for loop
      const id1 = productIds[0];
      const id2 = productIds[1];
      const id3 = productIds[2];
      const id4 = productIds[3];
      const id5 = productIds[4];

      const nameLocator1 = page.locator(`[data-testid="p-id-${id1}"] h3`);
      const priceLocator1 = page.locator(`[data-testid="p-id-${id1}"] [data-testid="orgp"]`);
      await nameLocator1.waitFor({ state: 'visible', timeout: 1000 });
      await priceLocator1.waitFor({ state: 'visible', timeout: 1000 });
      const name1 = await nameLocator1.innerText();
      const price1 = await priceLocator1.innerText();
      productsInfo.push({ id: id1, name: name1, price: price1 });

      const nameLocator2 = page.locator(`[data-testid="p-id-${id2}"] h3`);
      const priceLocator2 = page.locator(`[data-testid="p-id-${id2}"] [data-testid="orgp"]`);
      await nameLocator2.waitFor({ state: 'visible', timeout: 1000 });
      await priceLocator2.waitFor({ state: 'visible', timeout: 1000 });
      const name2 = await nameLocator2.innerText();
      const price2 = await priceLocator2.innerText();
      productsInfo.push({ id: id2, name: name2, price: price2 });

      const nameLocator3 = page.locator(`[data-testid="p-id-${id3}"] h3`);
      const priceLocator3 = page.locator(`[data-testid="p-id-${id3}"] [data-testid="orgp"]`);
      await nameLocator3.waitFor({ state: 'visible', timeout: 1000 });
      await priceLocator3.waitFor({ state: 'visible', timeout: 1000 });
      const name3 = await nameLocator3.innerText();
      const price3 = await priceLocator3.innerText();
      productsInfo.push({ id: id3, name: name3, price: price3 });

      const nameLocator4 = page.locator(`[data-testid="p-id-${id4}"] h3`);
      const priceLocator4 = page.locator(`[data-testid="p-id-${id4}"] [data-testid="orgp"]`);
      await nameLocator4.waitFor({ state: 'visible', timeout: 1000 });
      await priceLocator4.waitFor({ state: 'visible', timeout: 1000 });
      const name4 = await nameLocator4.innerText();
      const price4 = await priceLocator4.innerText();
      productsInfo.push({ id: id4, name: name4, price: price4 });

      const nameLocator5 = page.locator(`[data-testid="p-id-${id5}"] h3`);
      const priceLocator5 = page.locator(`[data-testid="p-id-${id5}"] [data-testid="orgp"]`);
      await nameLocator5.waitFor({ state: 'visible' });
      await priceLocator5.waitFor({ state: 'visible' });
      const name5 = await nameLocator5.innerText();
      const price5 = await priceLocator5.innerText();
      productsInfo.push({ id: id5, name: name5, price: price5 });
    });

    await test.step('Add five products to wishlist', async () => {
      for (const id of productIds) {
        await productPage.productWishListHeartIconById(id).click();
        await productPage.productWishListSelectedIconById(id).waitFor({ state: 'visible' });
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
        await expect(page.getByTestId('60406729').getByTestId('orgp')).toContainText('989,00');
        await expect(page.getByTestId('60405810').getByTestId('orgp')).toBeVisible('709,00');
        await expect(page.getByTestId('60408053').getByTestId('orgp')).toBeVisible('989,00');
        await expect(page.getByTestId('60406686').getByTestId('orgp')).toContainText('989,00');
        await expect(page.getByTestId('60408061').getByTestId('orgp')).toContainText('869,00');
      }
    });
  });
});
