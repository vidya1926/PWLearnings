import {chromium, test} from "@playwright/test"
import testData from '../day08/credentials.json'
import fs from 'fs'
import path from 'path'


for(const data of testData)
test(`Read JSON Data ${data.testData}`,async({page})=>{
        
        await page.goto("http://leaftaps.com/opentaps/control/main")
        await page.locator("#username").fill(data.username);
         page.fill("#password",data.password);
        await page.locator(".decorativeSubmit").click();
        await page.waitForTimeout(3000);
})

// const data= JSON.parse(fs.readFileSync(path.join(__dirname,"credentials.json"),'utf-8'))
// for(const readData of data)
//     test(`Read JSON  using parser  ${readData.testData}`,async({page})=>{
            
//             await page.goto("http://leaftaps.com/opentaps/control/main")
//             await page.locator("#username").fill(readData.username);
//              page.fill("#password",readData.password);
//             await page.locator(".decorativeSubmit").click();            
//             await page.waitForTimeout(3000);
//     })


     const jsonValue:string=   JSON.stringify(testData,null,3);

     fs.writeFileSync("./data/OutputData.json",jsonValue,"utf-8");


  
    