import { LoginPage } from "./loginPage";

export class HomePage extends LoginPage{
    async clickCRM(){
        await this.page.goto("http://leaftaps.com/opentaps/control/login")
        await this.page.getByText("CRM/SFA",{exact:true}).click()
    }
}