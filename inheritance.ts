export class SFLogin{

    protected username:string

    constructor(fname:string){
        this.username="demo"
        console.log(`SFLogin Constructor: fname = ${fname}, username = ${this.username}`);
    }
    displayLoginform(){
        console.log(`SFLogin Page information ${this.username}`)
    }
}