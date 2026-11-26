import { test, expect } from '@playwright/test';

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