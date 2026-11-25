import { test, expect } from '@playwright/test';

test('Invalid login is rejected and shows the message "Invalid email or password', async ({ page }) => {
    await page.goto('https://practicesoftwaretesting.com/');

    await page.getByRole('navigation').getByRole('link', { name: 'Sign in' }).click();

    await page.getByRole('textbox', { name: 'Email address' }).fill('kimutaidennisbrian@gmail.com');

    await page.getByRole('textbox', { name: 'Password' }).fill('Invalidpassword');

    await page.getByRole('button', { name: 'Login' }).click();

    const errorMessage = page.getByText('Invalid email or password');
    await expect(errorMessage).toBeVisible();


})