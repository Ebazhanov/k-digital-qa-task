import type { Page } from '@playwright/test';

/**
 * Login page https://www.sofa.de/login
 * */

export const LoginPage = (page: Page) => {
  return {
    registerAccountButton: () => page.getByTestId('registerAccount'),
    emailField: () => page.getByTestId('loginEmailInput'),
    passwordField: () => page.getByTestId('loginPasswordInput'),
    loginSubmitButton: () => page.getByTestId('login-submit'),
    loginEmailErrorMessage: () => page.getByTestId('#loginEmail-error'),
  };
};
