import { LightningElement } from 'lwc';
import USER_IMAGE from '@salesforce/resourceUrl/user_image'
import USER_WALKING_IMAGE from '@salesforce/resourceUrl/user_walking'
export default class StaticResourceImages extends LightningElement {
    userImage = USER_IMAGE
    userWalkingImage = USER_WALKING_IMAGE
}