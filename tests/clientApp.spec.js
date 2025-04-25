const {test, expect} = require ('@playwright/test');

test('Client App test', async ({browser})=>
{
    // plugin setup
    const context = await browser.newContext();
    const page = await context.newPage();
    const products = page.locator('.card-body');
    const productName = "ZARA COAT 3";
    const email = 'mohan.shil.007@gmail.com';
    //page setup
    await page.goto('https://rahulshettyacademy.com/client');
    //console.log(await page.title());
    // login setup
    await page.getByPlaceholder('email@example.com').fill(email);
    await page.getByPlaceholder('enter your passsword').fill('Iam4913@');
    await page.getByRole('button', { name: 'Login' }).click();
    // wait for the page to load
    await page.waitForLoadState('networkidle');
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