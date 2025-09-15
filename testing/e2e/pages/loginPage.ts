import type { Page } from '@playwright/test';

/**
 * Login page https://www.sofa.de/login
 * */

export const LoginPage = (page: Page) => {
  return {
    registerAccountButton: () => page.getByTestId('registerAccount'),
  };
};
