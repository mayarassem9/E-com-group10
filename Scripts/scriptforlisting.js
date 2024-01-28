import { Item, Order } from "../../Data/orderClass.js";
import * as valid from "../order/valid.js";
import data from "../../Data/books.json" assert { type: "json" };

// The main structure for the details
let sectionProducts = document.querySelector(".sectionContainer");
let myTabContent = document.getElementById("myTabContent");
let allBooks = document.createElement("DIV");
let container = document.createElement("DIV");
let row = document.createElement("DIV");
allBooks.classList.add("tab-pane", "fade", "show", "active");
allBooks.setAttribute("id", "allBooks");
allBooks.setAttribute("role", "tabpanel");
allBooks.setAttribute("aria-labelledby", "allBooks-tab");
myTabContent.appendChild(allBooks);
container.classList.add("ccontainer", "mt-5");
allBooks.appendChild(container);
row.classList.add("row");

//to control the view more button
let displayedBooks = 0;
const pageSize = 12;
let allBooksData = [];

//function to create search and tabs dynamically
function createSearchAndTabs(sectionProducts) {
  // Create row
  const rowDiv = document.createElement("div");
  rowDiv.classList.add("row", "my-3");

  // Create custom div
  const customDiv = document.createElement("div");
  customDiv.classList.add("col-md-6", "offset-md-3");

  // Create form
  const form = document.createElement("form");
  form.classList.add("d-flex");

  // Create input
  const input = document.createElement("input");
  input.classList.add("form-control", "me-2");
  input.setAttribute("type", "search");
  input.setAttribute("id", "searchInput");
  input.setAttribute("placeholder", "Search");
  input.setAttribute("aria-label", "Search");

  // Create search button
  const button = document.createElement("button");
  button.classList.add("btn", "btn-outline-dark");
  button.setAttribute("type", "button");
  button.setAttribute("id", "searchButton");
  button.innerHTML = '<i class="fas fa-search"></i>';

  // Append elements
  form.appendChild(input);
  form.appendChild(button);
  customDiv.appendChild(form);
  rowDiv.appendChild(customDiv);
  sectionProducts.appendChild(rowDiv);

  // Create tabs
  let ul = document.createElement("ul");
  ul.classList.add("nav", "nav-tabs");
  ul.setAttribute("id", "myTab");

  // Create array of tab data
  const tabData = [
    {
      id: "allBooks",
      iconClass: "fas fa-book pe-3",
      text: "All Books",
      active: true,
    },
    {
      id: "bestSeller",
      iconClass: "fas fa-fire pe-3",
      text: "Best Seller",
      active: false,
    },
    {
      id: "recentlyAdded",
      iconClass: "fas fa-clock pe-3",
      text: "Recently Added",
      active: false,
    },
    {
      id: "category",
      iconClass: "fas fa-list pe-3",
      text: "Categories",
      active: false,
    },
  ];

  // Create li elements and append to ul
  tabData.forEach((tab) => {
    const li = document.createElement("li");
    li.classList.add("nav-item");

    const button = document.createElement("button");
    button.classList.add("nav-link");
    button.setAttribute("id", `${tab.id}-tab`);
    button.setAttribute("data-toggle", "tab");
    button.setAttribute("data-target", `#${tab.id}`);
    button.setAttribute("type", "button");
    button.setAttribute("role", "tab");
    button.setAttribute("aria-controls", tab.id);
    button.setAttribute("aria-selected", tab.active ? "true" : "false");

    if (tab.active) {
      button.classList.add("active");
    }

    button.innerHTML = `<i class="${tab.iconClass}"></i>${tab.text}`;

    li.appendChild(button);
    ul.appendChild(li);
    rowDiv.appendChild(ul);
  });

  // Create category collapse
  const categoryCollapse = document.createElement("div");
  categoryCollapse.classList.add("collapse", "mt-3");
  categoryCollapse.setAttribute("id", "categoryCollapse");
  categoryCollapse.style.backgroundColor = "#ffff";
  categoryCollapse.style.display = "flex";
  categoryCollapse.style.flexDirection = "row";
  categoryCollapse.style.alignItems = "center";
  categoryCollapse.style.justifyContent = "space-between";

  // Append to the sectionProducts element
  sectionProducts.appendChild(categoryCollapse);
}

// Usage
createSearchAndTabs(sectionProducts);

