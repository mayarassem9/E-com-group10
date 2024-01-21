$(document).ready(function(){

    /* poster Section Index.html*/
    
        var imageContainer = document.querySelector('.image-container');
        var images = Array.from(imageContainer.querySelectorAll('.image'));

        function resetImagesPosition() {
            imageContainer.style.transition = 'transform 2s ease';
            imageContainer.style.transform = 'translateY(0)';
            // Force reflow to apply the changes immediately
            void imageContainer.offsetWidth;
            imageContainer.style.transition = 'transform 2s ease-in-out';
        }

        setInterval(function () {
            // Apply a transform to move images to the top smoothly
            imageContainer.style.transform = 'translateY(-25%)';

            setTimeout(function () {
                // Move the first image to the end
                var firstImage = images.shift();
                images.push(firstImage);

                // Update the container with the new order
                images.forEach(function (image) {
                    imageContainer.appendChild(image);
                });

                // Reset the transform
                resetImagesPosition();
            }, 1000); // Set a timeout to match the transition duration
        }, 2000); // Set the interval (in milliseconds) between image movements

        // Reset images position when transitioning to the next or previous slide
        var carousel = new bootstrap.Carousel(document.getElementById('carouselExampleIndicators'), {
            interval: 5000, // Set the interval (in milliseconds) between slide transitions
            wrap: true
        });

        carousel._element.addEventListener('slide.bs.carousel', function () {
            resetImagesPosition();
        });
    
});










// ************  Creation of tabs ***************


//the div for section for products 
let sectionProducts = document.querySelector(".sectionContainer");
//the search part 
// Create elements
const rowDiv = document.createElement('div');
rowDiv.classList.add('row', 'my-3');

const customDiv = document.createElement('div');
customDiv.classList.add('col-md-6', 'offset-md-3');

const form = document.createElement('form');
form.classList.add('d-flex');

const input = document.createElement('input');
input.classList.add('form-control', 'me-2');
input.setAttribute('type', 'search');
input.setAttribute('id', 'searchInput')
input.setAttribute('placeholder', 'Search');
input.setAttribute('aria-label', 'Search');

const button = document.createElement('button');
button.classList.add('btn', 'btn-outline-dark');
button.setAttribute('type', 'button');
button.setAttribute('id','searchButton');
button.innerHTML = '<i class="fas fa-search"></i>';

// Append elements
form.appendChild(input);
form.appendChild(button);

customDiv.appendChild(form);

rowDiv.appendChild(customDiv);
sectionProducts.appendChild(rowDiv);



// navs for best sellers and so on 
const ul = document.createElement('ul');
ul.classList.add('nav', 'nav-tabs');
ul.setAttribute('id', 'myTab');

// Create array of tab data
const tabData = [
    { id: 'allBooks', iconClass: 'fas fa-book pr-3', text: 'All Books', active: true },
    { id: 'bestSeller', iconClass: 'fas fa-fire pr-3', text: 'Best Seller', active: false },
    { id: 'recentlyAdded', iconClass: 'fas fa-clock pr-3', text: 'Recently Added', active: false },
    { id: 'category', iconClass: 'fas fa-list pr-3', text: 'Categories', active: false }
];

// Create li elements and append to ul
tabData.forEach(tab => {
    const li = document.createElement('li');
    li.classList.add('nav-item');
    
    const button = document.createElement('button');
    button.classList.add('nav-link');
    button.setAttribute('id', `${tab.id}-tab`);
    button.setAttribute('data-toggle', 'tab');
    button.setAttribute('data-target', `#${tab.id}`);
    button.setAttribute('type', 'button');
    button.setAttribute('role', 'tab');
    button.setAttribute('aria-controls', tab.id);
    button.setAttribute('aria-selected', tab.active ? 'true' : 'false');

    if (tab.active) {
        button.classList.add('active');
    }

    button.innerHTML = `<i class="${tab.iconClass}"></i>${tab.text}`;

    li.appendChild(button);
    ul.appendChild(li);
});
rowDiv.appendChild(ul);






// ************  End of Creation of tabs ***************

//////////////////////////////////////////////
let displayedBooks = 0;
const pageSize = 12;
let allBooksData = [];
let myTabContent = document.getElementById("myTabContent");
let allBooks = document.createElement("DIV");
let container = document.createElement("DIV");
let row = document.createElement("DIV");
const viewMoreButton = document.getElementById("viewmorebtn");
const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");

const AddBookstoDom = (books) => {
    const remainingBooks = books.slice(displayedBooks, displayedBooks + pageSize);

    if (remainingBooks.length === 0) {
        viewMoreButton.disabled = true; // Disable the button when no more books to show
        return;
    }

    remainingBooks.forEach(book => {
        const bookCard = createBookCard(book.id , book.title, book.author, book.description, book.price, book.imgLink, book.bestSeller,book.recentlyAdded);
        row.appendChild(bookCard);
    });

    displayedBooks += remainingBooks.length;
    container.append(row);

    // Disable the button when all books in the current set are displayed
    if (displayedBooks >= books.length) {
        viewMoreButton.disabled = true;
    }
};

