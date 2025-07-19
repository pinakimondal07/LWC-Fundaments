import { LightningElement, wire } from 'lwc';
import getAccountList from '@salesforce/apex/accountController.getAccountList'

export default class WireApexMethod extends LightningElement {
    accountList
    //@wire as property
    @wire(getAccountList)
    accounts

    //@wire as a function - The real use case of wire as function is whenever you want to transform the data.
    @wire(getAccountList)
    accountshandler({data, error}){
        if(data){
            this.accountList = data.map(item => {   //It will tranform the data
                let newType = item.Type === 'Customer - Channel' ? 'Channel': item.Type === 'Customer - Direct' ? 'Direct' : '------'
                return {...item, newType}   //Return all the fields as it is and add newType field
            })
        }
        if(error){
            console.error(error)
        }
    }

}