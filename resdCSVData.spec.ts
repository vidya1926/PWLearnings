import {chromium, test} from "@playwright/test"
import { parse } from "csv-parse/sync"
import fs from 'fs'
import path from 'path'


const loginData=parse(fs.readFileSync(path.join(__dirname,"./data.csv")),{
        "columns":true,
        "skip_empty_lines":true,
})

for(const tdata of loginData)
test(`Read CSV file Data ${tdata.testName}`,async({page})=>{
        await page.goto("http://leaftaps.com/opentaps/control/main")
        await page.locator("#username").fill(tdata.username);
         page.fill("#password",tdata.password);
        await page.locator(".decorativeSubmit").click();
        await page.waitForTimeout(3000);
})
