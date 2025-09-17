import type { Page } from '@playwright/test';

/**
 * Home page https://www.sofa.de/
 * */

export const HomePage = (page: Page) => {
  return {
    userAvatarMenu: () => page.getByTestId('headerBrandLogin'),
    userWishList: () => page.getByTestId('headerBrandWishlist'),
  };
};
