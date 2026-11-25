import { test, expect } from '@playwright/test';

test('The homepage title is expected to be Practice Software Testing - Toolshop - v5.0', async ({ page }) => {
    await page.goto('https://practicesoftwaretesting.com/');

    await expect(page).toHaveTitle("Practice Software Testing - Toolshop - v5.0")
})
