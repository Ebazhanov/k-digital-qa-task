import { test, expect } from '@playwright/test';
import { getCsrfToken, generateUser, registerUser } from '../util/apiHelpers.js';

let csrfToken: string;

test.describe('API Registration', () => {
  test.beforeEach(async ({ browser }) => {
    csrfToken = await getCsrfToken(browser);
    expect(csrfToken).not.toBeNull();
  });

  test.describe('API Registration with CSRF', () => {
    test('Happy Path - successful registration', async ({ request }) => {
      const user = generateUser(csrfToken);
      const response = await registerUser(request, user);
      const status = response.status();
      const body = await response.json().catch(() => response.text());
      expect(status).toBeGreaterThanOrEqual(200);
      expect(status).toBeLessThan(300);
      expect(body).toHaveProperty('userId');
    });

    test('Unhappy Path - missing fields', async ({ request }) => {
      const invalidUser = generateUser(csrfToken, {
        lastName: '',
        email: '',
        password: '',
        passwordConfirmation: '',
      });
      const response = await registerUser(request, invalidUser);
      expect(response.status()).toBeGreaterThanOrEqual(400);
    });
  });
});
