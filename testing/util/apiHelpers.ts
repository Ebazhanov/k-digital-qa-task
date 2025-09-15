import type { Browser, APIRequestContext, APIResponse } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { strongPassword } from '../e2e/util/strongPassword.js';

export async function getCsrfToken(browser: Browser): Promise<string> {
  const page = await browser.newPage();
  await page.goto('https://www.sofa.de/registrierung', { waitUntil: 'networkidle' });
  const csrfTokenElement = page.locator('#register-form #st-hidden-input');
  await csrfTokenElement.waitFor({ state: 'attached' });
  const csrfToken = (await csrfTokenElement.getAttribute('value')) as string;
  await page.close();
  if (!csrfToken) throw new Error('CSRF token not found');
  return csrfToken;
}

export function generateUser(csrfToken: string, overrides: Partial<Record<string, any>> = {}) {
  const password = strongPassword();
  return {
    csrfToken,
    salutation: 'mr',
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: `testuser_${Date.now()}@example.com`,
    password,
    passwordConfirmation: password,
    newsletter: false,
    ...overrides,
  };
}

export async function registerUser(
  request: APIRequestContext,
  user: Record<string, any>,
): Promise<APIResponse> {
  return request.post('https://www.sofa.de/api/global/register', {
    data: user,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });
}
