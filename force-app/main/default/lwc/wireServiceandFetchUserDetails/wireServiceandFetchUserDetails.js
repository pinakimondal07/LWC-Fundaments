import { LightningElement, wire  } from 'lwc';
import USER_OBJECT from '@salesforce/schema/User'   //Import reference of Salesforce User Object

import ID from '@salesforce/user/Id'    //To get the currect Logged in User's ID
//Basically, we can't fetch email and name or any other details in this way and can fetch only the logged in user ID. 
//So, we will use this 'ID' to fethch the user's other details like Name and Email using the @wire service

import {getRecord} from 'lightning/uiRecordApi';    //Adapter for wire service

//Always immport the field reference instead hard coding object field names, so that we can fetch them dynamically
import NAME_FIELD from '@salesforce/schema/User.Name';  //Import references of Salesforce User Object Fields
import EMAIL_FIELD from '@salesforce/schema/User.Email';

//We can also assign it to a global variable and fetch them later
const fields = [NAME_FIELD,EMAIL_FIELD];


export default class WireServiceandFetchUserDetails extends LightningElement {
    userId = ID
    userDetail
    user= USER_OBJECT

    //@wire Syntax
    // @wire(adapter, {adapterConfig})
    // propertyOrfunction

    //@wire(getRecord, {recordId:'005As00000DswCiIAJ', fields:['User.Name','User.Email']})    //fields that we want to fetch
    //Salesforce recomends never to hardcode the fields as if the field name is updated teh code will break

    //So we will write the above code as below
    //@wire(getRecord,{recordId:'005As00000DswCiIAJ', fields:[NAME_FIELD,EMAIL_FIELD]})
    @wire(getRecord, {recordId:'$userId', fields})   //In JS, If key and value is same,then don't need to define it again
    //$userId is being used to dynamically assign the value of the ID

    //1. Catch the data using Function - Recomended way as writing and debugging a function is easy
    // userDetailHandler(response){    
           //data and the error are the property that are hardcoded by Salesforce in the response object.
    //     console.log('Response',response)
    //     console.log('Data',response.data)
    //     console.log('Error',response.error)
    // }

    //So we can directly work with data and error properly
    userDetailHandler({data, error}){
        //data and error are property of object response, so they should be inside {}
        if(data){
            this.userDetail = data.fields
        }
        if(error){
            console.error(error)
        }
    }
    //-------------------------------------------------------------------------------------------- 

    //2. Catch the data using Property
    @wire(getRecord, {recordId:'$userId', fields:['User.Name','User.Email']})
    userDetailProperty //Not recomended as debugging as property is very tough
    
    //so always write functions and once you are good with the integration, your data is mapping correctly, then move to property
}