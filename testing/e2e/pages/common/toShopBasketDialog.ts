import type { Page } from '@playwright/test';

/**
 * Shopping Basket Dialog
 * */

export const ToShopBasketDialog = (page: Page) => {
  return {
    assertSuccessMessage: (message: string) => page.locator('#overlayRight').getByText(message),
    toShoppingBasketButton: () => page.getByRole('link', { name: 'Zum Warenkorb' }),
  };
};
