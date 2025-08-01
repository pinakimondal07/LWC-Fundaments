import { LightningElement, wire } from 'lwc';
import SAMPLEMC from "@salesforce/messageChannel/SampleMessageChannel__c"
import {subscribe, MessageContext, APPLICATION_SCOPE, unsubscribe} from 'lightning/messageService';
export default class LmsComponentX extends LightningElement {
    recievedMessage
    subscription

    @wire(MessageContext)
    context                 //@wire is stored in context

    connectedCallback(){
        this.subscribeMessage()
    }

    subscribeMessage(){
        //Because we are in the class and in the class you can't use the function directly. 
        //Either it should be in the method or it should be a adapter(@wire, @api)

        //subscribe(messageContext, messageChannel, listener, subscriberOptions)
        this.subscription= subscribe(this.context, SAMPLEMC, (message)=>{this.handleMessage(message)}, {scope:APPLICATION_SCOPE})
    }

    handleMessage(message){
        this.recievedMessage = message.lmsData.value? message.lmsData.value :'NO Message published'
    }

    unsubscribeMessage(){
        unsubscribe(this.subscription)
        this.subscription = null
    }
    
}