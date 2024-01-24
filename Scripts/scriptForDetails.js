document.addEventListener('DOMContentLoaded', () => {
    // Get the book ID from the URL
    const bookId = getBookIdFromUrl();
    console.log(bookId);

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

function displayBookDetails(theBook) {
    const productDetailsContainer = document.getElementById('productDetailsContainer');

    // Create elements to display book details
    // const imageElement = document.createElement('img');
    // imageElement.src = theBook.imgLink;

    const titleElement = document.createElement('h1');
    titleElement.textContent = theBook.title;

    const authorElement = document.createElement('p');
    authorElement.textContent = `Author: ${theBook.author}`;

    const descriptionElement = document.createElement('p');
    descriptionElement.textContent = theBook.description;

    const priceElement = document.createElement('p');
    const formattedPrice = typeof theBook.price === 'number' ? `$${theBook.price.toFixed(2)}` : 'Invalid Price';
    priceElement.textContent = `Price: ${formattedPrice}`;

    // Add elements to the container

    productDetailsContainer.appendChild(titleElement);
    productDetailsContainer.appendChild(imageElement);

    productDetailsContainer.appendChild(authorElement);
    productDetailsContainer.appendChild(descriptionElement);
    productDetailsContainer.appendChild(priceElement);
}






