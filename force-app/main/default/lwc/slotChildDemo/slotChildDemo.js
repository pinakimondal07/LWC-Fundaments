import { LightningElement } from 'lwc';

export default class SlotChildDemo extends LightningElement {
    handleFooterChange(){
        const footerElem = this.template.querySelector('.slds-card__footer')
        if(footerElem){
            //If the footer is available it will remove the hide class, so that footer becomes visible
            //Otherwise it will keep the footer hidden
            footerElem.classList.remove('slds-hide')
        }
    }
}