import { LightningElement } from 'lwc';

export default class P2cParentComponent extends LightningElement {
    numb=50

    //Section for communication using non-premitive data type
    carouselData=[
        {
            src:"https://v1.lightningdesignsystem.com/assets/images/carousel/carousel-01.jpg",
            header:"First Card",
            description:"First Description"
        },
        {
            src:"https://v1.lightningdesignsystem.com/assets/images/carousel/carousel-02.jpg",
            header:"Second Card",
            description:"Second Description"
        },
        {
            src:"https://v1.lightningdesignsystem.com/assets/images/carousel/carousel-03.jpg",
            header:"Third Card",
            description:"Third Description"
        }
    ]


    //Section for Parent to Child communication on action
    percentage=20
    percentChange(event){
        this.percentage=event.target.value
    }

    //Section for Calling Child Method from Parent component
    handleClick(){
        this.template.querySelector('c-p2c-slider-component').resetSlider()
    }


}