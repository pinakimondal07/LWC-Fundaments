import { LightningElement, wire } from 'lwc';
import { CurrentPageReference } from 'lightning/navigation'

export default class FetchCurrentPageReference extends LightningElement {
    //To call CurrentPageReference we need @wire
    @wire(CurrentPageReference)
    pageref 

    get currPageReference(){
        return this.pageref ? JSON.stringify(this.pageref, null, 2) : ""
    }
    

}