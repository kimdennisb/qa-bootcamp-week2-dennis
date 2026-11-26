# QA Bootcamp Week 2

This repo has my Playwright tests for the Toolshop practice site (https://practicesoftwaretesting.com). There are UI tests for the homepage title, invalid login, search and sorting, plus API tests for products and carts.

## What you need

- [Node.js](https://nodejs.org/) (LTS version)
- [Git](https://git-scm.com/)

Clone the repo and open the folder in a terminal:

```bash
git clone https://github.com/kimdennisb/qa-bootcamp-week2-dennis.git
cd qa-bootcamp-week2-dennis
git checkout week2-day9
```

## Setup and run

1. Install the dependencies and the Chromium browser:

   ```bash
   npm install
   npx playwright install chromium
   ```

2. Copy `.env.example` to `.env`:

   ```bash
   cp .env.example .env
   ```

   Use `copy .env.example .env`. You don't need to change anything in it. It already has the Toolshop site and API URLs.

3. Run the tests:

   ```bash
   npm test
   ```

   Each test prints a line with a pass or fail mark.

## Running one suite

```bash
npx playwright test
```

If a test fails, for example in the toolshop-ui.spec.ts, run it with a trace and open it in the trace viewer:

```bash
npx playwright test toolshop-ui --trace on
npx playwright show-trace test-results/<test-folder>/trace.zip
```
