import { LightningElement } from 'lwc';
import { loadStyle } from 'lightning/platformResourceLoader';
import FONTAWESOME_CSS from '@salesforce/resourceUrl/fontawesome';

export default class MemoryGameLwc extends LightningElement {
    isLibLoaded= false
    openedCards= []
    matchedCard= []
    totalTime = '00:00'
    timerRef
    moves= 0
    showCongrats = false
    cards= [
        {id:1, listClass:"card", type:'diamond', icon:'fa fa-diamond'},
        {id:2, listClass:"card", type:'plane', icon:'fa fa-paper-plane-o'},
        {id:3, listClass:"card", type:'anchor', icon:'fa fa-anchor'},
        {id:4, listClass:"card", type:'bolt', icon:'fa fa-bolt'},
        {id:5, listClass:"card", type:'cube', icon:'fa fa-cube'},
        {id:6, listClass:"card", type:'anchor', icon:'fa fa-anchor'},
        {id:7, listClass:"card", type:'leaf', icon:'fa fa-leaf'},
        {id:8, listClass:"card", type:'bicycle', icon:'fa fa-bicycle'},
        {id:9, listClass:"card", type:'diamond', icon:'fa fa-diamond'},
        {id:10, listClass:"card", type:'bomb', icon:'fa fa-bomb'},
        {id:11, listClass:"card", type:'leaf', icon:'fa fa-leaf'},
        {id:12, listClass:"card", type:'bomb', icon:'fa fa-bomb'},
        {id:13, listClass:"card", type:'bolt', icon:'fa fa-bolt'},
        {id:14, listClass:"card", type:'bicycle', icon:'fa fa-bicycle'},
        {id:15, listClass:"card", type:'plane', icon:'fa fa-paper-plane-o'},
        {id:16, listClass:"card", type:'cube', icon:'fa fa-cube'},
      ]

      get gameRating(){
        let stars = this.moves<12 ? [1,2,3]:this.moves>=13 ? [1,2]:[1]
        return this.matchedCard.length === 16 ? stars : []
      }

    displayCard(event){
        let currCard = event.target
        //You have a class list and within that class list, you add few more class.
        currCard.classList.add("open", "show", "disabled")
        //So basically what we are doing here is whichever the card you have clicked, we are pushing it into an array.
        this.openedCards = this.openedCards.concat(event.target)
        const len = this.openedCards.length
        if(len === 2){
            //So if the array has two cards then we are comparing them.
            this.moves = this.moves+1
            if(this.moves === 1){
                this.timer()
            }
            if(this.openedCards[0].type === this.openedCards[1].type){
                this.matchedCard = this.matchedCard.concat(this.openedCards[0],this.openedCards[1])
                this.matched()
            }
            else{
                this.unmatched()
            }
        }
    }

    matched(){
        this.openedCards[0].classList.add("match", "disabled")   //adding match and disabled class in the openedCards.
        this.openedCards[1].classList.add("match", "disabled")
        this.openedCards[0].classList.remove("open", "show")   //removing open, show and disabled class from the openedCards.
        this.openedCards[1].classList.remove("open", "show")
        this.openedCards=[]
        if(this.matchedCard.length === 16){
            window.clearInterval(this.timerRef)
            this.showCongrats = true
        }
    }

    unmatched(){
        this.openedCards[0].classList.add("unmatched")
        this.openedCards[1].classList.add("unmatched")
        //All cards should be disabled when two cards are open eventhough it's unmatched.
        //So I'll say trigger an action disabled, so it will disable all the cards in the grid.
        this.action('DISABLE')

        setTimeout(()=>{
            this.openedCards[0].classList.remove("show", "open", "unmatched")
            this.openedCards[1].classList.remove("show", "open", "unmatched")
            this.action('ENABLE')   //It will enable all the cards once we reset or remove the cards back to normal
            this.openedCards=[]
        },1100)
        
    }

    
    action(action){
        let cards = this.template.querySelectorAll('.card')
        //Convert cards to an Array
        Array.from(cards).forEach(item => {
            if(action === 'ENABLE'){
                let isMatch = item.classList.contains('match')  //check whether that card has a match class or not.
                if(!isMatch){
                    item.classList.remove('disabled')
                }
            }
            if(action === 'DISABLE'){
                item.classList.add('disabled')
            }
        })
    }

    timer(){
        let startTime = new Date()
        this.timerRef = setInterval(()=>{
            let diff = new Date().getTime() - startTime.getTime()
            let d = Math.floor(diff/1000)
            let m = Math.floor(d % 3600 / 60)
            let s = Math.floor(d % 3600 % 60)
            const mDisplay = m>0 ? m+(m===1? "minute, ":"minutes, "):""
            const sDisplay = s>0 ? s+(s===1? "second":"seconds"):""
            this.totalTime = mDisplay+sDisplay

        },1000)
    }

    shuffle(){
        this.showCongrats = false
        this.openedCards=[]
        this.matchedCard=[]
        this.moves=0
        this.totalTime = '00:00'
        window.clearInterval(this.timerRef)
        let elem = this.template.querySelectorAll('.card')
        Array.from(elem).forEach(item => {
            item.classList.remove("show", "open" , "match", "disabled")
        })

        /* Shuffling and Swaping Logic */
        let array = [...this.cards]
        let counter = array.length
        while(counter > 0){
            let index = Math.floor(Math.random()*counter)
            counter--

            let temp = array[counter]
            array[counter] = array[index]
            array[index] = temp
        }
        this.cards = [...array]
    }
    

    renderedCallback(){
        if(this.isLibLoaded){
            return
        }
        else{
            //Load style is a promise call so it will return a promise on when it loads successfully.
            loadStyle(this, FONTAWESOME_CSS+'/fontawesome/css/font-awesome.min.css').then(() => {
                console.log('Stylesheet loaded successfully')
                this.shuffle()
            }).catch(error => {
                console.log(error);
            })
            this.isLibLoaded=true
        }
    }
}