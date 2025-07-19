import { LightningElement } from 'lwc';
import { ShowToastEvent} from 'lightning/platformShowToastEvent'

export default class ToastNotifications extends LightningElement {

    // successToastHandler(){
    //     const event = new ShowToastEvent({
    //         title: 'Success!!',
    //         message: 'Account Created!!',
    //         variant: 'success'
    //     })
    //     this.dispatchEvent(event)
    // }

    //Instead of writing the same function code again and again we can use a common function and call it.
    showToast(title, message, variant){
        const event = new ShowToastEvent({
            title,      //title:title
            message,    //messahe:message
            variant,    //variant:variant
            messageData:[       //Here in this we can pass data in form of string or object only
                'Salesforce',{
                    url:'https://www.salesforce.com',
                    label:'Click Here to Know More'
                }
            ],
            mode: 'sticky'
            //We can pass the values for the messageData and mode from the called methods also, however in this case we are 
            //chosing the same values for all the methods so we are not passing them dynamically.
        })
        this.dispatchEvent(event)
    }

    successToastHandler(){
        this.showToast('Success!!', 'Your {0} Account Created!! {1}', 'success')
        // 0 - index 0 of the messageData Array
        // 1 - index 1 of the messageData Array
    }
    
    errorToastHandler(){
        this.showToast('Error!!', 'Account Creation Failed!!', 'error')
    }

    warningToastHandler(){
        this.showToast('Warning!!', 'Password should be strong!!', 'warning')
    }

    infoToastHandler(){
        this.showToast('Info!!', 'Summer 20 release is available!!', 'info')
    }

}