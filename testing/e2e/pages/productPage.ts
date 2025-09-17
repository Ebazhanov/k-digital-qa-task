import type { Page } from '@playwright/test';

/**
 * Product page
 * */

export const ProductPage = (page: Page) => {
  return {
    productWishListHeartIconById: (productId: string) =>
      page.locator(`[data-testid="p-id-${productId}"] [data-testid="wishlistHeart"]`),
    productWishListSelectedIconById: (productId: string) =>page
    .locator('[data-testid="p-id-60406729"] [data-testid="wishlistHeartFilled"]')
  };
};
