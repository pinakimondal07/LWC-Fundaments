import { LightningElement, api } from 'lwc';

export default class P2cAlertComponent extends LightningElement {
    //This Alert component will act as a Child Component
    @api message
    @api cardHeading
    @api number
    @api isvalid
}