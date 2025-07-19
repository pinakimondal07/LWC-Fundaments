import { LightningElement } from 'lwc';

export default class QuizApp extends LightningElement {

    selected={} // for storing answers
    correctAnswers = 0 //to show the number of correct answers
    isSubmitted = false // use to show the result
    myQuestions=[
        {
            id:"Q1",
            question:"Which one of the following is not a template loop?",
            answers:{
                a:"for:each",
                b:"iterator",
                c:"map loop"
            },
            correctAnswer:"c"
        },
        {
            id:"Q2",
            question:"Which of the file is invald in LWC component folder?",
            answers:{
                a:".svg",
                b:".apex",
                c:".js"
            },
            correctAnswer:"b"
        },
        {
            id:"Q3",
            question:"WHich one of the following is not a directive?",
            answers:{
                a:"for:each",
                b:"if:true",
                c:"@track"
            },
            correctAnswer:"c"
        }
    ]

    //used for disabling the sumbmit button
    get allNotSelected(){
        return !(Object.keys(this.selected).length === this.myQuestions.length)
    }

    // for applying dynamic styling to our result
    get isScoredFull(){
        return `slds-text-heading_large ${this.myQuestions.length === this.correctAnswers?
            'slds-text-color_success':'slds-text-color_error'}`
    }

    // changeHandler get's called on every click on the options
    changeHandler(event){
        // const name = event.target.name
        // const value = event.target.value
        // This can also be written as below:
        const {name, value} = event.target 
        
        this.selected={...this.selected, [name]:value}
    }
    //form submit handler
    submitHandler(event){       //clicking 'Submit' will receive an event
        //As submit button is inside the form element it will refresh the page on clicking 'Submit', 
        //we need to prevent the default behaviour
        event.preventDefault()

        //filter - If it matches the expression, if it returns true, it returns that particular object, which means the item.
        //         Otherwise it will not return anything.
        let correct = this.myQuestions.filter(item=>this.selected[item.id] === item.correctAnswer)
        this.correctAnswers = correct.length
        this.isSubmitted = true
    }
    //form reset handler
    resetHandler(){
        this.selected ={}
        this.correctAnswers=0
        this.isSubmitted = false
    }
}