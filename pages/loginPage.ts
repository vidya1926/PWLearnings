import {BrowserContext, Page} from '@playwright/test'
import fs from 'fs'
import test from "playwright/test";
import { parse } from "csv-parse/sync";
import path from 'path';

export class LoginPage{
     page:Page
     context:BrowserContext
     constructor(page:Page,context:BrowserContext){
        this.page=page
        this.context=context
     }
      userData=parse(fs.readFileSync(path.join(__dirname,"../data/loginData.csv"),'utf-8'),{
        columns:true, // to make the first row as header
        skip_records_with_empty_values:true
      })
    async navigate(){
      await this.page.goto("http://leaftaps.com/opentaps/control/main")
    }
    async enterCredentials(){
        await this.page.fill("#username",this.userData[0].Username)
        await this.page.fill("#password",this.userData[0].password)
    }
    async clickLogin(){
        await this.page.click(".decorativeSubmit")
    }
    async verifyUrl(){
       console.log( await this.page.title())
    }

}
