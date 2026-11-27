import { test, expect } from "@playwright/test"

test('Should get products', async ({ request }) => {
    const productsResponse = await request.get('https://api.practicesoftwaretesting.com/products')

     expect(productsResponse.ok()).toBeTruthy();
     expect(productsResponse.status()).toBe(200)

     const body = await productsResponse.json();
    expect(body.data[0]).toHaveProperty('name')
    expect(body.data.length).toBeGreaterThan(0)
    expect(body.data[0]).toHaveProperty('price')

})