import { test, expect } from '@playwright/test';

test('A search for "pliers" returns only products with "pliers" in the name', async ({ page }) => {

    await page.goto('https://practicesoftwaretesting.com/');

    await page.getByRole('textbox', { name: 'Search' }).fill('pliers');

    await page.getByRole('button', { name: "Search" }).click()

    await expect(page.getByText(/products found for 'pliers'/i)).toBeVisible();

    const productHeadings = page
        .getByRole('link')
        .filter({ has: page.getByRole('heading', { level: 5 }) })
        .getByRole('heading', { level: 5 });

    await expect(productHeadings.first()).toBeVisible();

    const count = await productHeadings.count();
    expect(count).toBeGreaterThan(0);

    for (let i = 0; i < count; i++) {
        await expect(productHeadings.nth(i)).toContainText(/pliers/i);
    }
})