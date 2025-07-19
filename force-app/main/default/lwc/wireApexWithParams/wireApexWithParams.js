import { LightningElement, wire } from 'lwc';
import filterAccountType from '@salesforce/apex/accountController.filterAccountType'

export default class WireApexWithParams extends LightningElement {
    selectedType=''
    @wire(filterAccountType, {type: '$selectedType'})
    filteredAccount

    get typeOptions(){
        return [
            {label:'Customer - Channel', value:'Customer - Channel'},
            {label:'Customer - Direct', value:'Customer - Direct'},
            {label:'Select None', value:''}
        ]
    }

    typeHandler(event){
        this.selectedType = event.target.value
    }
}