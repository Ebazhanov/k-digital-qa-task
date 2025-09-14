import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { strongPassword } from '../e2e/util/strongPassword.js';

test.describe('API Registration', () => {
  let csrfToken: string;

  test.beforeEach(async ({ browser }) => {
    // Extract CSRF token from registration page
    const page = await browser.newPage();
    await page.goto('https://www.sofa.de/registrierung', { waitUntil: 'networkidle' });

    const csrfTokenElement = page.locator('#register-form #st-hidden-input');
    await csrfTokenElement.waitFor({ state: 'attached' });

    csrfToken = (await csrfTokenElement.getAttribute('value')) as string;
    expect(csrfToken).not.toBeNull();
    console.log('Extracted CSRF Token:', csrfToken);

    await page.close();
  });

  test.describe('API Registration with CSRF', () => {
    test('Happy Path - successful registration', async ({ request }) => {
      // Generate user data
      const password = strongPassword();
      const user = {
        csrfToken,
        salutation: 'mr',
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        email: `testuser_${Date.now()}@example.com`,
        password,
        passwordConfirmation: password,
        newsletter: false,
      };

      // Call registration API
      const response = await request.post('https://www.sofa.de/api/global/register', {
        data: user,
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });

      const status = response.status();
      const body = await response.json().catch(() => response.text());

      console.log('API Response:', body);

      // Assertions
      expect(status).toBeGreaterThanOrEqual(200);
      expect(status).toBeLessThan(300);
      expect(body).toHaveProperty('userId');
    });

    test('Unhappy Path - missing fields', async ({ request }) => {
      const invalidUser = {
        csrfToken,
        salutation: '',
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        passwordConfirmation: '',
        newsletter: false,
      };

      const response = await request.post('https://www.sofa.de/api/global/register', {
        data: invalidUser,
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });

      const body = await response.json().catch(() => response.text());
      console.log('API Response (unhappy):', body);

      expect(response.status()).toBeGreaterThanOrEqual(400);
    });
  });
});
