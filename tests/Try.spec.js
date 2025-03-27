const {test, expect} = require ('@playwright/test');

test( 'Example test file', async({browser})=>
{
    //chorme / plugins 
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://rahulshettyacademy.com/client');
    // console.log(await page.title());
    await page.locator("[type = 'email']").fill('mohan.shil.007@gmail.com');
    await page.locator("[type = 'password']").fill('Iam4913@');
    await page.locator('[type="submit"]').click();
    // console.log(await page.locator('.card-body h5 ').nth(0).textContent());
    // console.log(await page.locator('.card-body h5').allTextContents());
    await page.locator('.card-body button').nth(0).click();
    await page.locator('.product-buttons').click();


});