// Function to create category buttons in the collapse
function createCategoryButtons(categories) {
  const categoryCollapse = document.getElementById("categoryCollapse");
  categoryCollapse.innerHTML = ""; // Clear existing buttons

  const uniqueCategories = getUniqueCategories(); //for unique categories

  uniqueCategories.forEach((category) => {
    const button = document.createElement("button");
    button.classList.add("btn", "btn-dark", "category-btn", "me-3");
    button.textContent = category;

    button.addEventListener("click", () => filterBooksByCategory(category));

    categoryCollapse.appendChild(button);
  });
}

// Function to add books to the dom
const viewMoreButton = document.getElementById("viewmorebtn");
const addBooksToDOM = (books) => {
  const remainingBooks = books
    .filter((book) => book.stockNum > 0)
    .slice(displayedBooks, displayedBooks + pageSize);
  if (remainingBooks.length === 0) {
    viewMoreButton.disabled = true; // Disable the button when no more books to show
    return;
  }
  remainingBooks.forEach((book) => {
    const bookCard = createBookCard(
      book.ID,
      book.title,
      book.author,
      book.description,
      book.price,
      book.imgLink,
      book.bestSeller,
      book.recentlyAdded,
      book.stockNum
    );
    row.appendChild(bookCard);
  });
  displayedBooks += remainingBooks.length;
  container.append(row);
  // Disable the button when all books in the current set are displayed
  if (displayedBooks >= books.length) {
    viewMoreButton.disabled = true;
  }
};

