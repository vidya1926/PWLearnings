
import { expect, test } from '@playwright/test'
import path from 'path';


test("Learn to upload file", async ({ page }) => {
    await page.goto("https://the-internet.herokuapp.com/upload");
    //Create a promise
    const filePromise = page.waitForEvent('filechooser');
    //User action
    await page.click("#drag-drop-upload");
    //Resolving the promise
    const fileChooser = await filePromise;

    await fileChooser.setFiles("./data/Cheatsheet.txt");

})

test(`Test to upload file`, async({page})=>{

    await page.goto("https://leafground.com/file.xhtml");
  
    await page.screenshot({path:"./data/Screenshot.jpg"})

    await page.locator(".card").filter({hasText:"Basic Upload"})
    .locator("input[type='file']").setInputFiles("./data/Cheatsheet.txt")
    await page.waitForTimeout(3000);


    const uploadFile = page.waitForEvent('filechooser');
    await page.locator("[class$='ui-icon-plusthick']").last().click();
    const file = await uploadFile;
    await file.setFiles(["./data/git-log (3).jpg", "./data/git-log (2).jpg"]);
    await page.waitForTimeout(3000);


})

test(`Download file using waitForEvent`, async({page})=>{

    await page.goto("https://leafground.com/file.xhtml");
    //Creating a promise
    const filedownloadPromise = page.waitForEvent("download");
    await page.getByText("Download", {exact:true}).click();
    //Promise is getting resolved
    const download = await filedownloadPromise;
    await download.saveAs(path.join("downloads/"+download.suggestedFilename()));
    console.log(`The url is ${download.url()}`);

   
    })


    test.only("Learn to upload datafile", async ({ page }) => {

        await page.goto("https://www.leafground.com/file.xhtml");
    
        await page.setInputFiles("input[type='file']", "./data/Cheatsheet.txt");
    
        
        const uploadFile = page.waitForEvent('filechooser');
        await page.locator("[class$='ui-icon-plusthick']").last().click();
        const file = await uploadFile;
        await file.setFiles(["./data/screenshot.png", "./day08/downloadedfiles/TestLeaf Logo.png"]);
        await page.waitForTimeout(3000);
    })