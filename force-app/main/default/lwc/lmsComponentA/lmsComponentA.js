import { LightningElement, wire } from 'lwc';
import SAMPLEMC from "@salesforce/messageChannel/SampleMessageChannel__c"

//Always to use message context.Whenever you are in the lightning web component that extends lightning element.
import {MessageContext, publish} from 'lightning/messageService'


export default class LmsComponentA extends LightningElement {
    inputValue

    @wire(MessageContext)
    context

    inputHandler(event){
        this.inputValue = event.target.value
    }

    publishMessage(){
        const message={
            lmsData:{
                value:this.inputValue
            }
        }

        //publish(messageContext, messageChannel, message)
        publish(this.context, SAMPLEMC, message)
    }
}