import { LightningElement } from 'lwc';

export default class LifeCycleChild extends LightningElement {
    constructor()
    {
        super()
        console.log("Child Constructor called")
    }
    connectedCallback()
    {
        console.log("Child connectedCallback called")

        //Section to simulate Error Phase whenever child is loaded
        throw new Error ('Loading of Child component failed')
    }
    renderedCallback()
    {
        console.log("Child renderedCallback called")
    }

    disconnectedCallback(){
       alert('Child disconnectedCallback called !!') 
    }
}