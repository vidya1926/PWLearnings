abstract class WrapperMethod{
    typeAndEnter(){
        console.log("Type and enter data")
    }
    abstract clickandTab():void;
}

interface ElementAction{
    ele:string
    validateElement():void
}

class Appimpl extends WrapperMethod implements ElementAction{
    ele: string
    constructor(ele:string){
        super()
        this.ele=ele

    }
    validateElement(): void {
        
        console.log(`Check for visibiltiy of `+this.ele)
    }
    clickandTab(): void {
       console.log(`Click and apply tab to move on`)
    }
    
}

new Appimpl("Login").validateElement()