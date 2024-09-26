import test from '@playwright/test'
import dotenv from 'dotenv'
import path from 'path';
//dotenv.config()
const environment=process.env.ENV || 'qa'

//const environment='qa'
dotenv.config({ path: path.resolve(__dirname, `../../data/${environment}.env`) });//set the path of the file

test(`Read data from ENV file`,async({page})=>{

    const url=process.env.LT_BASEURL as string
    const username=process.env.LT_USERNAME as string
    const password=process.env.LT_PASSWORD as string

    await page.goto(url)
    await page.fill("#username",username)
    await page.waitForTimeout(3000)
    await page.fill("#password",password)
    await page.click(".decorativeSubmit")    
})