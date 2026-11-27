import { Locator, Page } from '@playwright/test'

export class SearchByName {
    readonly getSearchBox: Locator;
    readonly getSearchButton: Locator;
    readonly getProductHeadings: Locator;

    constructor(readonly page: Page) {
        this.getSearchBox = page.getByRole('textbox', { name: 'Search' })
        this.getSearchButton = page.getByRole('button', { name: 'Search' })
        this.getProductHeadings = page
            .getByRole('link')
            .filter({ has: page.getByRole('heading', { level: 5 }) })
            .getByRole('heading', { level: 5 });
    }

    // Open the shop
    async goTo() {
        await this.page.goto('/');
    }

    // Search
    async search(itemName: string) {
        await this.getSearchBox.fill(itemName);
        await this.getSearchButton.click();

    }
}