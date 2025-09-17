import type { Page } from '@playwright/test';

/**
 * Shopping Card Dialog
 * */

export const ToShopCardDialog = (page: Page) => {
  return {
    assertSuccessMessage: (message: string) => page.locator('#overlayRight').getByText(message),
    toShoppingCardButton: () => page.getByRole('link', { name: 'Zum Warenkorb' }),
  };
};
