import { LightningElement, api } from 'lwc';

export default class SetterDemoChild extends LightningElement {
    userDetail
    @api get details(){
        return this.userDetail
    }
    set details(data){
        //data.age = data.age*2   
        //It will throw an error as we are directly updating the original value without creating shadow copy
        let newAge= data.age*2
        this.userDetail={...data,age:newAge, "location":"Hyderabad"}
        //Modified the age value which is being passed by the parent
    }
}