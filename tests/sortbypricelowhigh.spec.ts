import { test, expect } from '@playwright/test';
import { SortByPriceLowHigh } from '../pages/sortingByPriceLowHighPage';

test('Sorting by price low to high should show the cheapest products first', async ({ page }) => {
    const sortPage = new SortByPriceLowHigh(page);

    await sortPage.goTo();

    const response = await sortPage.sortLowToHigh();
    expect(response.status()).toBe(200);

    const body = await response.json();
    const apiNames = body.data.map((product: { name: string }) => product.name);
    await expect(sortPage.getProductHeadings).toHaveText(apiNames);

    //get prices in page order [3.55,4.5...]
    const prices = await sortPage.getPrices();
    expect(prices.length).toBeGreaterThan(0);

    //sorts low to high
    const sortedPrices = [...prices].sort((a, b) => a - b);
    //compare the sort order and the page order
    expect(prices).toEqual(sortedPrices);
})