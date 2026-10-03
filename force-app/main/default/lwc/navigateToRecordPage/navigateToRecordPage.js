import { LightningElement } from 'lwc';
import {NavigationMixin} from 'lightning/navigation'

export default class NavigateToRecordPage extends NavigationMixin(LightningElement) {
    recordViewMode(){
        console.log('View Mode');
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId:'003dM00002STKi9QAH',
                objectApiName:'Contact',
                actionName:'view'
            }
        })
    }

    recordEditMode(){
        console.log('Edit Mode');
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId:'003dM00002STKi9QAH',
                objectApiName:'Contact',
                actionName:'edit'
            }
        })
    }
}