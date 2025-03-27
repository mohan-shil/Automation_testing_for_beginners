// const {test, expect} = require('@playwright/test');

// test('First playwright test', async ({browser})=> // => is called annonymus function === function()
// {
//     //chrome -> plugins/ cookies 
    
//     const context = await browser.newContext();
//     const page = await context.newPage();
//     // const userName = page.locator('#username');
//     // const signIn = page.locator('#signInBtn');
//     // const cardTitles = page.locator(".card-body a");
//     await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
//     console.log(await page.title());
//     //css or xpath
//     await userName.fill('learning'); 
//     await page.locator("[type='password']").fill('learning');
//     await signIn.click();
//     //wait untill this locator shown up page 
//     //in selenium we have to use -> webdriverwait 
//     console.log(await page.locator('[style*="block"]').textContent());
//     await expect(page.locator("[style*='block']")).toContainText('Incorrect');
//     // type === fill 
//     await userName.fill('');
//     await userName.fill('rahulshettyacademy');
//     await signIn.click();
//     console.log(await cardTitles.nth(1).textContent());
//     console.log(await cardTitles.first().textContent());
//     const allTitles = await cardTitles.allTextContents();
//     console.log(allTitles);
    
// })  

// // test.only('Page playwright test', async ({page})=> // => is called annonymus function === function()
// // {
    
// //     await page.goto('https://google.com');
// //     //get title-assertion 
// //     console.log(await page.title());
// //     await expect(page).toHaveTitle('Google');
// //     //css or xpath 

// // })


