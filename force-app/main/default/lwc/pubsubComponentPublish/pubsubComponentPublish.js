import { LightningElement } from 'lwc';
import pubsub from 'c/pubsub'

export default class PubsubComponentPublish extends LightningElement {
    message
    inputHandler(event){
        this.message = event.target.value
    }
    publishHandler(){
        pubsub.publish('publishcomponent', this.message)
    }

}