import { LightningElement } from 'lwc';
import LOCALE from '@salesforce/i18n/locale'
import CURRENCY from '@salesforce/i18n/currency'
import DIRECTION from '@salesforce/i18n/dir'

export default class InternationalizationProperty extends LightningElement {
    dir = DIRECTION
    number = 773278.45
    formattedNum = new Intl.NumberFormat(LOCALE,{ 
        style: 'currency', 
        currency: CURRENCY,
        currencyDisplay: 'symbol'
    }).format(this.number)

    
}