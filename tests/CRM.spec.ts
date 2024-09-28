
import { test } from "../fixtures/customFixture";


test.use({storageState:"storagestate/login.json"})
test(`HomePage`,async({hPage})=>{    
    
   // await login.navigate()
    // await login.enterCredentials()
    // await login.clickLogin()
    await hPage.clickCRM()

})