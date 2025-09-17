import type { Page } from '@playwright/test';

/**
 * Product page
 * */

export const ProductPage = (page: Page) => {
  return {
    productWishListHeartIconById: (productId: string) =>
      page.locator(`[data-testid="p-id-${productId}"] [data-testid="wishlistHeart"]`),
    productWishListSelectedIconById: (productId: string) =>
      page.locator(`[data-testid="p-id-${productId}"] [data-testid="wishlistHeartFilled"]`),
    productNameById: (productId: string) => page.locator(`[data-testid="p-id-${productId}"] h3`),
    productPriceById: (productId: string) =>
      page.locator(`[data-testid="p-id-${productId}"] [data-testid="orgp"]`),
  };
};
