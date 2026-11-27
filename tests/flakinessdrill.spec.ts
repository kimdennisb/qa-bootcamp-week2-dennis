import { test, expect } from '@playwright/test';
import { pathToFileURL } from 'node:url';

test("It should open a file and click save", async ({ page }) => {

    //conver the local path to file url
    const localPath: string = __dirname + '/drill/index.html';
    const fileURL: URL = pathToFileURL(localPath);

    //open the file
    await page.goto(fileURL.href)

    await page.getByRole('button', { name: 'Save' }).click()

    //retrying assertion
    await expect(page.getByRole('paragraph')).toHaveText('Saved')

    //read the message
    const text = await page.getByRole("paragraph").textContent();

    //assert
    expect(text).toBe("Saved")

})