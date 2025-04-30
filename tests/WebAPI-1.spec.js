const {test, expect, request} = require ('@playwright/test');

let token;
const loginPayLoad = {userEmail: "mohan.shil.007@gmail.com", userPassword: "Iam4913@"};

test.beforeAll( async ()=>
{
    const apiContext = await request.newContext();
    const loginResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login", 
    {
        data: loginPayLoad
    });
    expect(loginResponse.ok()).toBeTruthy();
    const loginResponseJson = await loginResponse.json();
    token = loginResponseJson.token;
    console.log(token);
    
});

test.beforeEach( ()=>
{

});


test('Place the order', async ({page})=>
    {

        page.addInitScript( value => 
        {

            window.localStorage.setItem('token', value);
        }, token);

        await page.goto('https://rahulshettyacademy.com/client');
        // plugin setup
        const products = page.locator('.card-body');
        const productName = "ZARA COAT 3";
        const email = 'mohan.shil.007@gmail.com';
        await page.locator('.card-body b').first().waitFor(); 
        // finding the product and clicking on cart button  
        await page.locator('.card-body').filter({hasText: "ZARA COAT 3"})
        .getByRole('button', {name:"Add to Cart"}).click();
    
        await page.getByRole("listitem").getByRole('button', { name: 'Cart' }).click();
    
        // wait for the cart page to load
        await page.locator('div li').first().waitFor();
        await expect(page.getByText("ZARA COAT 3")).toBeVisible(); //assertion
        
        // checkout
        await page.getByRole('button', { name: 'Checkout' }).click();
        //fill address
        await page.locator("input[value='4542 9931 9292 2293']").fill('4542 9931 9292 2293');
        await page.locator("(//input[@type='text'])[2]").fill('6666');
        await page.locator("(//input[@type='text'])[3]").fill('Visa');
        await page.locator("(//input[@type='text'])[4]").fill('rahulshettyacademy');
        await page.locator("button[type='submit']").click();
    
        await page.getByPlaceholder("Select Country").pressSequentially('ind');
        await page.getByRole('button', { name: 'India' }).nth(1).click();
        await page.getByText("PLACE ORDER").click();
        await expect(page.getByText("Thankyou for the order.")).toBeVisible(); //assertion
    
    
        }); 