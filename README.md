# 🎭 Playwright Frontend Framework

Front-end test automation using [Playwright](https://playwright.dev/) and [TypeScript](https://www.typescriptlang.org/) with the **Page Object Model (POM)** design pattern.

---

## 📦 Features

- ✅ Playwright with Chromium, Firefox, WebKit support
- ✅ TypeScript for robust typings and IntelliSense
- ✅ Page Object Model structure for scalable tests
- ✅ `.env` file support for environment-based config
- ✅ Auto screenshots and videos on test failure
- ✅ Cross-browser and device testing
- ✅ CI-ready (GitHub Actions, etc.)

---

## 📁 Folder Structure
├── tests/
│ ├── pages/ # Page Object Models
│ ├── specs/ # Test specs
│ └── utils/ # Helpers and config
├── .env.demo # Example environment variables
├── playwright.config.ts # Playwright test runner config
├── README.md
└── package.json


## 🚀 Running Tests

### Run All Tests

```bash
npx playwright test
```

### Show UI (headed mode)

```bash
npx playwright test --headed
```

## 🧪 Useful Commands

### Open Playwright Test Report

```bash
npx playwright show-report
```

## 🔒 Environment Variables & Secrets

Environment variables are loaded using dotenv.
The test suite uses these variables to manage login credentials and other secrets securely.

✅ Make sure to never commit real credentials in .env.demo.
Use .env locally and add it to .gitignore.


## 🛠 Page Object Model

Each page (e.g., LoginPage, HomePage) is modeled as a class under tests/pages/, exposing actions and locators to encourage reusable test steps and clean test files.

Example usage in tests:
```ts
const loginPage = new LoginPage(page);
await loginPage.goto();
await loginPage.login(username, password);
```


