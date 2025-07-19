import { LightningElement } from 'lwc';
import FORM_FACTOR from '@salesforce/client/formFactor';

export default class FormfactorDemo extends LightningElement {
    formFactor = FORM_FACTOR
}