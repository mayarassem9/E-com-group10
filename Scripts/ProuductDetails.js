import {Item,Order} from "../../Data/orderClass.js"
import * as valid from '../../order/valid.js';
import data from "../../Data/books.json" assert { type: 'json' }; 

document.addEventListener('DOMContentLoaded', () => {
    // displayBookDetails(theBook);
    //asmaa
    
    var orders = JSON.parse(localStorage.getItem("orders")) || [];

    
    localStorage.setItem("orders", JSON.stringify(orders));
   
    valid.notificationUpdate(orders);


    // Get the book ID from the URL
    const bookId = getBookIdFromUrl();
    console.log(bookId);

    document.getElementById("addBtn").addEventListener("click",function(){
        valid.addToCart(Item,Order,data,bookId);
         orders=JSON.parse(localStorage.getItem("orders"));
        valid.notificationUpdate(orders);
    })

    if (bookId) {
        // Retrieve book details from local storage
        const allBooksData = getBooksFromLocalStorage();
        const theBook = allBooksData.find(theBook => theBook.ID == bookId);
        console.log(allBooksData);
        console.log(theBook);

        if (theBook) {
            // Display book details on the page
            displayBookDetails(theBook);
        } else {
            // Handle the case where the book with the specified ID is not found
            console.error('Book not found');
        }
    } else {
        // Handle the case where no book ID is provided in the URL
        console.error('Book ID not provided in the URL');
    }

    
});
const getBooksFromLocalStorage = () => {
    const storedBooks = localStorage.getItem('booksData');
    return storedBooks ? JSON.parse(storedBooks) : [];

};
function getBookIdFromUrl() {
    const url = new URL(window.location.href);
    return url.searchParams.get('id');
}
// MAYAR
function displayBookDetails(theBook) {
    console.log("from displayBookDetails");
     // select the html tags where the product details will be added
    var BookName = document.querySelector('div.product__details__text h4');
    var Authorname = document.querySelector('div.product__details__text h5');
    var PriceTag = document.querySelector('div.product__details__text h3');
    var BookDetails = document.querySelector('div.product__details__text p');
    var BookImg = document.querySelector('#bookCover');

    // Set the text content for each element
    if (BookName) BookName.textContent = theBook.title;
    if (Authorname) Authorname.textContent = theBook.author;
    if (PriceTag) PriceTag.textContent =theBook.price ;
    if (BookDetails) BookDetails.textContent = theBook.description;
    if (BookImg) BookImg.src = theBook.imgLink;
}


