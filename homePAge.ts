import { SFLogin } from "./inheritance";

class hpPage extends SFLogin{

    verifytitle(title:string){    
     this.username="Vidya" //overridden
     console.log(`title is verified ${this.username} ${title}` )
     }
 
 }
  
 const hpage = new hpPage("Bharathi")
 hpage.displayLoginform()
 hpage.verifytitle("Home")

 
