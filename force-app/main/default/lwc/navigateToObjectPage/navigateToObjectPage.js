import { LightningElement } from 'lwc';
import {NavigationMixin} from 'lightning/navigation'
import {encodeDefaultFieldValues} from 'lightning/pageReferenceUtils'
//encodeDefaultFieldValues - encodes the default field values into a string

export default class NavigateToObjectPage extends NavigationMixin(LightningElement) {

    //Section for Navigate to New Record
    navigateToNewRecord(){
        this[NavigationMixin.Navigate]({
            type: 'standard__objectPage',
            attributes: {
                objectApiName: 'Contact',
                actionName: 'new'
            }
        })
    }

    
    //Section for Navigate to New Record with default values
    navigateToNewRecordWithDefault(){
        const defaultValue = encodeDefaultFieldValues({
            FirstName :'Suresh',    //API name of the field with the default value
            LastName : 'Kumar',
            LeadSource: 'Other'
        })

        this[NavigationMixin.Navigate]({
            type: 'standard__objectPage',
            attributes: {
                objectApiName: 'Contact',
                actionName: 'new'
            },
            //Now we want to pass these default values along with our navigation and the data is always called as state
            state:{
                defaultFieldValues: defaultValue
            }
        })
    }


    //Section for Navigate to List View
    navigateToListView(){
        this[NavigationMixin.Navigate]({
            type: 'standard__objectPage',
            attributes: {
                objectApiName: 'Contact',
                actionName: 'list'
            },
            //When we see the list, we have the filter options recent views and all.
            //So likewise we can set the state of those things as well.
            state:{
                fileterName:"Recent"
            }
        })
    }


    //Section for Navigate to File
    navigateToFiles(){
        this[NavigationMixin.Navigate]({
            type: 'standard__objectPage',
            attributes: {
                //For files the object API name is ContentDocument
                objectApiName: 'ContentDocument',
                actionName: 'home'
            }
        })
    }
}