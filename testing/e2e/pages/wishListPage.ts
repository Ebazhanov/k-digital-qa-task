import type { Page } from '@playwright/test';

/**
 * WishList page
 * */

export const WishListPage = (page: Page) => {
  return {
    zipCodeField: () =>
      page.locator('.wishlist__postalCodeArea [data-testid="zipcode-logistic-inputInput"]'),
    addToWishList: () => page.getByTestId('addAddToWishlist'),
  };
};
