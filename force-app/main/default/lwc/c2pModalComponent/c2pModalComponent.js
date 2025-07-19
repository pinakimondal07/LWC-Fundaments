import { LightningElement } from 'lwc';

export default class C2pModalComponent extends LightningElement {

    //Section for Calling Parent using Simple Custom Event
    // closeHandler(){
    //     const myEvent= new CustomEvent('close')
    //     this.dispatchEvent(myEvent)
    // }
    //---------------------------------------------------------------


    //Section for Calling Parent using Custom Event with data
    // closeHandler(){
    //     const myEvent = new CustomEvent('close',{
    //         detail:{
    //             msg:'Modal Succefully Closed !!',
    //             closedby: 'Admin'}
    //     })

    //     this.dispatchEvent(myEvent)
    // }
    //------------------------------------------------------------------------- 

    
    //Section for Calling Parent using Event Bubling
    closeHandler(){
        const myEvent = new CustomEvent('close',{
            bubbles:true,
            detail:{
                msg:'Modal Succefully Closed !!'}
        })
        this.dispatchEvent(myEvent)
    }

    footerHandler(){
        console.log("footerHandler called")
    }
}