import { LightningElement } from 'lwc';
import getAccountList from '@salesforce/apex/accountController.getAccountList'

export default class CallApexMethodsImperatively extends LightningElement {
    accounts
    handleClick(){
        //getAccoutList is a Promise call
        getAccountList().then((result)=>{
            this.accounts = result
        }).catch(error =>{
            console.error(error)
        })
    }
}