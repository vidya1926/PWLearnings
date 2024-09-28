import {test as baseTest} from '@playwright/test'
import { LoginPage } from "../pages/loginPage"
import { HomePage } from '../pages/homePage'

type myCustomFixture={
    lPage:LoginPage
    hPage:HomePage
}

export const test=baseTest.extend<myCustomFixture>({

    lPage:async({page,context},use)=>{
        const lp=new LoginPage(page,context)
        await lp.navigate()
        await lp.enterCredentials()
        await lp.clickLogin()
        await lp.context.storageState({path:"storagestate/login.json"}) 
              use(lp)
    },
   hPage:async({page,context},use)=>{
     const hp=new HomePage(page,context)
     use(hp)
   }

})