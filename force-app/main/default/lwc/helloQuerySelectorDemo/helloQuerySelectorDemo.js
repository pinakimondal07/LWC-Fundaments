import { LightningElement } from 'lwc';

export default class HelloQuerySelectorDemo extends LightningElement {
    userNames=["John","Mike","Steve","Bob","Jane","Mark"]

    fetchDetailHandler(){
        // this.template means just look into your template only not to the other component's template in the folder.
        const elem = this.template.querySelector('h1')
        elem.style.border="1px solid red"
        console.log(elem.innerText)


        const userElements = this.template.querySelectorAll('.name')  
        //userElements is not an array its a node, so we must convert it to an array
        Array.from(userElements).forEach(uelem => {
            console.log(uelem.innerText)

            //Append attributes dynamically
            uelem.setAttribute('title',uelem.innerText)
        })

        

        //lwc:dom="manual" is a directive to attach a HTML child element to the parent element.
        //Like if I give you a real time example, when we work on the charts and charting library and we want
        //to append the chart within the element, so we use this particular directive to add this directive to
        //a native HTML element, to attach an element as a child.

        const childElem = this.template.querySelector('.child')
        childElem.innerHTML = '<p>Hey I am a child</p>'
        
    }
}