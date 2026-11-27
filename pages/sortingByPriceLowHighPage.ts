import { Locator, Page, Response } from '@playwright/test'

export class SortByPriceLowHigh {
    readonly getSortDropdown: Locator;
    readonly getProductHeadings: Locator;
    readonly getProductPrices: Locator;

    constructor(readonly page: Page) {
        this.getSortDropdown = page.getByRole('combobox', { name: /sort/i })
        this.getProductHeadings = page
            .getByRole('link')
            .filter({ has: page.getByRole('heading', { level: 5 }) })
            .getByRole('heading', { level: 5 });
        this.getProductPrices = page.locator('[data-test="product-price"]')
    }


    async goTo() {
        const resp = this.page.waitForResponse('**/products');
        await this.page.goto('/');
        await resp;
    }

    async sortLowToHigh(): Promise<Response> {
        const resp = this.page.waitForResponse('**/products');
        await this.getSortDropdown.selectOption({ label: 'Price (Low - High)' });
        return resp;
    }

    async getPrices(): Promise<number[]> {
        const priceTexts = await this.getProductPrices.allTextContents();
        return priceTexts.map(text => Number(text.replace('$', '')));
    }
}