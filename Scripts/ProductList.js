let displayedBooks = 0;
const pageSize = 12;
let allBooksData = [];
let myTabContent = document.getElementById("myTabContent");
let allBooks = document.createElement("DIV");
let container = document.createElement("DIV");
let row = document.createElement("DIV");
const viewMoreButton = document.getElementById("viewmorebtn");

const AddBookstoDom = (books) => {
    const remainingBooks = books.slice(displayedBooks, displayedBooks + pageSize);
    remainingBooks.forEach(function (book) {
        var bookCard = createBookCard(book.title, book.author, book.description, book.price, book.imgLink);
        row.appendChild(bookCard);
    });

    displayedBooks += remainingBooks.length;
    container.append(row);

    console.log('Displayed Books:', displayedBooks);

    if (displayedBooks >= allBooksData.length) {
        console.log('Disabling button');
        viewMoreButton.disabled = true;
    }
};

const getBooks = () => {
    
        fetch("Data/productData.json")
            
            .then(res => res.text())
            .then(data => JSON.parse(data))
            .then(data => {
                allBooksData = data.books;
                AddBookstoDom(allBooksData);
            })
            .catch(err => console.log(err));
    
};

viewMoreButton.addEventListener('click', getBooks);
document.addEventListener('DOMContentLoaded', getBooks);

allBooks.classList.add("tab-pane", "fade", "show", "active");
allBooks.setAttribute("id", "allBooks");
allBooks.setAttribute("role", "tabpanel");
allBooks.setAttribute("aria-labelledby", "allBooks-tab");

myTabContent.appendChild(allBooks);

container.classList.add("ccontainer", "mt-5");

allBooks.appendChild(container);
row.classList.add("row");


// Function to create a book card dynamically
function createBookCard(title, author, description, price, imageSrc) {
    var colDiv = document.createElement('div');
    colDiv.classList.add('col-md-3', 'mb-4');

    var cardDiv = document.createElement('div');
    cardDiv.classList.add('card');

    var imgDiv = document.createElement('div');
    imgDiv.classList.add('custom-card-img');

    var img = document.createElement('img');
    img.src = imageSrc;
    img.classList.add('card-img-top', 'img-fluid');
    img.alt = title + ' Image';

    var bodyDiv = document.createElement('div');
    bodyDiv.classList.add('card-body');

    var cardTitle = document.createElement('h5');
    cardTitle.classList.add('card-title');
    cardTitle.textContent = title;

    var cardAuthor = document.createElement('p');
    cardAuthor.classList.add('card-author');
    cardAuthor.textContent = "Author: " + author;

    var cardDescription = document.createElement('p');
    cardDescription.classList.add('card-text');
    cardDescription.textContent = description;

    var cardPrice = document.createElement('p');
    cardPrice.classList.add('card-text', 'price');
    cardPrice.textContent = '$' + price.toFixed(2);

    var addToCartBtn = document.createElement('a');
    addToCartBtn.href = '#';
    addToCartBtn.classList.add('btn', 'btn-dark');
    addToCartBtn.innerHTML = '<i class="fas fa-shopping-cart"></i> Add to Cart';

    imgDiv.appendChild(img);
    bodyDiv.appendChild(cardTitle);
    bodyDiv.appendChild(cardAuthor);
    bodyDiv.appendChild(cardDescription);
    bodyDiv.appendChild(cardPrice);
    bodyDiv.appendChild(addToCartBtn);

    cardDiv.appendChild(imgDiv);
    cardDiv.appendChild(bodyDiv);

    colDiv.appendChild(cardDiv);

    return colDiv;
}