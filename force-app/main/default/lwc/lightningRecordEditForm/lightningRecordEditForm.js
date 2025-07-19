import { LightningElement } from 'lwc';
import CONTACT_OBJECT from '@salesforce/schema/Contact'
import NAME_FIELD from '@salesforce/schema/Contact.Name'
import TITLE_FIELD from '@salesforce/schema/Contact.Title'
import EMAIL_FIELD from '@salesforce/schema/Contact.Email'
import PHONE_FIELD from '@salesforce/schema/Contact.Phone'
import ACCOUNT_FIELD from '@salesforce/schema/Contact.AccountId'

export default class LightningRecordEditForm extends LightningElement {
    objectName = CONTACT_OBJECT
    fields = {
        accountField: ACCOUNT_FIELD,
        nameField: NAME_FIELD,
        titleField: TITLE_FIELD,
        emailField: EMAIL_FIELD,
        phoneField: PHONE_FIELD
    }

    //Reset the lightning-record-edit-form 
    handleReset() {
        const inputFields = this.template.querySelectorAll('lightning-input-field')
        if(inputFields){
            Array.from(inputFields).forEach(field => {
                field.reset()
            })
        }
    }

}