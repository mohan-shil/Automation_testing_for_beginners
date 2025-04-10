const {test, expect} = require('@playwright/test');

test('First playwright test', async ({browser})=> // => is called annonymus function === function()
{
    //chrome -> plugins/ cookies 
    const context = await browser.newContext();
    const page = await context.newPage();
    const userName = page.locator('#username');
    const signIn = page.locator('#signInBtn');
    const cardTitles = page.locator(".card-body a");
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    console.log(await page.title());
    //css or xpath
    await userName.fill('learning'); 
    await page.locator("[type='password']").fill('learning');
    await signIn.click();
    //wait untill this locator shown up page 
    //in selenium we have to use -> webdriverwait 
    console.log(await page.locator('[style*="block"]').textContent());
    await expect(page.locator("[style*='block']")).toContainText('Incorrect');
    // type === fill 
    await userName.fill('');
    await userName.fill('rahulshettyacademy');
    await signIn.click();
    console.log(await cardTitles.nth(1).textContent());
    console.log(await cardTitles.first().textContent());
    const allTitles = await cardTitles.allTextContents();
    console.log(allTitles);
     
})  

test('UI controls', async ({page})=> // => is called annonymus function === function()
{
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    const userName = await page.locator('#username');
    const signIn = await page.locator('#signInBtn');
    const dropDown = await page.locator('select.form-control');
    const documentsLink = await page.locator('a.blinkingText');
    await dropDown.selectOption('consult');
    // await page.pause();
    await page.locator('.radiotextsty').nth(1).click();
    await page.locator('#okayBtn').click();
    // Assertions if the radioBtn is checked or not
    console.log(await page.locator('.radiotextsty').nth(1).isChecked());
    await expect(page.locator('.radiotextsty').nth(1)).toBeChecked();
    await page.locator('#terms').click();
    // Assertions if the checkbox is checked or not
    console.log(await page.locator("#terms").isChecked());
    await expect(page.locator('#terms')).toBeChecked();
    await expect(documentsLink).toHaveAttribute('class','blinkingText');
    

})


test('child window handling', async({browser}) =>
{
    const context = await browser.newContext();
    const page = await context.newPage();
    const userName = page.locator('#username');
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    const documentsLink = page.locator('a.blinkingText');
    
    const [newPage] = await Promise.all([
    context.waitForEvent('page'), //listen for any page to open 
    documentsLink.click(), // new page is opened
    ])
    

    const text = await newPage.locator('.red').textContent();
    const arrayText = text.split('@')
    const domain = arrayText[1].split(' ')[0];
    // console.log(domain);

    await userName.type(domain);;
    console.log(await page.locator('#username').textContent());
    await page.pause();
    
});

