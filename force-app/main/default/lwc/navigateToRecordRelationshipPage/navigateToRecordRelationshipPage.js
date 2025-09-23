import { LightningElement } from 'lwc';
import {NavigationMixin} from 'lightning/navigation'

export default class NavigateToRecordRelationshipPage extends NavigationMixin(LightningElement) {
    navigateToRelatedRecord(){
        this[NavigationMixin.Navigate]({
            type: 'standard__recordRelationshipPage',
            attributes: {
                recordId:'001gK00000D3GtaQAF',
                objectApiName: 'Account',
                relationshipApiName: 'Contacts',    //related record to which you want to navigate to
                actionName: 'view'
            }
        })
    }

}