// Function to filter for the search
const filterBooks = (searchTerm) => {
  displayedBooks = 0; // Reset displayed books when searching
  row.innerHTML = ""; // Clear existing books before adding new filtered books

  const filteredBooks = allBooksData.filter(
    (book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  addBooksToDOM(filteredBooks);
};

// Function to save books to local storage
const saveBooksToLocalStorage = (books) => {
  localStorage.setItem("mybooks", JSON.stringify(books));
};

// Function to get books from local storage
const getBooksFromLocalStorage = () => {
  const storedBooks = localStorage.getItem("mybooks");
  return storedBooks ? JSON.parse(storedBooks) : [];
};

// Function to get the books
const getBooks = () => {
  const storedBooks = getBooksFromLocalStorage();
  fetch("Data/productData.json")
    .then((res) => res.text())
    .then((data) => JSON.parse(data))
    .then((data) => {
      allBooksData = data.books;
      saveBooksToLocalStorage(allBooksData);
      addBooksToDOM(allBooksData);
    })
    .catch((err) => console.log(err));
};

// Function to create a book card dynamically
function createBookCard(
  bookId,
  title,
  author,
  description,
  price,
  imageSrc,
  isBestSeller,
  isRecentlyAdded,
  stockNum
) {
  var colDiv = document.createElement("div");
  colDiv.classList.add("col-md-3", "mb-4");
  colDiv.setAttribute("id", "theCard");

  var cardDiv = document.createElement("div");
  cardDiv.classList.add("card");

  var imgDiv = document.createElement("div");
  imgDiv.classList.add("custom-card-img");

  var img = document.createElement("img");
  img.src = imageSrc;
  console.log("Image source:", imageSrc); // Log the image source
  img.classList.add("card-img-top", "img-fluid");
  img.alt = title + " Image";

  img.addEventListener("click", function () {
    goToProductDetails(bookId);
  });

  var bodyDiv = document.createElement("div");
  bodyDiv.classList.add("card-body");

  var cardTitle = document.createElement("h5");
  cardTitle.classList.add("card-title");
  cardTitle.textContent = title;

  var cardAuthor = document.createElement("p");
  cardAuthor.classList.add("card-author");
  cardAuthor.textContent = "Author: " + author;

  var cardDescription = document.createElement("p");
  cardDescription.classList.add("card-text");
  cardDescription.textContent = description;

  var cardPrice = document.createElement("p");
  cardPrice.classList.add("card-text", "price");
  var formattedPrice =
    typeof price === "number" ? "$" + price.toFixed(2) : "Invalid Price";
  cardPrice.textContent = formattedPrice;

  // asmaa
  var addToCartBtn = document.createElement("button");
  //addToCartBtn.id = 'addBtn';
  addToCartBtn.classList.add("btn", "btn-dark");
  addToCartBtn.innerHTML = '<i class="fas fa-shopping-cart"></i> Add to Cart';

    addToCartBtn.addEventListener("click", function () {

      var currentUser = JSON.parse(localStorage.getItem("currentUser")) ;
      if(currentUser){
  
        valid.addToCart(Item, Order, data, bookId);
        var orders = JSON.parse(localStorage.getItem("orders")) || [];
        localStorage.setItem("orders", JSON.stringify(orders));
        valid.notificationUpdate(orders);
      }
      else{
        Swal.fire("You Need To Login First !");
      }
  
      
    });

  
     /////==============================nada wish list================================// 
     var wishlistbutton = document.createElement("button");
     //addToCartBtn.id = 'addBtn';
     wishlistbutton.classList.add("btn", "btn-dark");
     wishlistbutton.innerHTML = '<i class="fa-solid fa-heart"></i> Wish List';
     wishlistbutton.addEventListener("click", function () {
       // id /bookid / book title /img /price
       //check == bookid no add
      //localStorage.setItem("wishlist")   
       addwish(bookId,title,imageSrc,price);

     });
     //===============end wish list===========================//
  

  imgDiv.appendChild(img);
  bodyDiv.appendChild(cardTitle);
  bodyDiv.appendChild(cardAuthor);
  bodyDiv.appendChild(cardDescription);
  bodyDiv.appendChild(cardPrice);
  bodyDiv.appendChild(addToCartBtn);
  bodyDiv.appendChild(wishlistbutton); /// wish list button --nada


  cardDiv.appendChild(imgDiv);
  cardDiv.appendChild(bodyDiv);

  colDiv.appendChild(cardDiv);

  return colDiv;
}
sectionProducts.appendChild(myTabContent);

// Function to go to product details
function goToProductDetails(bookId) {
  window.location.href = "Productdetails.html?id=" + bookId;
}

// Function to remove any existing category heading from a container element
function removeExistingCategoryHeading(container) {
  const existingCategoryHeading = container.querySelector("h3");
  if (existingCategoryHeading) {
    existingCategoryHeading.remove();
  }
}

// Function to update the displayed books based on the selected tab
const updateDisplayedBooks = (tabId) => {
  removeExistingCategoryHeading(container);
  displayedBooks = 0;
  row.innerHTML = ""; // Clear existing books before adding new ones
  viewMoreButton.disabled = false; // Enable the "View More" button when updating the tab

  if (tabId === "allBooks") {
    addBooksToDOM(allBooksData);
  } else if (tabId === "bestSeller") {
    fetchBestSellerBooks();
  } else if (tabId === "recentlyAdded") {
    fetchRecentlyAddedBooks();
  } else if (tabId === "category") {
    fetchCategoryBooks();
  }
};

// Function to filter books by category
function filterBooksByCategory(category) {
  removeExistingCategoryHeading(container);

  // Create a heading element to display the category name
  const categoryHeading = document.createElement("h3");
  categoryHeading.textContent = category;
  categoryHeading.classList.add("category-heading"); // Add the category-heading class

  // Append the category heading before displaying the books
  container.insertBefore(categoryHeading, row);

  // Clear existing books before adding new ones
  displayedBooks = 0;
  row.innerHTML = "";

  // Filter books by the selected category
  const filteredBooks = allBooksData.filter(
    (book) => book.category === category
  );

  // Add filtered books to the DOM
  addBooksToDOM(filteredBooks);
}

// Function to fetch and display category books
const fetchCategoryBooks = () => {
  const categories = getUniqueCategories();
  createCategoryButtons(categories);
  viewMoreButton.disabled = true; // Disable the button initially when fetching category books
  createCategoryButtons(categories);
};

// Function to get unique categories from the book data
function getUniqueCategories() {
  const categories = [];
  allBooksData.forEach((book) => {
    if (book.category && !categories.includes(book.category)) {
      categories.push(book.category);
    }
  });
  return categories;
}

// Call fetchCategoryBooks initially to populate the category collapse
fetchCategoryBooks();

// Function to fetch and display best seller books
const fetchBestSellerBooks = () => {
  const bestSellerBooks = allBooksData.filter((book) => book.bestSeller);
  addBooksToDOM(bestSellerBooks);
};

// Function to fetch and display recently added books
const fetchRecentlyAddedBooks = () => {
  const recentlyAddedBooks = allBooksData.filter((book) => book.recentlyAdded);
  addBooksToDOM(recentlyAddedBooks);
};

// Function to remove out-of-stock items after 5 minutes
const removeOutOfStockItems = () => {
  const currentTime = new Date().getTime();
  const updatedBooksData = allBooksData.filter((book) => {
    if (book.stockNum === 0 && currentTime - book.outOfStockTime >= 60 * 1000) {
      return false; // Exclude out-of-stock items older than 5 minutes
    }
    return true;
  });
  if (updatedBooksData.length !== allBooksData.length) {
    allBooksData = updatedBooksData;
    saveBooksToLocalStorage(allBooksData);
    const activeTab = ul.querySelector(".active");
    if (activeTab) {
      const tabId = activeTab.getAttribute("data-target").substring(1);
      updateDisplayedBooks(tabId);
    }
  }
};

// Function to add new books to replace out-of-stock ones
const addNewBooks = () => {
  const outOfStockBooks = allBooksData.filter((book) => book.stockNum === 0);
  if (outOfStockBooks.length > 0) {
    const newBooks = []; // Fetch or generate new books to replace out-of-stock ones
    allBooksData = allBooksData.filter((book) => book.stockNum !== 0); // Remove out-of-stock books
    allBooksData.push(...newBooks); // Add new books
    saveBooksToLocalStorage(allBooksData);
    const activeTab = ul.querySelector(".active");
    if (activeTab) {
      const tabId = activeTab.getAttribute("data-target").substring(1);
      updateDisplayedBooks(tabId);
    }
  }
};

// Add click event listener to the tab buttons
document.addEventListener("click", (event) => {
  const clickedElement = event.target;

  // Check if the clicked element is not a tab button
  if (clickedElement.tagName !== "BUTTON" || !clickedElement.closest("ul")) {
    const categoryCollapse = document.getElementById("categoryCollapse");
    categoryCollapse.classList.remove("show");
  }
});

let myUL = document.getElementById("myTab");
myUL.addEventListener("click", (event) => {
  if (event.target.tagName === "BUTTON") {
    const tabId = event.target.getAttribute("data-target").substring(1); // Extract tab id
    updateDisplayedBooks(tabId);

    // Hide the category collapse when switching to another tab
    const categoryCollapse = document.getElementById("categoryCollapse");
    if (tabId === "category") {
      // Show the category collapse if the "Categories" tab is clicked
      categoryCollapse.classList.add("show");
    } else {
      // Hide the category collapse if any other tab is clicked
      categoryCollapse.classList.remove("show");
    }
  }
});

// Search button click event
const searchButton = document.getElementById("searchButton");
searchButton.addEventListener("click", () => {
  removeExistingCategoryHeading(container);
  const searchTerm = searchInput.value.trim();
  if (searchTerm !== "") {
    filterBooks(searchTerm);
  }
});

// Handle Enter key press in the search input
const searchInput = document.getElementById("searchInput");
searchInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    // Prevent the default form submission behavior
    event.preventDefault();
    //to remove header if he goes from categories to search
    removeExistingCategoryHeading(container);

    const searchTerm = searchInput.value.trim();
    if (searchTerm !== "") {
      filterBooks(searchTerm);
    }
  }
});

