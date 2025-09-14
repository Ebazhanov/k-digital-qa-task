import { Page } from '@playwright/test';

/**
 * Home page https://www.sofa.de/
 * */

export const HomePage = (page: Page) => {
  return {
    agentSettingsButton: () => page.locator('[data-dp-name="nav-chat-btn"]'),
    loginMenu: () => page.getByTestId('headerBrandLogin'),
  };
};
