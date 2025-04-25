const { test , expect } = require ('@playwright/test');

test('Calendar Validations', async ({page})=> 
{

    const monthNumber = "6";
    const monthName = "June";
    const date = "15";
    const year = "2027";

    await page.goto('https://rahulshettyacademy.com/seleniumPractise/#/offers');
    await page.locator('.react-date-picker__button').nth(1).click();
    await page.locator(".react-calendar__navigation__label").click();
    await page.locator(".react-calendar__navigation__label").click();
    await page.getByText(year).click();
    await page.getByText(monthName).click();
    await page.locator(".react-calendar__month-view__days__day").getByText(date).click();
    

});