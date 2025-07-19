import { LightningElement } from 'lwc';
import DECRIPTION_ONE from '@salesforce/label/c.descriptionOne'
import DECRIPTION_TWO from '@salesforce/label/c.descriptionTwo'

export default class CustomLabelsDemo extends LightningElement {
    // decriptionOne = DECRIPTION_ONE
    // decriptionTwo = DECRIPTION_TWO

    LABELS = {
        descriptionOne: DECRIPTION_ONE,
        descriptionTwo: DECRIPTION_TWO
    }
}