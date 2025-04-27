const {test, expect} = require ('@playwright/test')

test('PopUp Validation', async ({page}) => 
{
    await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
    // await page.goto('https://google.com');
    // await page.goBack();
    // await page.goForward();
    await expect(page.locator('#displayed-text')).toBeVisible(); //assertion
    await page.locator('#hide-textbox').click();
    await expect(page.locator('#displayed-text')).toBeHidden();
    page.on('dialog', dialog => dialog.dismiss()); // for Ok == accept 
    await page.locator('#confirmbtn').click();
    await page.locator("#mousehover").hover();
    await page.pause();

});