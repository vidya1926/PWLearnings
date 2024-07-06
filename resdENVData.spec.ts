import {test} from "@playwright/test"
import dotenv from 'dotenv'
dotenv.config();

test(`Read data from .env file  `,async({page})=>{

        const url:string = process.env.QA_URL as string
        const uname:string = process.env.QA_Username as string
        const pwd:string = process.env.QA_Password as string
    
        await page.goto(url)
        await page.fill("#username", uname);
        await page.fill("#password", pwd);
        await page.click(".decorativeSubmit");
        await page.waitForTimeout(3000);
})
