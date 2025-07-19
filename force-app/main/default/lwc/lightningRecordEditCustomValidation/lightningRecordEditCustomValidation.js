import { LightningElement } from 'lwc';
import ACCOUNT_OBJECT from '@salesforce/schema/Account'
import { ShowToastEvent } from 'lightning/platformShowToastEvent'


export default class LightningRecordEditCustomValidation extends LightningElement {
    objectName = ACCOUNT_OBJECT
    inputValue=''
    handleChange(event){ 
        this.inputValue = event.target.value
    }

    handleSubmit(event){
        event.preventDefault()      //It will prevent the browser from refreshing once we click the submit button

        const inputCmp = this.template.querySelector('lightning-input') //fetching the input field
        const value= inputCmp.value
        if(!value.includes('Australia')){
            //Check the whether the input field contains 'Australia' or not. If not then show the validation error message
            inputCmp.setCustomValidity("The account name must include 'Australia'")

        }
        else { 
            inputCmp.setCustomValidity("")
            const fields = event.detail.fields
            fields.Name = value
            this.template.querySelector('lightning-record-edit-form').submit(fields)
        }

        //throw the error message on the screen
        inputCmp.reportValidity()
    }

    successHandler(event){
        const toatEvent = new ShowToastEvent({
            title: 'Account Created Successfully',
            message: "Record Id :"+ event.detail.id,
            variant: 'success'
        })
        this.dispatchEvent(toatEvent)
    }

    handleError(event){
        const evnt = new ShowToastEvent({
            title: 'Something went wrong while creating the Account',
            message: event.detail.message,
            variant: 'error'
        })
        this.dispatchEvent(evnt)
    }
}