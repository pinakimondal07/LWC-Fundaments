import { LightningElement } from 'lwc';
import findAccounts from '@salesforce/apex/accountController.findAccounts'

export default class ApexImperativeWithParams extends LightningElement {
    searchKey
    accounts
    timer
    searchHandler(event){
        window.clearTimeout(this.timer)     //clears the timer
        this.searchKey = event.target.value //searches the key
        this.timer = setTimeout(()=>{
            this.callApex() //call the apex method method after 1 seconds so that it does not call the apex method on every keystroke
        },1000)
        
    }

    callApex(){
        findAccounts({searchKey: this.searchKey}).then((result)=>{
            this.accounts = result
        }).catch(error =>{
            console.error(error)
        })
    }
}