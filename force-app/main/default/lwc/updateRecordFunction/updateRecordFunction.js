import { LightningElement, wire } from 'lwc';
import {getListUi} from 'lightning/uiListApi'   //to get the list view data of Contact object
import { updateRecord  } from 'lightning/uiRecordApi';
import CONTACT_OBJECT from '@salesforce/schema/Contact'

//Column names
const COLS =[
    {label:'Id', fieldName:'Id'},
    {label:'Name', fieldName:'Name'},
    {label:'Title', fieldName:'Title'},
    {label:'Phone', fieldName:'Phone', editable:true},
    {label:'Email', fieldName:'Email', type:'email', editable:true}
]


export default class UpdateRecordFunction extends LightningElement {

    contacts=[]
    columns = COLS
    draftValues=[]
    @wire(getListUi, {
        objectApiName:CONTACT_OBJECT,
        listViewApiName:'AllContacts'
    })
    
    listViewHandler({data, error}){
        if(data){
            console.log(data)
            this.contacts = data.records.records.map(item=>{
                return {
                    "Id": this.getValue(item, 'Id'),
                    "Name": this.getValue(item, 'Name'),
                    "Title": this.getValue(item, 'Title'),
                    "Phone": this.getValue(item, 'Phone'),
                    "Email": this.getValue(item, 'Email')
                }
            })
        }
        if(error){
            console.error(error)
        }
    }

    getValue(data, field){
        return data.fields[field].value
    }

    handleSave(event){
        console.log(JSON.stringify(event.detail.draftValues))   //draftValues is the array of rows that you have updated in the datatable.
        const recordInputs=event.detail.draftValues.map(draft=>{//The rows that you have updated, it will come in the form of draft.
            const fields = {...draft}

            //We need to pass it in the form of fields so our each record input should be a object of fields.
            return { fields:fields }
        })
        //Now we have multiple record inputs. We are running and calling the updateRecord multiple time based on the number 
        //of record inputs or based on the number of rows we have updated.
        const promises = recordInputs.map(recordInput=>updateRecord(recordInput))

        //Once all the promises come, we are calling the Promise.all()
        Promise.all(promises).then(()=>{
            //Once all the updation completes, then it will call the then method and will print contact updated successfully.
            console.log('Contact updated Successfully')
            this.draftValues=[] //We are clearing the draft values so that it will not show the updated rows in yellow in the datatable.
        }).catch(error=>{
            console.error("Error updating the record", error)
        })
        
    }

}