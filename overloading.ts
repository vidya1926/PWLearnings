
class EleClick{

    public click(ele:string):void
    public click(ele:string,forceClick?:boolean):void

    public click(ele:string,forceClick?:boolean){
        if(!forceClick){
            console.log("Do only click action")
        }else{
            console.log("Click the ele forcefully")
        }

    }
}

const clickAction=new EleClick();
clickAction.click("Login")