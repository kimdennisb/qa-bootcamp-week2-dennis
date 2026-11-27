import { test, expect } from '@playwright/test';
import { SearchByName } from '../pages/searchByNamePage';

//A search by name returns only products with the searched name
test('C1 Search by name', async ({ page }) => {
    const searchPage = new SearchByName(page);

    await searchPage.goTo();

    //Wait for the products page to show the initial list
    await expect(searchPage.getProductHeadings.first()).toBeVisible();

    await searchPage.search('pliers');

    // Wait until the page says the search is done
    await expect(page.getByRole('heading', { name: 'Searched for: pliers' })).toBeVisible()
    await expect(page.getByRole('paragraph').filter({ hasText: "products found for 'pliers'" })).toBeVisible()

    // At least one product is shown, and no product is missing "pliers" in its name
    await expect(searchPage.getProductHeadings.first()).toBeVisible();
    await expect(searchPage.getProductHeadings.filter({ hasNotText: /pliers/i })).toHaveCount(0);
})