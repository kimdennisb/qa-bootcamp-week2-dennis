# QA Bootcamp Week 2 Starter

This is the starting point for Week 2 of the QA bootcamp. During the week you will use it to practise:

- TypeScript
- Playwright (UI testing)
- Postman (API testing)
- The Toolshop REST API

There are no tests in this repo. You will write them during the week.

## Prerequisites

Install these before you start:

- [Node.js](https://nodejs.org/) (the current LTS version)
- [Git](https://git-scm.com/)
- [VS Code](https://code.visualstudio.com/)

## Setup

Run these steps in order from a terminal.

1. Clone the repo and open the folder:

   ```bash
   git clone <repo-url>
   cd qa-bootcamp-week2-starter
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Install the Chromium browser for Playwright:

   ```bash
   npx playwright install chromium
   ```

4. Copy `.env.example` to `.env`:

   ```bash
   cp .env.example .env
   ```

   `.env` already contains the Toolshop website URL (`TOOLSHOP_URL`) and the Toolshop API URL (`TOOLSHOP_API_URL`). Only change them if your trainer gives you different URLs.

5. Check that your setup works:

   ```bash
   npm run check
   ```

   This sends a GET request to the Toolshop API's `/products` endpoint (no login needed). If everything is set up correctly, it prints your Node version, the HTTP status (200), the number of products, and a last line that says `PASS`.

> **Warning:** never commit `.env`. It is where your own settings and, later in the course, your secrets (keys, tokens, passwords) live. It is listed in `.gitignore` so Git ignores it. Do not remove it from there.

## Folders

| Folder     | What it is for |
|------------|----------------|
| `tests/`   | Your Playwright tests. It is empty for now; you will add tests during the week. |
| `scripts/` | Helper scripts. `check.ts` checks your setup and is run by `npm run check`. |

## Scripts

- `npm run check`: checks your `.env` and that you can reach the Toolshop API.
- `npm test`: runs the Playwright tests in `tests/`.

## Typescript

### The following are test files for practising typescript and are located in `src/ts-basics`

### functions.ts
Calculates tax from income. The tax year defaults to 2022 if you don't pass one. Years before 2022 multiply by 1.2, anything after uses 1.3.

### objects.ts
id is readonly so it can't be changed later, name is optional, and retire is a function that takes a date and logs it.

### optionalChaining.ts
getCustomer gives back null if the id is 0, otherwise a customer with a birthday. I used ?. so the code doesn't crash when the customer or birthday is missing. log?.('c') does the same thing for a function that might be null, so it only gets called if it exists.

### profile-validator.ts
A Profile type where settings is optional. Three users: one has notifications on, one has no settings, and one has an empty settings object. isNotified returns false unless notifications is actually set.

### tupples.ts
A tupple. The first value has to be a number and the second a string.

### typealiases.ts
Type shape is pulled out into a type alias so I can reuse it. It creates an employee and calls retire with a specific date.

### uniontypes.ts
Converts kg to lbs. It takes a number or a string and uses typeof to check which one it got. If it's a string like '10kgs', parseInt pulls out the number first.
