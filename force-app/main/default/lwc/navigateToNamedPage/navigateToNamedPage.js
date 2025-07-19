import { LightningElement } from 'lwc';
import {NavigationMixin} from 'lightning/navigation'

//wrapping the base component with the navigation mixin.
export default class NavigateToNamedPage extends NavigationMixin(LightningElement) {
    //Once the navigation mixin is available in the component, we can use this navigation mixin to navigate and 
    //we will pass our page reference.
    navigateToHomePage(){
        this[NavigationMixin.Navigate]({
            type:'standard__namedPage',
            attributes:{
                pageName:'home'
            }
        })
    }

    navigateToChatterPage(){
        this[NavigationMixin.Navigate]({
            type:'standard__namedPage',
            attributes:{
                pageName:'chatter'
            }
        })
    }
}