const filterBooks = (searchTerm) => {
    displayedBooks = 0; // Reset displayed books when searching
    row.innerHTML = ''; // Clear existing books before adding new filtered books

    const filteredBooks = allBooksData.filter(book =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    AddBookstoDom(filteredBooks);
};

const saveBooksToLocalStorage = (books) => {
    
    localStorage.setItem('booksData', JSON.stringify(books));
};

const getBooksFromLocalStorage = () => {
    const storedBooks = localStorage.getItem('booksData');
    return storedBooks ? JSON.parse(storedBooks) : [];
};

const getBooks = () => {
    const storedBooks = getBooksFromLocalStorage();
        fetch("Data/productData.json")
            .then(res => res.text())
            .then(data => JSON.parse(data))
            .then(data => {
                allBooksData = data.books;
                saveBooksToLocalStorage(allBooksData);
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
function createBookCard(bookId, title, author, description, price, imageSrc, isBestSeller, isRecentlyAdded) {
    var colDiv = document.createElement('div');
    colDiv.classList.add('col-md-3', 'mb-4');

    // Create an anchor for the entire card
    var cardLink = document.createElement('a');
    cardLink.href = 'Productdetails.html?id=' + bookId; // Construct the URL with the book ID
    cardLink.classList.add('card-link'); // You can add a custom class for styling if needed

    var cardDiv = document.createElement('div');
    cardDiv.classList.add('card');

    var imgDiv = document.createElement('div');
    imgDiv.classList.add('custom-card-img');

    var img = document.createElement('img');
    img.src = imageSrc;
    console.log('Image source:', imageSrc); // Log the image source
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

    // Create labels for Best Seller and Recently Added
    var bestSellerLabel = document.createElement('span');
    bestSellerLabel.classList.add('badge', 'badge-success');
    bestSellerLabel.textContent = 'Best Seller';
    bestSellerLabel.style.display = isBestSeller ? 'inline-block' : 'none';

    var recentlyAddedLabel = document.createElement('span');
    recentlyAddedLabel.classList.add('badge', 'badge-info');
    recentlyAddedLabel.textContent = 'Recently Added';
    recentlyAddedLabel.style.display = isRecentlyAdded ? 'inline-block' : 'none';

    var cardPrice = document.createElement('p');
    cardPrice.classList.add('card-text', 'price');
    var formattedPrice = typeof price === 'number' ? '$' + price.toFixed(2) : 'Invalid Price';
    cardPrice.textContent = formattedPrice;
    

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

    cardLink.appendChild(cardDiv); // Wrap the entire cardDiv with the anchor
    colDiv.appendChild(cardLink);

    return colDiv;
}



sectionProducts.appendChild(myTabContent);


// Function to update the displayed books based on the selected tab
const updateDisplayedBooks = (tabId) => {
    displayedBooks = 0;
    row.innerHTML = ''; // Clear existing books before adding new ones
    viewMoreButton.disabled = false; // Enable the "View More" button when updating the tab
    

    if (tabId === 'allBooks') {
        AddBookstoDom(allBooksData);
    } else if (tabId === 'bestSeller') {
        fetchBestSellerBooks();
    } else if (tabId === 'recentlyAdded') {
        fetchRecentlyAddedBooks();
    } else if (tabId === 'category') {
        fetchCategoryBooks();
    }
    
};

// Function to fetch and display best seller books
const fetchBestSellerBooks = () => {
    
    const bestSellerBooks = allBooksData.filter(book => book.bestSeller); 
    console.log(`best seller  data :${bestSellerBooks.length} ,displayed books ${displayedBooks}`)
    AddBookstoDom(bestSellerBooks);
    console.log(`best seller  data :${bestSellerBooks.length} ,displayed books ${displayedBooks}`)
};

// Function to fetch and display recently added books
const fetchRecentlyAddedBooks = () => {

    const recentlyAddedBooks = allBooksData.filter(book => book.recentlyAdded);
    
    AddBookstoDom(recentlyAddedBooks);
    console.log(`all data :${allBooksData.length} ,displayed books ${displayedBooks}`);;
};

// Function to fetch and display category books
const fetchCategoryBooks = () => {
    const categoryData = allBooksData.filter(book => book.category);
    
    AddBookstoDom(categoryData);
    console.log(`category data :${categoryData.length} ,displayed books ${displayedBooks}`);
};

// Add click event listener to the tab buttons
ul.addEventListener('click', (event) => {
    if (event.target.tagName === 'BUTTON') {
        const tabId = event.target.getAttribute('data-target').substring(1); // Extract tab id
        updateDisplayedBooks(tabId);
        
    }
    
});

// Search button click event
searchButton.addEventListener('click', () => {
    const searchTerm = searchInput.value.trim();
    if (searchTerm !== '') {
        filterBooks(searchTerm);
    } else {
        // If search input is empty, update based on the selected tab
        const activeTab = ul.querySelector('.active');
        if (activeTab) {
            const tabId = activeTab.getAttribute('data-target').substring(1);
            updateDisplayedBooks(tabId);
        }
    }
});

// Handle Enter key press in the search input
searchInput.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        const searchTerm = searchInput.value.trim();
        if (searchTerm !== '') {
            filterBooks(searchTerm);
        } else {
            // If search input is empty, update based on the selected tab
            const activeTab = ul.querySelector('.active');
            if (activeTab) {
                const tabId = activeTab.getAttribute('data-target').substring(1);
                updateDisplayedBooks(tabId);
            }
        }
    }
});

//event listener for the taps to reset the view more button 
viewMoreButton.addEventListener('click', () => {
    const activeTab = ul.querySelector('.active');
    if (activeTab) {
        const tabId = activeTab.getAttribute('data-target').substring(1);
        if (tabId === 'allBooks') {
            addBooksToDOM(allBooksData);
        } else if (tabId === 'bestSeller') {
            fetchBestSellerBooks();
        } else if (tabId === 'recentlyAdded') {
            fetchRecentlyAddedBooks();
        } else if (tabId === 'category') {
            fetchCategoryBooks();
        }
    }
});
















