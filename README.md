# Deloitte Omnia-style E2E Project (SauceDemo) — Playwright + TypeScript

**Stack**: Playwright Test, TypeScript, POM, CSV data, Faker, API tests, GitHub Actions CI, HTML report with `test.step()`.

## Quick Start
```bash
npm install
npx playwright install --with-deps
npm run test:report              # run and open report
# or run specific and as per choice
npx playwright test src/tests/ui/ui-01-login.spec.ts --headed
npx playwright test src/tests/api
npx playwright test src/tests/ui
npx playwright test src/tests
npm run test:ui
npm run test:api
npm run test:all
```
Environment: set `BASE_URL` and `API_BASE_URL` (optional).

## Structure
- `src/pages/` — Page Objects
- `src/tests/ui/` — UI specs (UI-01..UI-06)
- `src/tests/api/` — API specs (API-01..API-03)
- `data/logins.csv` — credentials for login matrix
- `mock/server.js` — mock API to satisfy API tests
- `.github/workflows/ci.yml` — CI pipeline

## Notes
- All specs use `test.step()` for human-readable HTML reports.
- Replace mock API with real Omnia endpoints by setting `API_BASE_URL`.

# 🧩 Playwright API Test Suite

This folder contains API-level automated tests built using Playwright’s API testing
 features.
It runs against a local mock server (mock/server.js) that simulates key backend endpoints for login, inventory, and cart.

# 🗂 Folder Overview
File	Description
api-01-login.spec.ts	Tests /login for valid, invalid, and locked users.
api-02-inventory.spec.ts	Verifies /inventory requires a valid token and returns products.
api-03-cart.spec.ts	End-to-end cart flow — add to cart + verify items.
mock/server.js	Express mock API server (port 4000).
global-setup.ts	Starts server before tests (auto).
global-teardown.ts	Stops server after tests.
api.types.ts	Defines TypeScript interfaces for responses (LoginResponse, InventoryItem, etc.).

# How to Run
Run all tests (UI + API mixed):
npx playwright test
Run API tests only:
npx playwright test src/tests/api

## What’s included :



## Tech stack
Language: TypeScript
Runner: @playwright/test
Patterns: Page Object Model (POM) + Data-driven (CSV) + API tests
Data gen: @faker-js/faker
Reporting: Playwright HTML report with test.step() (human-readable)
CI/CD: GitHub Actions workflow
Mock API: Node/Express server for /login, /inventory, /cart
VS Code: launch configs to run/debug individual tests

## Coverage
Part A – UI
UI-01: Login with all user types (CSV-driven)
UI-02: Add Product to Cart (Backpack)
UI-03: Checkout with Static Data (John/Doe/12345)
UI-04: Checkout with Dynamic Data (Faker)
UI-05: CSV-Driven Login Tests (loop)
UI-06: Add Multiple Products (Backpack, Bike Light, Fleece Jacket)

Part B – API (against included mock server)
# Playwright (tests) → APIRequestContext → Mock Server (Express) → JWT Auth + Response
API-01: Login API (valid, invalid, locked)
API-02: Inventory API (Bearer token)
API-03: Cart API (add + get)

## Project layout

saucedemo-omnia-e2e-ts/
├─ package.json
├─ tsconfig.json
├─ playwright.config.ts
├─ .github/workflows/ci.yml
├─ .vscode/launch.json
├─ data/logins.csv
├─ mock/server.js                 # mock login/inventory/cart
├─ src/
│  ├─ pages/
│  │  ├─ base.page.ts
│  │  ├─ login.page.ts
│  │  ├─ inventory.page.ts
│  │  ├─ cart.page.ts
│  │  └─ checkout.page.ts
│  ├─ utils/
│  │  ├─ csv.ts
│  │  └─ faker.ts
│  │  └─ apiHelper.ts
│  ├─ apiTypes/
│  │  ├─ api.types.ts
│  ├─ config/
│  │  ├─ api.config.ts
│  └─ tests/
│     ├─ ui/
│     │  ├─ ui-01-login.spec.ts
│     │  ├─ ui-02-add-to-cart.spec.ts
│     │  ├─ ui-03-checkout-static.spec.ts
│     │  ├─ ui-04-checkout-dynamic.spec.ts
│     │  ├─ ui-05-csv-driven-login.spec.ts
│     │  └─ ui-06-add-multiple-products-pom.spec.ts
│     └─ api/
│        ├─ api-01-login.spec.ts
│        ├─ api-02-inventory.spec.ts
│        └─ api-03-cart.spec.ts
├─ README.md
└─ LOCATORS.md


Selectors live in POMs (src/pages/*.ts). See LOCATORS.md for a clean mapping.
All specs use test.step() so the HTML report reads like a story, not raw locators.

## Quick start (short steps)
Unzip & open
unzip saucedemo-omnia-e2e-ts.zip
cd saucedemo-omnia-e2e-ts
Install (Playwright + deps)
npm install
npx playwright install --with-deps
Run everything & auto-open report
npm run test:report
Run a single test (headed)
npx playwright test src/tests/ui/ui-01-login.spec.ts --headed
Open last report manually
npm run pw:report


## Env (optional):
BASE_URL defaults to https://www.saucedemo.com/
API_BASE_URL defaults to http://127.0.0.1:4000 (the included mock server).
In CI the mock server is auto-started; locally it’s started via the pretest script.

## Notes & rationale

TypeScript is chosen for maintainability and enterprise-grade typing.
No brittle XPath unless necessary: we prefer stable IDs, roles, data-test attributes.
CSV messages are quoted to avoid parse errors with commas.
HTML reporter uses open: 'on-failure'. Change to 'always' if you want it to pop open every run.
Security warning in PowerShell: if you installed Node via MSI (recommended), you won’t see the npx.ps1 unblock prompt anymore.

What “cloud created” means here
CI/CD in the cloud is ready via GitHub Actions (.github/workflows/ci.yml). Push this repo to GitHub and your tests run in the cloud; HTML report is uploaded as an artifact.