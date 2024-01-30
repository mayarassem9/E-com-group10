import { Item, Order } from "../Data/orderClass.js";
import * as valid from "../order/valid.js";
import data from "../Data/books.json" assert { type: "json" };
import { populateAllData } from "./populateData.js";

$(document).ready(function () {
  //populateAllData();
  var orders = JSON.parse(localStorage.getItem("orders")) || [];

  localStorage.setItem("orders", JSON.stringify(orders));

  valid.notificationUpdate(orders);
  /* poster Section Index.html*/

  var imageContainer = document.querySelector(".image-container");
  var images = Array.from(imageContainer.querySelectorAll(".image"));

  function resetImagesPosition() {
    imageContainer.style.transition = "transform 2s ease";
    imageContainer.style.transform = "translateY(0)";
    // Force reflow to apply the changes immediately
    void imageContainer.offsetWidth;
    imageContainer.style.transition = "transform 2s ease-in-out";
  }

  $("#submitCustomerComplain").click(function () {
    sendComplain();
  });
  setInterval(function () {
    // Apply a transform to move images to the top smoothly
    imageContainer.style.transform = "translateY(-25%)";

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
  var carousel = new bootstrap.Carousel(
    document.getElementById("carouselExampleIndicators"),
    {
      interval: 5000, // Set the interval (in milliseconds) between slide transitions
      wrap: true,
    }
  );

  carousel._element.addEventListener("slide.bs.carousel", function () {
    resetImagesPosition();
  });
});

// myTabContent.appendChild(allBooks);

// container.classList.add("ccontainer", "mt-5");

// allBooks.appendChild(container);
// row.classList.add("row");

// Function to create a book card dynamically
function createBookCard(
  bookId,
  title,
  author,
  description,
  price,
  imageSrc,
  isBestSeller,
  isRecentlyAdded
) {
  var colDiv = document.createElement("div");
  colDiv.classList.add("col-md-3", "mb-4");
  console.log(bookId);

  // Create an anchor for the entire card
  var cardLink = document.createElement("div");
  //cardLink.href = 'Productdetails.html?id=' + bookId; // Construct the URL with the book ID

  cardLink.classList.add("card-link"); // You can add a custom class for styling if needed

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

  // Create labels for Best Seller and Recently Added
  var bestSellerLabel = document.createElement("span");
  bestSellerLabel.classList.add("badge", "badge-success");
  bestSellerLabel.textContent = "Best Seller";
  bestSellerLabel.style.display = isBestSeller ? "inline-block" : "none";

  var recentlyAddedLabel = document.createElement("span");
  recentlyAddedLabel.classList.add("badge", "badge-info");
  recentlyAddedLabel.textContent = "Recently Added";
  recentlyAddedLabel.style.display = isRecentlyAdded ? "inline-block" : "none";

  var cardPrice = document.createElement("p");
  cardPrice.classList.add("card-text", "price");
  var formattedPrice =
    typeof price === "number" ? "$" + price.toFixed(2) : "Invalid Price";
  cardPrice.textContent = formattedPrice;

  var addToCartBtn = document.createElement("button");
  //addToCartBtn.id = 'addBtn';
  //addToCartBtn.classList.add('btn', 'btn-dark');
  addToCartBtn.innerHTML = '<i class="fas fa-shopping-cart"></i> Add to Cart';

  imgDiv.appendChild(img);
  bodyDiv.appendChild(cardTitle);
  bodyDiv.appendChild(cardAuthor);
  bodyDiv.appendChild(cardDescription);
  bodyDiv.appendChild(cardPrice);
  bodyDiv.appendChild(addToCartBtn);
}

// **************************** Cutomer Service Area *****************************
function getCurrentUserFromLocalStorage() {
  let current_user = JSON.parse(localStorage.getItem("currentUser"));
  return current_user;
}

function closeFloatingBtn() {
  document.querySelector(".floating-btn-container").style.display = "none";
}

function sendComplain() {
  let myMessage = $("#complainTextarea").val();
  let messages = loadMessagesFromLocalStorage();
  console.log(messages);
  let current_user = getCurrentUserFromLocalStorage();
  if (!current_user) {
    return;
  }

  let messageID = createNewMessageID(messages);
  let userID = current_user[0].id;
  let userEmail = current_user[0].email;
  let currentDate = new Date();
  let formattedDate = currentDate.toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    timeZoneName: "short",
  });

  if (myMessage !== "") {
    messages.push({
      id: messageID,
      userId: userID,
      userEmail: userEmail,
      message: myMessage,
      isRead: false,
      date: formattedDate,
    });
  }
  console.log(messages);
  saveMessagesToLocalStorage(messages);
  Swal.fire({
    position: "top-end",
    icon: "success",
    title: "Your Message Has been sent",
    showConfirmButton: false,
    timer: 1500,
  });
  $("#dismissCustomerComplain").click();
}
function loadMessagesFromLocalStorage() {
  let myMessages = JSON.parse(localStorage.getItem("customerServiceMessages"));
  return myMessages ? myMessages : [];
}
function saveMessagesToLocalStorage(_customerServiceMessages) {
  let messagesJSON = JSON.stringify(_customerServiceMessages);
  localStorage.setItem("customerServiceMessages", messagesJSON);
}
function createNewMessageID(messages) {
  if (messages.length) {
    return messages[messages.length - 1].id + 1;
  } else {
    return 1;
  }
}

// **************************** End of Cutomer Service Area *****************************
