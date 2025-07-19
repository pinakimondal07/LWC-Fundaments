import { LightningElement } from 'lwc';
const BOOK_URL = 'https://www.googleapis.com/books/v1/volumes?q='

export default class BooksListingApp extends LightningElement {sta
    query='Man'
    books=[]
    timer

    //To call the API on the load of the component
    //connectedCallback is a lifecycle hook that runs when the component is inserted into the DOM
    //It is used to perform any setup or initialization tasks, such as fetching data or setting up event listeners.
    connectedCallback(){
        this.fetchBookData()
    }

    fetchBookData(){
        //In a arrow funtion don't use {} if there is only one statement
        //If you use {} then you need to use return statement otherwise it will return undefined
        fetch(BOOK_URL + this.query).then(response => {return response.json()}).then(data => {
            //Format the data to get the items array
            //If the data is not null then format it, otherwise set books to an empty array
            this.books = data ? this.formatData(data) : []
            console.log(data)
        }).catch(error => console.error(error))
    }

    fetchBooksHandler(event) {
        //Get the value of the input field
        this.query = event.target.value

        //What I want is if you press something before one second this, cancel this timeout and register it again.
        window.clearTimeout(this.timer) //Debouncing - Set a new timer
        
        //Call the fetchBookData method to fetch the books based on the query afer a delay
        //Using setTimeout to simulate a delay before fetching the data
        this.timer = setTimeout(() => {
            this.fetchBookData()
        }, 1000)
    }

    formatData(data){
        let books =  data.items.map(item=>{
            let id = item.id
            let thumbnail = item.volumeInfo.imageLinks && (item.volumeInfo.imageLinks.smallThumbnail || item.volumeInfo.imageLinks.thumbnail)
            let title = item.volumeInfo.title
            let publishedDate = item.volumeInfo.publishedDate
            let maturityRating = item.volumeInfo.maturityRating ||'NA'
            return {id, thumbnail, title, publishedDate, maturityRating}
    
        })
        return books
    }
}