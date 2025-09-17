import type { Page } from '@playwright/test';

/**
 * Shopping Basket page https://www.sofa.de/
 * */

export const ShoppingBasketPage = (page: Page) => {
  return {
    articleName: () => page.locator('.cartEntry__articleName .simpleText'),
    articlePrice: (productId: string) => page.getByTestId(productId).getByTestId('orgp'),
  };
};
