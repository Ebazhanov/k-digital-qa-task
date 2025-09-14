# 🚀 Krieger Digital QA Task

[![UI Tests](https://github.com/Ebazhanov/krieger-digital-qa-task/actions/workflows/playwright.yml/badge.svg?branch=main)](https://github.com/Ebazhanov/krieger-digital-qa-task/actions/workflows/playwright.yml)
[![API Tests](https://github.com/Ebazhanov/krieger-digital-qa-task/actions/workflows/api-tests.yml/badge.svg?branch=main)](https://github.com/Ebazhanov/krieger-digital-qa-task/actions/workflows/api-tests.yml)

## ✨ Features

### "Exploratory" Testing Results

- 🧪 Manual test cases for https://www.sofa.de/ (see `docs/manual-test-cases.md` or your Notion/Excel file) // TODD

### 🤖 E2E Automation

- 💻 UI tests (Playwright, TypeScript, POM)
  - 🔐 Registration, Login, Wishlist, Basket flows (see `testing/e2e/tests/`)
- 🌐 API tests (Playwright, TypeScript)
  - 🔗 Registration API tests with happy and unhappy scenarios (see `testing/api/`)
- 🗄️ [Database Query Challenge](sql/query.sql)
  - SQL for top 3 most expensive items by top-rated sellers

### 📊 HTML Report in GH Actions

- 🧪 [UI test results](https://github.com/Ebazhanov/krieger-digital-qa-task/actions/workflows/playwright.yml)
- 🌐 [API test results](https://github.com/Ebazhanov/krieger-digital-qa-task/actions/workflows/api-tests.yml)
- 📂 Local: `npx playwright show-report` to view the HTML report after running tests

## 🧰 Getting Started

#### ▶️ Run locally:

- `$ npm install` to install dependencies
- `$ npm run test:open` to open Playwright Test Runner (UI mode)
- `$ npm run test:headless` to run all tests in headless mode
- `$ npm run test:ui` to run only UI tests
- `$ npm run test:api` to run only API tests
- `$ npm run report` to view the HTML report after tests
- `$ npm run lint` to lint and auto-fix code
- `$ npm run format` to auto-format code

## 📁 Project Structure

```
├─ sql/                      # Database Query challenge (#3)
│   ├─ schema.sql            # Table definitions: Sellers, Items, Categories
│   ├─ seed.sql              # Sample data for the tables
│   └─ query.sql             # SQL query for the challenge
├─ testing/
│   ├─ api/                  # API test specs
│   │   └─ register-api.spec.ts  # Registration API tests
│   └─ e2e/                  # UI test specs
│       ├─ fixtures/         # Shared test data (e.g., fake users)
│       ├─ pages/            # Page Object Model files
│       ├─ tests/            # Playwright E2E test specs
│       └─ util/             # Utility functions (e.g., strongPassword)
├─ .github/workflows/        # GitHub Actions workflows
│   ├─ playwright.yml        # UI tests workflow
│   └─ api-tests.yml         # API tests workflow
├─ playwright.config.ts      # Playwright configuration
├─ package.json              # Project dependencies and scripts
├─ tsconfig.json             # TypeScript configuration
├─ README.md                 # Project documentation
├─ eslint.config.cjs         # ESLint configuration
└─ test-results/             # Playwright test results and artifacts
```

---

- All tasks are in one repository as required.
- No personal account data or API keys are stored in the project.
- See the `sql/` folder for the database challenge and solution.
- See `testing/e2e/tests/` for Playwright E2E tests.
- See `README.md` for usage instructions and project structure.
