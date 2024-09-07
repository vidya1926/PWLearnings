
import { expect, test } from '@playwright/test'

test(`Learn window`, async ({ context, page }) => {

    await page.goto("https://login.salesforce.com/")
    const page_one = await context.newPage()
    await page_one.goto("https://www.google.com")
    const page_two = await context.newPage()
    await page_two.goto("https://www.flipkart.com")

    const allPages = context.pages();
    console.log(allPages.length)
    await page.bringToFront();
    const sFWindow = allPages[0]
    const gWindow = allPages[1]
    const flipWindow = allPages[2]
    console.log(await sFWindow.title());
    console.log(await gWindow.title());
    console.log(await flipWindow.title());
})

test(`Learn sequential approach`, async ({ context, page }) => {

    await page.goto("https://login.salesforce.com/")
    await page.locator("#username").fill("vidyar@testleaf.com")
    await page.locator("#password").fill("Sales@123")
    await page.locator("#Login").click()
    const windowPromise = context.waitForEvent('page')
    await page.click("//span[text()='Learn More']")
    const newPage = await windowPromise;
    const allPages = context.pages();
    allPages.forEach(async element => {
        const title = await element.title();
        console.log(`Title of each page is ${title}`)
    });
    await newPage.bringToFront()
    console.log(newPage.url());
    await newPage.locator("[name='q']").fill("Phones")

})





test(`Learn concurrent approach`, async ({ context, page }) => {

    await page.goto("https://www.leafground.com/window.xhtml")
    const [multiplePromise] = await Promise.all([
        context.waitForEvent('page'),
        page.getByText("Open Multiple", { exact: true }).click()
    ])
    const allWindows=multiplePromise.context().pages();
    console.log(allWindows.length)

    for(let tab of allWindows){
        console.log(await tab.title())
    }

    let webPage:any
    for (let i=0;i<allWindows.length;i++){
        const title= await allWindows[i].title();
        if(title==="Web Table"){
            webPage=allWindows[i]
        }
    }
   console.log(webPage.url())


})
test.only("Learn to upload file", async ({ page }) => {

    await page.goto("https://www.leafground.com/file.xhtml");

    await page.setInputFiles("input[type='file']", "./tests/day05/Day05.txt");

    //if the dom element is not available with type= file then goe with event handler
    //filechooser event 
    const uploadFile = page.waitForEvent('filechooser');
    await page.locator("[class$='ui-icon-plusthick']").last().click();
    const file = await uploadFile;
    await file.setFiles(["./tests/day05/sflog.jpg"]);
    await page.waitForTimeout(3000);
})

