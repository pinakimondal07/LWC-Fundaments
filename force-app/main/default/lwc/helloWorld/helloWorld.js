import { LightningElement, track } from 'lwc';

//The component that we created and we already know each component is a class. In our case the Hello World is our class.
export default class HelloWorld extends LightningElement {
    //Local properties (aka State Variables)
    fullname="Zero to Hero"
    //employeename = ["Nikhil","John","Jakob"]        //array
    employeename ={                                 //object
        fullname:"Nikhil",
        age: 27
    }
    //method

    //Section for Two way data binding in a Template
    title="aura"
    changeHandler (event){
        this.title = event.target.value //This will update the title property with the value entered in the input field 
        //and it will re-render the template
    }

    //Section for Two way data binding for object data type in a Template
    //To use @track decorator we need to import the decorator from lwc - syntax: import { track } from 'lwc';
    @track address={
        city:'Melborne',
        postcode:3008,
        country:'Australia'
    }
    trackHandler(event){
        this.address.city = event.target.value
    }
    //In real time we should not use this method as we should always generate a new copy rather than mutating the existing one.
    // address={}
    // trackHandler(event){
    //     this.address={...this.address, "city":event.target.value}
    // }

    //Section for getters in LWC
    users = ["John","Smith","Nick"]
    //this.fUser = this.users[0] //whenever the users[0] gets updated we need to explecitely update the this.firstUser 
    //so we should use gatters as whenever the user[0] gets updated it re-renders
    get firstUser(){
        return this.users[0]
    }

    num1 = 10
    num2 = 20
    get multiply(){
        return this.num1 * this.num2
    }


}