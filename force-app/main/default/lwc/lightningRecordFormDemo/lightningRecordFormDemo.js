import { LightningElement, api} from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent'
import ACCOUNT_OBJECT from '@salesforce/schema/Account'
import NAME_FIELD from '@salesforce/schema/Account.Name'
import ANUAAL_REVENUE_FIELD from '@salesforce/schema/Account.AnnualRevenue'
import TYPE_FIELD from '@salesforce/schema/Account.Type'
import INDUSTRY_FIELD from '@salesforce/schema/Account.Industry'

export default class LightningRecordFormDemo extends LightningElement {

    @api recordId
    @api objectApiName

    objectName = ACCOUNT_OBJECT 
    fieldList = [NAME_FIELD, ANUAAL_REVENUE_FIELD, TYPE_FIELD, INDUSTRY_FIELD]

    handleSuccess(event) {
        console.log(event.detail.id)
        const toastEvent = new ShowToastEvent({
            title: 'Success',
            message: 'Account created successfully. Record Id: '+event.detail.id,
            variant: 'success'
        })
        this.dispatchEvent(toastEvent)
    }
}