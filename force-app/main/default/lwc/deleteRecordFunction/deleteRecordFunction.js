import { LightningElement } from 'lwc';
import {deleteRecord} from 'lightning/uiRecordApi'
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class DeleteRecordFunction extends LightningElement {
    recordId
    changeHandler(event){
       this.recordId = event.target.value
    }

    deleteHandler(){
        deleteRecord(this.recordId).then(()=>{
            this.showToast("Sucess!!", "Deleted Successfully!!", 'success')
        }).catch(error=>{
            console.error(error)
            //error.body.output.errors[0].message - to print the error message in the toast message
            this.showToast("Error Occurred!!", error.body.output.errors[0].message, 'error')
        })
    }

    showToast(title, message, variant){
        this.dispatchEvent(new ShowToastEvent({
            title,
            message,
            variant,
            mode: 'sticky'
        }))
    }

}