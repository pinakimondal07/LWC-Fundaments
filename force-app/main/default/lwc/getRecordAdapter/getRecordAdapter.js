import { LightningElement, wire, api } from 'lwc';
import { getRecord, getFieldValue, getFieldDisplayValue } from 'lightning/uiRecordApi'
import NAME_FIELD from '@salesforce/schema/Account.Name'
import OWNER_FIELD_NAME from '@salesforce/schema/Account.Owner.Name'
import ANNUAL_REVENUE_FIELD from '@salesforce/schema/Account.AnnualRevenue'
const fields = [NAME_FIELD, OWNER_FIELD_NAME, ANNUAL_REVENUE_FIELD]

export default class GetRecordAdapter extends LightningElement {
    name
    ownerName
    annualRevenue

    //When you want your Lightning Web Component (LWC) to work with any record (Account, Contact, User, etc.), 
    //you should use the @api recordId property.
    @api recordId   //We hwant the record Id to be dynamin and receive it from the Record Page 

    //getRecord using fields
    @wire(getRecord, {recordId:'$recordId', fields})
    accountHandler({data}){
        if(data){
            console.log(data)
            this.name = data.fields.Name.displayValue ? data.fields.Name.displayValue : data.fields.Name.value
            this.ownerName = data.fields.Owner.displayValue ? data.fields.Owner.displayValue : data.fields.Owner.value
            this.annualRevenue = data.fields.AnnualRevenue.displayValue ? data.fields.AnnualRevenue.displayValue : data.fields.AnnualRevenue.value
        }
    }
    //------------------------------------------------------------------------------------------------------------------------------------------------------c/c2pModalComponent

    name1
    ownerName1
    annualRevenue1
    //getRecord using layoutType - it returns all the fields that exist in that layout.
    @wire(getRecord, {recordId:'$recordId', layoutTypes:['Full'], modes:['View']})
    //Use diffent function name as its gets over-ride
    accountHandler1({data}){
        if(data){
           this.name1 = data.fields.Name.displayValue ? data.fields.Name.displayValue : data.fields.Name.value
            this.ownerName1 = data.fields.Owner.displayValue ? data.fields.Owner.displayValue : data.fields.Owner.value
            this.annualRevenue1 = data.fields.AnnualRevenue.displayValue ? data.fields.AnnualRevenue.displayValue : data.fields.AnnualRevenue.value 
        }
    }
    //--------------------------------------------------------------------------------------------------------------------------------------------------------

    //getFieldValue and getFieldDisplayValue - these are the methods to get the field value and display value of a perticular data
    name2
    ownerName2
    annualRevenue2
    @wire(getRecord, {recordId:'$recordId', fields})
    accountHandler2({data}){
        if(data){
            console.log(data)
            //To use 'getFieldValue' and 'getFieldDisplayValue' functions we need to import it from 'lightning/uiRecordApi'
            this.name2 = getFieldValue(data, NAME_FIELD) //Pass the field name as the parameter
            this.ownerName2 = getFieldValue(data, OWNER_FIELD_NAME)
            this.annualRevenue2 = getFieldDisplayValue(data, ANNUAL_REVENUE_FIELD) // to get the display value of the field
            
        }
    }
}