import { LightningElement, wire } from 'lwc';
import { getObjectInfo, getPicklistValues } from 'lightning/uiObjectInfoApi'
import INDUSTRY_FIELD from '@salesforce/schema/Account.Industry'
import TYPE_FIELD from '@salesforce/schema/Account.Type'
import ACCOUNT_OBJECT from '@salesforce/schema/Account'

export default class GetPickListValuesAdapter extends LightningElement {
    selectedIndustry = ''
    industryOptions = []
    selectedType = ''
    typeOptions = []


    @wire(getObjectInfo, {objectApiName: ACCOUNT_OBJECT})
    objectInfo

    @wire(getPicklistValues, {recordTypeId:'$objectInfo.data.defaultRecordTypeId', fieldApiName:INDUSTRY_FIELD})
    industryPickList({data, error}){
        if(data){
            console.log('Picklist Data : ',data)
            this.industryOptions = [...this.generatePickList(data)]     //pass the data to the function
        }
        if(error){
            console.error(error)
        }
    }
    
    // always create a method called generatePickList()
    generatePickList(data){
        //Whenever a data comes we have to generate it in the structured format.
        //And whenever we have to generate something, it means we have to transform the data. And whenever we have to transform 
        //the data, we have to use a map operation.
        return data.values.map(item=>({ label: item.label, value: item.value }))

    }
    handleIndustryChange(event) {
        this.selectedIndustry = event.detail.value
    }

    // Second Picklist for Type Field
    @wire(getPicklistValues, {recordTypeId:'$objectInfo.data.defaultRecordTypeId', fieldApiName:TYPE_FIELD})
    typePickList({data, error}){
        if(data){
            this.typeOptions = [...this.generatePickList(data)]     //pass the data to the function
        }
        if(error){
            console.error(error)
        }
    }

    handleTypeChange(event) {
        this.selectedType = event.detail.value
    }
}