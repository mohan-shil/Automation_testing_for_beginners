const {test, expect, request} = require ('@playwright/test');
const {APIUtils} = require ('../utils/APIUtils');
const loginPayLoad = {userEmail: "mohan.shil.007@gmail.com", userPassword: "Iam4913@"};  
const orderPayLoad = {orders: [{ country: "Cuba", productOrderedId: "67a8dde5c0d3e6622a297cc8" }]};

let token;
let orderId;
let response;

test.beforeAll( async ()=>
{
    //Login API
    const apiContext = await request.newContext();
    const apiUtils = new APIUtils(apiContext, loginPayLoad);
    response = await apiUtils.createOrder(orderPayLoad);
    
});

//Create order is success 
test('Place the order', async ({page})=>
    {
        page.addInitScript( value => 
        {

            window.localStorage.setItem('token', value);
        }, response.token);

        await page.goto('https://rahulshettyacademy.com/client');
    
        // order history

        await page.locator('button[routerlink="/dashboard/myorders"]').click();
        await page.locator('tbody').waitFor();
        const rows = await page.locator('tbody tr');

        for(let i = 0; i < await rows.count(); i++)
            {
            const rowOrderId = await rows.nth(i).locator('th').textContent();
                if( response.orderId.includes(rowOrderId))
                {
                    await rows.nth(i).locator('button').first().click();
                    break;
                }
            }
        const orderIdDetails = await page.locator('.col-text').textContent();
        await page.pause();
        expect(response.orderId.includes(orderIdDetails)).toBeTruthy();


        }); 