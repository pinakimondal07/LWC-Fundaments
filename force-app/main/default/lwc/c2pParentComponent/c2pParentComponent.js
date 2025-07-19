import { LightningElement } from 'lwc';

export default class C2pParentComponent extends LightningElement {

    
    showModal=false
    clickHandler(){
        this.showModal=true
    }

    //Section for Calling Parent using Simple Event
    // okHandler(){
    //     this.showModal=false
    // }
    //--------------------------------------------------------------------

    //Section for Calling Parent using Custom Event with data
    msg
    closedby
    okHandler(event){
        this.msg=event.detail.msg
        this.closedby=event.detail.closedby
        this.showModal=false
        
    }
}