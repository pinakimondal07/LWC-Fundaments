import { LightningElement, api} from 'lwc';

export default class FetchRecordIdAndObjectName extends LightningElement {
    //By default, if your component is in the record page, record ID will map to the record ID property 
    //and the spelling should be same then only it will map.
    @api recordId

    //Similarly to map the object name, you have to use object name as a property and decorate it with the add the rate API.
    @api objectApiName

    //So once the component loads in the record page it will see, okay it's expecting something from the parent.
    //Parent is a page in this case and the parent will pass a record ID as well as the record API name if they have.

    //If this component is available in the app page there we don't have record ID or object name, so it will be empty.
}