import { LightningElement } from 'lwc';

export default class HelloConditionalRendering extends LightningElement {
    isVisible = false;
    name
    handleClick(){
        this.isVisible = true;
    }

    changeHandler(event){          //As soon as we type something it will receive as an event hence event parameter is passed
        this.name = event.target.value;
    }

    //getter
    get hellomethod(){
        return this.name === 'hello';
    }

    //falsy values in js
    //x=0, false, undefined, null, "", -0, 0n, NaN
}