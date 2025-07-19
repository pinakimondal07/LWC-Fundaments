import { LightningElement, wire } from 'lwc';
import { getObjectInfo, getObjectInfos } from 'lightning/uiObjectInfoApi'
import ACCOUNT_OBJECT from '@salesforce/schema/Account'
import OPPORTUNITY_OBJECT from '@salesforce/schema/Opportunity'

export default class GetObjectInfoAdapter extends LightningElement {
    @wire(getObjectInfo, { objectApiName: ACCOUNT_OBJECT })
    //Catch as Property - Asynchoronous approach. It will go and fetch the data.
    objectInfo

    //Section for getObjectInfos Adapter
    objectNames = [ACCOUNT_OBJECT, OPPORTUNITY_OBJECT]
    objectInfos
    @wire(getObjectInfos, {objectApiNames:'$objectNames'}) //It's always good to pass dynamic things as a reactive property.
    objectInfosHandler({data}){
        if(data){
            console.log('Data : ', data)
            console.log(typeof(data))   //Object
            this.objectInfos = data
        }
        
    }
    
}