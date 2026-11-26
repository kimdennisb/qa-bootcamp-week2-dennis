import { test, expect } from '@playwright/test';

test("Should not fetch a cart with invalid id", async ({ request }) => {

    const unknwonCart = await request.get("https://api.practicesoftwaretesting.com/carts/01m83shv4bx7dm0p0e5c03yqzh");

    expect(unknwonCart.status()).toBe(404)
    expect(await unknwonCart.json()).toEqual({ message: 'Requested item not found' })
})