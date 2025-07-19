import { LightningElement } from 'lwc';
//Section for js file import
import MOMENT from '@salesforce/resourceUrl/moment'
import {loadScript} from 'lightning/platformResourceLoader'
//---------------------------------------------------------------------

//Section for CSS file import
import ANIMATE from '@salesforce/resourceUrl/animate'
import {loadStyle} from 'lightning/platformResourceLoader'
//-----------------------------------------------------------------------

export default class ThirdPartyFiles extends LightningElement {
    currentDate=''
    isLibLoaded= false

    //If we are loading a script or file we want to perform a action and this lifecycle hook(renderedCallback()) gives us the 
    //assurance that the rendering of the component is complete.
    renderedCallback(){
        //Thats why we will do all the operations inside this hook.

        if(this.isLibLoaded){
            return
        }
        else{
            
                // loadStyle(this, ANIMATE+'/animate/animate.min.css').then(() => {   //Use this if only one file is needed to be loaded
                // //loaded succesfully
                // }).catch(error =>{ console.error(error)})
            
                // loadScript(this, MOMENT+'/moment/moment.min.js').then(() => {
                // this.setDateOnScreen()
                // }).catch(error =>{console.error(error)})
                // this.isLibLoaded=true
                //Here we are doing two Asynchronous call and telling the renderedCallback to make isLibLoaded true
                //But if both library are dependent to each other, this will not work out because we are just running both independently.

                //If you want to perform an operation once all the libraries gets uploaded, then we're going to use the Promise.all
                Promise.all([
                        loadStyle(this, ANIMATE+'/animate/animate.min.css'),
                        loadScript(this, MOMENT+'/moment/moment.min.js')
                ]).then(() => {
                    this.setDateOnScreen()
                })

                this.isLibLoaded = true
        }
            
        
    }
    setDateOnScreen(){
        this.currentDate= moment().format('LLLL')
    
    }
}