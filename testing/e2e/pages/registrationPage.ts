import { Page } from '@playwright/test';

/**
 * Registration page https://www.sofa.de/registrierung
 * */

export const RegistrationPage = (page: Page) => {
  return {
    agentSettingsButton: () => page.locator('[data-dp-name="nav-chat-btn"]'),
  };
};
