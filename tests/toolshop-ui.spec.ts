import { test, expect } from '@playwright/test';
import { SortByPriceLowHigh } from '../pages/sortingByPriceLowHighPage';


test.describe("Toolshop UI tests", () => {

    test('The homepage title is expected to be Practice Software Testing - Toolshop - v5.0', async ({ page }) => {
        await page.goto('https://practicesoftwaretesting.com/');

        await expect(page).toHaveTitle("Practice Software Testing - Toolshop - v5.0")
    })

    test('Invalid login is rejected and shows the message "Invalid email or password', async ({ page }) => {
        await page.goto('https://practicesoftwaretesting.com/');

        await page.getByRole('navigation').getByRole('link', { name: 'Sign in' }).click();

        await page.getByRole('textbox', { name: 'Email address' }).fill('kimutaidennisbrian@gmail.com');

        await page.getByRole('textbox', { name: 'Password' }).fill('Invalidpassword');

        await page.getByRole('button', { name: 'Login' }).click();

        const errorMessage = page.getByText('Invalid email or password');
        await expect(errorMessage).toBeVisible();

    })

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

    test("Should not fetch a cart with invalid id", async ({ request }) => {

        const unknwonCart = await request.get("https://api.practicesoftwaretesting.com/carts/01m83shv4bx7dm0p0e5c03yqzh");

        expect(unknwonCart.status()).toBe(404)
        expect(await unknwonCart.json()).toEqual({ message: 'Requested item not found' })
    })


    let createdCartID: string | null = null;

    test('Should create a cart and add a product', async ({ request }) => {

        const cart = await request.post('https://api.practicesoftwaretesting.com/carts')

        //check that the cart is created and 201 created response returned
        expect(cart.ok()).toBeTruthy()
        expect(cart.status()).toBe(201)

        //use the response id from adding the cart
        const cartResponse = await cart.json();
        expect(cartResponse).toHaveProperty('id')
        const cartID = cartResponse.id

        //assign ID for cleanup
        createdCartID = cartID

        //Get the products and use one product to add to the cart
        const products = await request.get('https://api.practicesoftwaretesting.com/products')

        expect(products.ok()).toBeTruthy();
        expect(products.status()).toBe(200)

        const productsReponse = await products.json();
        expect(productsReponse.total).toBeGreaterThan(0);
        const productID = productsReponse.data[0].id


        const addProductToCart = await request.post(`https://api.practicesoftwaretesting.com/carts/${cartID}`, {
            data: {
                product_id: productID,
                quantity: 10
            }
        })

        expect(addProductToCart.status()).toBe(200)
        expect(await addProductToCart.json()).toEqual({ result: 'item added or updated' });

        const getCart = await request.get(`https://api.practicesoftwaretesting.com/carts/${cartID}`)
        expect(getCart.status()).toBe(200)

        const getCartBody = await getCart.json()
        expect(getCartBody.id).toBe(cartID)
        expect(getCartBody.cart_items).toHaveLength(1)
        expect(getCartBody.cart_items[0].product_id).toBe(productID)
        expect(getCartBody.cart_items[0].quantity).toBe(10)

    })

    //cleanup - delete the cart
    test.afterEach(async ({ request }) => {
        if (createdCartID == null) return
        const deleteCart = await request.delete(`https://api.practicesoftwaretesting.com/carts/${createdCartID}`)
        expect(deleteCart.status()).toBe(204);

    })

})