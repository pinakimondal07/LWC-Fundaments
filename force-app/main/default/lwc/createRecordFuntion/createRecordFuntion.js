import { LightningElement } from 'lwc';
import { createRecord } from 'lightning/uiRecordApi'
import CONTACT_OBJECT from '@salesforce/schema/Contact'
import {ShowToastEvent} from 'lightning/platformShowToastEvent'

export default class CreateRecordFuntion extends LightningElement {
    formFields={}
    changeHandler(event){
        const {name, value} = event.target  // FirstName : 'Nikhil'
        this.formFields[name] = value
        //forFields={
        // "FirstName": "Nikhil"}
    }

    createContact(){
        const recordInput ={apiName:CONTACT_OBJECT.objectApiName, fields: this.formFields}
        //Once the createRecord gets called, it will return a promise and to listen the promise we need a then method
        createRecord(recordInput).then(result => {
            this.showToast('Success!!',`Contact created with id - ${result.id}`, 'success')
            this.template.querySelector('createForm').reset()
            formFields={}

        }).catch(error => {
            this.showToast('Error occured while creating the record', error.body.message, 'error')
        })
    }

    showToast(title, message, variant){
        this.dispatchEvent(new ShowToastEvent({
            title,
            message,
            variant: variant       //by default it is success
        }))
    }
}