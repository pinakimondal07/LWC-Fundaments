import { LightningElement, wire } from 'lwc';
import { getPicklistValuesByRecordType, getObjectInfo } from 'lightning/uiObjectInfoApi'
import ACCOUNT_OBJECT from '@salesforce/schema/Account'

export default class GetPicklistValuesByRecordTypeAdapter extends LightningElement {
    ratingOptions=[]
    industryOptions = []
    selectedRating = ''
    selectedIndustry = ''
    @wire(getObjectInfo, { objectApiName: ACCOUNT_OBJECT })
    objectInfo

    @wire(getPicklistValuesByRecordType, {recordTypeId:'$objectInfo.data.defaultRecordTypeId', objectApiName: ACCOUNT_OBJECT})
    picklisthandler({data, error}){
        if(data){
            console.log('Picklists Data : ',data)
            this.ratingOptions = [...this.picklistGenerator(data.picklistFieldValues.Rating)]
            this.industryOptions = [...this.picklistGenerator(data.picklistFieldValues.Industry)]
        }
        if(error){
            console.error(error)
        }
    }

    handleChange(event){
        const {name, value} = event.target  //Short hand nothation for event.target.name and event.target.value
        console.log(name +' ==> '+ value)
        if(name==='Rating'){
            this.selectedRating = value
        }
        if(name==='Industry'){
            this.selectedIndustry = value
        }
    }

    //Reusable method to generate the picklist values
    picklistGenerator(data){
        return data.values.map(item=>({ label: item.label, value: item.value }))
    }

}