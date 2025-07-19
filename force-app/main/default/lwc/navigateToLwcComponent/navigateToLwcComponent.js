import { LightningElement } from 'lwc';
import {NavigationMixin} from 'lightning/navigation'

export default class NavigateToLwc extends NavigationMixin(LightningElement) {
    navigateToLwc(){
        var definition ={
            componentDef: 'c:navigationLwcTarget',
            attributes:{
                recordId: '63288328899009281278'
            }
        }
        this[NavigationMixin.Navigate]({
            type: 'standard__webPage',
            attributes:{
                //So we want to pass the URL.But now we want to open the lightning Web component in a page, but we don't have 
                //a URL for that.
                //So for that there is a hack or a trick.
                //We'll construct a URL using btoa technique or a method, a btoa basically a method that creates a base64 
                //encoded ASCII string from the binary string.
                url: '/one/one.app#'+btoa(JSON.stringify(definition))
                // btao - this method converts the string to base64 encoded form
            }
        })
    }
}