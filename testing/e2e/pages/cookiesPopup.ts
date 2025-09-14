import { Page } from '@playwright/test';

/**
 * Cookies popup
 * */

export const CookiesPopup = (page: Page) => {
  return {
    acceptAllButton: () => page.locator('[data-accept-action="all"]'),
    consentFormPopup: () => page.locator('.consentForm__container'),
  };
};