// Call addNewBooks initially to replace any initial out-of-stock items
addNewBooks();

viewMoreButton.addEventListener("click", getBooks);
document.addEventListener("DOMContentLoaded", getBooks);

var addToCartBtn = document.createElement("button");
//addToCartBtn.id = 'addBtn';
//addToCartBtn.classList.add('btn', 'btn-dark');
addToCartBtn.innerHTML = '<i class="fas fa-shopping-cart"></i> Add to Cart';
addToCartBtn.addEventListener("click", function () {
  valid.addToCart(Item, Order, data, bookId);

  var orders = JSON.parse(localStorage.getItem("orders")) || [];

  localStorage.setItem("orders", JSON.stringify(orders));

  valid.notificationUpdate(orders);
});


function addwish(bookId, title, img, price) {
  let wishlist = localStorage.getItem("wishlist");
  let current = localStorage.getItem("currentUser");
  current = current ? JSON.parse(current) : false;
  let isuser = false;

  if (current) {
    // FOR handle if I logged out and no current user
    isuser = current.some((current) => current.role === "customer");
  }

  wishlist = wishlist ? JSON.parse(wishlist) : [];
  let newid = 1;
  let found = false;

  if (!isuser) {
    // for handle if I didn't log in or sign up and if I came from seller to see home
    Swal.fire({
      title: "Please Login or SignUP First",
      showClass: {
        popup: `
          animate__animated
          animate__fadeInUp
          animate__faster
        `,
      },
      hideClass: {
        popup: `
          animate__animated
          animate__fadeOutDown
          animate__faster
        `,
      },
    });
  } else {
    let userid = current[0].id;

    if (wishlist.length !== 0) {
      newid = wishlist[wishlist.length - 1].Id + 1;
    }

    wishlist.forEach((item, index) => {
      if (item.bookid === bookId && item.Userid === userid) {
        wishlist.splice(index, 1);
        found = true;
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Removed Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });

    if (!found) {
      let newwish = {
        Id: newid,
        Userid: userid,
        bookid: bookId,
        title: title,
        img: img,
        price: price,
      };
      wishlist.push(newwish);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Added Successfully",
        showConfirmButton: false,
        timer: 1500,
      });
    }

    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }
}