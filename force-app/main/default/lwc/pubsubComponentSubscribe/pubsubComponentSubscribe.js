import { LightningElement } from 'lwc';
import pubsub from 'c/pubsub'

export default class PubsubComponentSubscribe extends LightningElement {
    message
    connectedCallback(){
        this.callSubscriber()
    }
    callSubscriber(){
        pubsub.subscribe('publishcomponent', (message)=>{       //arrow function is used to recognize this.message
            this.message = message
        })
    }

    // function(message){
    // this.message = message}
    // can be written using arroow function so that message doesn't return value as undefined (message) => this.message = message
}