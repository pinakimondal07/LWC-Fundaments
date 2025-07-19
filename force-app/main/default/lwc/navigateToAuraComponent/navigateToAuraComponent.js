import { LightningElement } from 'lwc';
import {NavigationMixin} from 'lightning/navigation'

export default class NavigateToAuraComponent extends NavigationMixin(LightningElement) {
    navigateToAura(){
        this[NavigationMixin.Navigate]({
            type: 'standard__component',
            attributes:{
                componentName: 'c__lwcToAuraNavigation'
            },
            state:{
                c__id: '63288328899009281278'
            }
        })
    }
}