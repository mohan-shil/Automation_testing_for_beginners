const {test, expect} = require ('@playwright/test');
let webContext;

test.beforeAll( async ({browser}) =>
{
    const context =   await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://rahulshettyacademy.com/client');
    await page.getByPlaceholder('email@example.com').fill('mohan.shil.007@gmail.com');
    await page.getByPlaceholder('enter your passsword').fill('Iam4913@');
    await page.getByRole('button', { name: 'Login' }).click();
    await page.waitForLoadState('networkidle');
    await context.storageState({path: 'state.json'});
    webContext = await browser.newContext({storageState: 'state.json'});

})



test('Client App test', async ()=>
{
    // plugin setup
    const productName = "ZARA COAT 3";

    const page = await webContext.newPage();
    await page.goto('https://rahulshettyacademy.com/client');
    const products = page.locator('.card-body');
    const titles = await page.locator('.card-body b').allTextContents();
    console.log(titles);    
    const count = await products.count();
    for(let i = 0; i < count; ++i)  //product selection dynamically using for loop
    {
        if( await products.nth(i).locator('b').textContent() === productName)
        {
            //add to cart
            // console.log("Product found");
            await products.nth(i).locator(".btn.btn.w-10").click();
            break;
        }
    }
    await page.locator("[routerlink='/dashboard/cart']").click();
    await page.locator('div li').first().waitFor();
    const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
    expect(bool).toBeTruthy();
    // checkout
    await page.locator("li[class='totalRow'] button[type='button']").click();
    //fill address
    await page.locator("input[value='4542 9931 9292 2293']").fill('4542 9931 9292 2293');
    await page.locator("(//input[@type='text'])[2]").fill('6666');
    await page.locator("(//input[@type='text'])[3]").fill('Visa');
    await page.locator("(//input[@type='text'])[4]").fill('rahulshettyacademy');
    await page.locator("button[type='submit']").click();
    await page.locator("[placeholder*='Country']").pressSequentially('ind',{delay: 1000});
    const dropDown = page.locator('.ta-results');
    await dropDown.waitFor();

    const optionsCount = await dropDown.locator('button').count();
    for(let i = 0; i < optionsCount; ++i)
        {
            const text = await dropDown.locator('button').nth(i).textContent();
            if(text === ' India') 
            {
                await dropDown.locator('button').nth(i).click();
                break;
            }
        }
    await expect (page.locator(".user__name [type='text']").first()).toHaveText("mohan.shil.007@gmail.com");
    await page.locator(".action__submit").click();
    await expect(page.locator('.hero-primary')).toHaveText(' Thankyou for the order.'); //assertion
    const orderID = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    console.log(orderID);

    // order history

    await page.locator('button[routerlink="/dashboard/myorders"]').click();
    await page.locator('tbody').waitFor();
    const rows = await page.locator('tbody tr');

    for(let i = 0; i < await rows.count(); i++)
        {
        const rowOrderID = await rows.nth(i).locator('th').textContent();
            if( orderID.includes(rowOrderID))
            {
                await rows.nth(i).locator('button').first().click();
                break;
            }
        }
    }); 


    test('test-2', async ()=>
        {
            
            const productName = "ZARA COAT 3";
        
            const page = await webContext.newPage();
            await page.goto('https://rahulshettyacademy.com/client');
            const products = page.locator('.card-body');
            const titles = await page.locator('.card-body b').allTextContents();
            console.log(titles);    

}); 