
export class Employee{ 
    readonly empName:string
    public empId:string
    private salary:string  
    protected department:string
    
    public get readEmpSalary(){
        return this.salary
    }

    public set wrirteSalary(salary:string){
        this.salary=salary
    }

}
const s=new Employee();
s.wrirteSalary="803549";
console.log(s.readEmpSalary)
console.log(s.empId)







