import type { Page } from '@playwright/test';

/**
 * Registration page https://www.sofa.de/registrierung
 * */

export const RegistrationPage = (page: Page) => {
  return {
    salutationMenu: () => page.getByTestId('accountNewSalutation'),
    firstNameField: () => page.getByTestId('firstNameInput'),
    lastNameField: () => page.getByTestId('lastNameInput'),
    emailField: () => page.locator('.accountNew #email'),
    passwordField: () => page.getByTestId('passwordInput'),
    repeatPasswordField: () => page.getByTestId('password2Input'),
    newsLetterCheckbox: () => page.getByTestId('newsletterCheckbox'),
    agbCheckbox: () => page.getByTestId('agbCheckbox'),
    submitButton: () => page.getByTestId('register-submit'),
  };
};
