import { LightningElement, wire } from 'lwc';
import { getListUi } from 'lightning/uiListApi'
import CONTACT_OBJECT from '@salesforce/schema/Contact';
import TITLE_FIELD from '@salesforce/schema/Contact.Title'

export default class GetListUiAdapter extends LightningElement {
    contacts = []
    pageToken= null
    nextPageToken = null
    previousPageToke = null

    @wire(getListUi, { objectApiName: CONTACT_OBJECT, 
        listViewApiName: 'AllContacts', 
        pageSize: 10, 
        sortBy: TITLE_FIELD,
        pageToken: '$pageToken'
        })
    listViewHandler({data, error}){
        if(data){
            console.log('getListUi ',data);
            this.contacts = data.records.records
            this.nextPageToken = data.records.nextPageToken
            this.previousPageToke = data.records.previousPageToken
        }
        if(error){
            console.error(error);
        }
    }

    handlePreviousPage(){
        this.pageToken = this.previousPageToke
    }

    handleNextPage(){
        this.pageToken = this.nextPageToken
    }
}