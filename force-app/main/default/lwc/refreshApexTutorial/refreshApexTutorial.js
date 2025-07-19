import { LightningElement, wire } from 'lwc';
import getContactList from '@salesforce/apex/accountController.getContactList'
import {updateRecord} from 'lightning/uiRecordApi'
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import {refreshApex} from '@salesforce/apex'
const columns = [
    {label:'First Name', fieldName:'FirstName', editable:true},
    { label: 'Last Name', fieldName: 'LastName', editable: true },
    { label: 'Email', fieldName: 'Email', type:'email' }
]

export default class RefreshApexTutorial extends LightningElement {
    columns = columns
    draftValues = []
    @wire(getContactList)
    contact;

    handleSave(event){
        console.log(event.detail)
        const recordInputs = event.detail.draftValues.map(draft=>{  //slice method is used to create a shallow 
        //copy of the draftValues array
            const fields = {...draft}
            //const fields = Object.assign({}, draft) //we are saying whatever the each value that is coming from this draft 
            //values, just create a new object for that and assign it to fields.
            return {fields}
        })
        console.log("recordInputs", recordInputs)

        const promises = recordInputs.map(recordInput => updateRecord(recordInput))
        Promise.all(promises).then(result=>{
            this.showToastMsg('Success', 'Contacts updated', 'success')
            this.draftValues=[]
            return refreshApex(this.contact)    //To refresh the data after the update operation is done without page refresh.
            //without this data will be updated but the updated data will not be reflected in the UI until you refresh the page.
        }).catch(error=>{
            this.showToastMsg('Error creating record', error.body.message, error)
        })
    }
    showToastMsg(title, message, variant){
        this.dispatchEvent(
            new ShowToastEvent({
                title:title,
                message:message,
                variant:variant //'success'
            })
        )
    }

}