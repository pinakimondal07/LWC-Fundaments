import { LightningElement, wire } from 'lwc';
import {getNavItems} from 'lightning/uiAppsApi'


export default class GetNavItemAdapter extends LightningElement {
    result 

    @wire(getNavItems, {
        navItemNames: ['standard-Account'],
        pageSize: 30})
    navItemsHandler({data}){
        if(data){
            console.log('getNavItem ',data)
            this.result = data.navItems[0]
        }
    }
}