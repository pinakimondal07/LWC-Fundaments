import { LightningElement } from 'lwc';
import {NavigationMixin} from 'lightning/navigation'

export default class NavigateToVfPage extends NavigationMixin(LightningElement) {
    navigateToVfPage(){
        this[NavigationMixin.Navigate]({
            type: 'standard__webPage',
            attributes:{
                url: '/apex/navigateVfPage'
                //Now when we call this, it will take the URL, but it will not navigate automatically. It will return a 
                //promise basically.And to listen to the promise we need a then method.
            }
        }).then(generatedUrl => {
            console.log(generatedUrl)
            window.open(generatedUrl) //window.open - js property to open a URL
        })
    }
}