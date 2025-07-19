import { LightningElement } from 'lwc';

export default class LifecycleParent extends LightningElement {
    isChildVisible = false

    constructor()
    {
        super()
        console.log("Parent Constructor called")
    }
    connectedCallback()
    {
        console.log("Parent connectedCallback called")
    }
    renderedCallback()
    {
        console.log("Parent renderedCallback called")
    }

    //Section for Mounting Phase renderedCallback() exution to show that it gets called every there is change in DOM
    // name
    // changeHandler(event){
    //     this.name = event.target.value
    // }

    //Section for Unmounting Phase to demostrate the disconnectedCallback()
    handleClick(){ 
        this.isChildVisible = !this.isChildVisible
    }

    //We will catch the error message thrown by the child component using errorCallback(err,stack) method
    errorCallback(error,stack){
        console.log(error.message)
        console.log(stack)
    }
}