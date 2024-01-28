
let row = document.createElement("DIV");
let allBooks = document.createElement("DIV");  
let sectionProducts = document.querySelector(".sectionContainer");
let myTabContent = document.getElementById("myTabContent");
let wishlistArray = localStorage.getItem("wishlist");
let current = localStorage.getItem("currentUser");
current = current ? JSON.parse(current) : [];
wishlistArray = wishlistArray ? JSON.parse(wishlistArray) : [];

const addBooksToDOM = (wishlist) => {
    if (!document.querySelector(".sectionContainer .row")) {
      let rowDiv = document.createElement("div");
      rowDiv.classList.add("row");
      sectionProducts.appendChild(rowDiv); // Append the row to the section container
  }
  wishlistArray.forEach((wishlistItem) => {
    if (wishlistItem.Userid === current[0].id) {
      const bookCard = createBookCard(
        wishlistItem.Id,
        wishlistItem.title,
        wishlistItem.price,
        wishlistItem.img,
      );
      document.querySelector(".sectionContainer .row").appendChild(bookCard);
    }
  });
}

document.addEventListener("DOMContentLoaded",addBooksToDOM  )


function createBookCard(
    bookId,
    title,
    price,
    imageSrc
  
  ) {
    
    var colDiv = document.createElement("div");
    colDiv.classList.add("col-md-3", "mb-4");
    colDiv.setAttribute("id", "theCard");
    
    
  
    var cardDiv = document.createElement("div");
    cardDiv.classList.add("card");
    
  
    var imgDiv = document.createElement("div");
    imgDiv.classList.add("custom-card-img");
    imgDiv.style.display = 'flex';       // Set display to flex to use flexbox properties
    imgDiv.style.justifyContent = 'center'; // Center the content horizontally
    imgDiv.style.alignItems = 'center';     // Center the content vertically
    imgDiv.style.height = '60%';

  
    var img = document.createElement("img");
    img.src = imageSrc;
    console.log("Image source:", imageSrc); // Log the image source
    img.classList.add("card-img-top", "img-fluid");
    img.alt = title + " Image";
    img.style.width='50%' 
    img.style.height='50%'
  
    img.addEventListener("click", function () {
      goToProductDetails(bookId);
    });
  
    var bodyDiv = document.createElement("div");
    bodyDiv.classList.add("card-body");
  
    var cardTitle = document.createElement("h5");
    cardTitle.classList.add("card-title");
    cardTitle.textContent = title;
  
  
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
      valid.addToCart(Item, Order, data, bookId);
      var orders = JSON.parse(localStorage.getItem("orders")) || [];
      localStorage.setItem("orders", JSON.stringify(orders));
      valid.notificationUpdate(orders);
    });
    /////==============================nada wish list================================// 
    var wishlistbutton = document.createElement("button");
    //addToCartBtn.id = 'addBtn';
    wishlistbutton.classList.add("btn", "btn-dark");
    wishlistbutton.innerHTML = '<i class="fa-solid fa-heart"></i> Wish List';
    wishlistbutton.addEventListener("click", function () {
    
      
      addwish(bookId,title,imageSrc,price);
     
  
      
    });
    //===============end wish list===========================//
  
    imgDiv.appendChild(img);
    bodyDiv.appendChild(cardTitle);
    bodyDiv.appendChild(cardPrice);
    // bodyDiv.appendChild(addToCartBtn);
  
    // bodyDiv.appendChild(wishlistbutton); /// wish list button --nada
  
    cardDiv.appendChild(imgDiv);
    cardDiv.appendChild(bodyDiv);
  
    colDiv.appendChild(cardDiv);
  
    return colDiv;
  }

