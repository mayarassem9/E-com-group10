import {
  isCurrentCustomerAuthenticated,
  getCurrentUser,
} from "../Scripts/validateCredentials.js";

// *********************Sample Data**********************
const sampleCartData = [
  {
    orderId: 1,
    userId: 1,
    status: "pending",
    total: 1260,
    items: [
      {
        ID: 1,
        name: "Tale of Two Cities",
        price: 135,
        quantity: 2,
        sellerId: 1,
        imgLink: "Resources/Images/books/TaleofTwoCities.jpg",
      },
      {
        ID: 2,
        name: "The final Gambit",
        price: 125,
        quantity: 4,
        sellerId: 5,
        imgLink: "Resources/Images/books/TheFinalGambit.jpg",
      },
      {
        ID: 3,
        name: "Abu Alhoul",
        price: 115,
        quantity: 3,
        sellerId: 6,
        imgLink: "Resources/Images/books/abuAlhoulBook.jpg",
      },
    ],
  },
];
const discounts = [
  {
    promocode: "SALE2024",
    discountPercentage: 15,
  },
  {
    promocode: "SALE2023",
    discountPercentage: 10,
  },
];

// *********************My CLasses**********************
class Order {
  constructor(orderId, userId, status, total, items, date) {
    this.orderId = orderId;
    this.userId = userId;
    this.status = status;
    this.total = total;
    this.items = items;
    this.date = date;
  }
}
class OrderItem {
  constructor(ID, name, price, quantity, sellerId, imgLink) {
    this.ID = ID;
    this.name = name;
    this.price = price;
    this.quantity = quantity;
    this.sellerId = sellerId;
    this.imgLink = imgLink;
  }
}
// *********************Global Variables**********************
let myCart;
let myPromoCodePercentage;
let currentOrder;
let PurchaseError = "";
let _total = 0;
$("document").ready(function () {
  // check if the user is authenticated and authorized as a customer
  if (isCurrentCustomerAuthenticated()) {
    //***************Loading Page************************
    //myCart = sampleCartData;
    //localStorage.setItem('orders',JSON.stringify(myCart));
    myCart = getCartFromLocalStorage();
    displayCartToDOM(myCart);
    loadAddressToDOM();
    //***************end of Loading Page************************

    //***************Event Listeners************************
    $(".needs-validation").on("input", "input", function (event) {
      const target = $(event.target);

      // Example: Custom validation for email format
      if (target.attr("type") === "email") {
        if (!validateEmail(target.val())) {
          target[0].setCustomValidity("Please enter a valid email address.");
        } else {
          target[0].setCustomValidity("");
        }
      }
    });
    $("#discount-redeem").click(function () {
      redeemDiscount();
      displayCartToDOM(myCart);
    });

    $("#confirm_payment").click(function (event) {
      event.preventDefault();
      event.stopPropagation();
      if (validateForm()) {
        //***************Confirm the payment***********************
        if ($("#save-info").is(":checked")) {
          saveBillingAddress();
        }
        let myOrder = createNewOrder(myCart);

        if (myOrder) {
          currentOrder = myOrder;
          saveOrderToLocalStorage(currentOrder);
          let books = getBooksFromLocalStorage();

          if (updateProductStock(books, currentOrder)) {
            Swal.fire({
              icon: "success",
              title: "Checkout",
              text: "Your Order Has been Successfully Completed",
              footer: '<a href="../index.html">Go back To the Home Page?</a>',
            });
            // remove the order
            localStorage.removeItem("orders");
            myCart = null;
            $("#total-price").text("");
            $("#promoCodeInput").val("");
            $("#total-Items").text("0");

            displayCartToDOM(myCart);
          } else {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: `${PurchaseError}`,
            });
          }
        }
      }
    });
    //***************end ofEvent Listeners************************
  } else {
    window.location.href = "../login.html";
  }
});
function getBooksFromLocalStorage() {
  let books = localStorage.getItem("books");
  if (books) {
    return JSON.parse(books);
  }
  return [];
}

function createNewOrder(myCart) {
  if (myCart && myCart != {}) {
    let newOrderID = createNewOrderId();
    let orderDate = new Date();
    let _tot = computeDiscountTotal(myCart[0]);

    let newOrder = new Order(
      newOrderID,
      getCurrentUser().id,
      "pending",
      myCart[0].total,
      myCart[0].items,
      orderDate
    );
    console.log(newOrder);

    return newOrder;
  }
}
function createNewOrderId() {
  let myOrder = getOrdersFromLocalStorage();
  if (myOrder.length > 0) {
    return myOrder[myOrder.length - 1].orderId + 1;
  } else {
    return 1;
  }
}
function getOrdersFromLocalStorage() {
  let orders = localStorage.getItem("allOrders");
  if (orders) {
    return JSON.parse(orders);
  }
  return [];
}

function redeemDiscount() {
  const promoCodeInput = document.getElementById("promoCodeInput");
  const discountItemsContainer = document.getElementById("discount-items");
  discountItemsContainer.innerHTML = "";
  const enteredPromoCode = promoCodeInput.value;

  const matchingDiscount = discounts.find(
    (discount) => discount.promocode === enteredPromoCode
  );

  if (matchingDiscount) {
    const discountDiv = document.createElement("div");
    discountDiv.className =
      "list-group-item d-flex my-3 justify-content-between";
    discountDiv.innerHTML = `<span >${matchingDiscount.promocode}</span><span>${matchingDiscount.discountPercentage}% off</span>`;

    discountItemsContainer.appendChild(discountDiv);
    myPromoCodePercentage = matchingDiscount.discountPercentage;
    promoCodeInput.value = "";
  } else {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Invalid promo code. Please try again.",
    });
  }
}
// function updateProductStock(books, order) {
//   if (!order || !order.items) {
//     PurchaseError = "Invalid order data. Unable to update product stock";
//     return false;
//   }
//   const soldItems = order.items;
//   console.log(order);
//   soldItems.forEach((soldItem) => {
//     const bookToUpdate = books.find((book) => book.ID === soldItem.ID);
//     debugger;
//     if (bookToUpdate) {
//       console.log(bookToUpdate.stockNum, soldItems.quantity);
//       if (bookToUpdate.stockNum >= soldItem.quantity) {
//         let sNum = bookToUpdate.stockNum;
//         bookToUpdate.stockNum = sNum - soldItem.quantity;
//       } else {
//         PurchaseError = `Product  ${soldItem.name} is out of stock`;
//         return false;
//       }
//     } else {
//       console.warn(`Book with ID ${soldItem.ID} not found.`);
//     }
//   });
//   updateBooksToLocalStorage(books);
//   return true;
// }
function updateProductStock(books, order) {
  let PurchaseError;

  if (!order || !order.items) {
    PurchaseError = "Invalid order data. Unable to update product stock";
    return false;
  }

  const soldItems = order.items;
  debugger;
  soldItems.forEach((soldItem) => {
    const bookToUpdateIndex = books.findIndex(
      (book) => book.ID === soldItem.bookId
    );

    if (bookToUpdateIndex !== -1) {
      const bookToUpdate = books[bookToUpdateIndex];

      if (bookToUpdate.stockNum >= soldItem.quantity) {
        books[bookToUpdateIndex].stockNum -= soldItem.quantity;
      } else {
        PurchaseError = `Product ${soldItem.name} is out of stock`;
        return false;
      }
    } else {
      console.warn(`Book with ID ${soldItem.ID} not found.`);
      return false;
    }
  });

  updateBooksToLocalStorage(books);

  return true;
}

function updateBooksToLocalStorage(books) {
  if (books) localStorage.setItem("books", JSON.stringify(books));
}

function saveBillingAddress() {
  const firstName = $("#firstName").val();
  const lastName = $("#lastName").val();
  const username = $("#username").val();
  const email = $("#email").val();
  const address = $("#address").val();
  const address2 = $("#address2").val();
  const country = $("#country").val();
  const state = $("#state").val();
  const zip = $("#zip").val();

  // Create a userAddress object
  const userAddress = {
    userID: getCurrentUser().id,
    firstName: firstName,
    lastName: lastName,
    username: username,
    email: email,
    address: address,
    address2: address2,
    country: country,
    state: state,
    zip: zip,
  };

  saveAddressToLocalStorage(userAddress);
}

function saveAddressToLocalStorage(userAddress) {
  let addresses = getAddressesFromLocalStorage();
  addresses.push(userAddress);
  localStorage.setItem("userAddress", JSON.stringify(addresses));
}

function getAddressesFromLocalStorage() {
  let addresses = localStorage.getItem("userAddress");
  if (addresses) {
    return JSON.parse(addresses);
  }
  return [];
}
function loadAddressToDOM() {
  const savedAddresses = getAddressesFromLocalStorage();

  // Assuming you have only one address for simplicity; modify as needed if there are multiple addresses
  if (savedAddresses.length > 0) {
    const lastSavedAddress = savedAddresses.find(
      (address) => address.userID === getCurrentUser().id
    );
    if (lastSavedAddress) {
      // Populate form fields with the saved address
      $("#firstName").val(lastSavedAddress.firstName);
      $("#lastName").val(lastSavedAddress.lastName);
      $("#username").val(lastSavedAddress.username);
      $("#email").val(lastSavedAddress.email);
      $("#address").val(lastSavedAddress.address);
      $("#address2").val(lastSavedAddress.address2);
      $("#country").val(lastSavedAddress.country);
      $("#state").val(lastSavedAddress.state);
      $("#zip").val(lastSavedAddress.zip);
    }
  }
}

function getCartFromLocalStorage() {
  let cart = localStorage.getItem("orders");

  if (cart) {
    let _cart = JSON.parse(cart);
    // console.log(_cart);
    // const userCart = _cart.find(
    //   (myCart) => myCart.userId === getCurrentUser().id
    // );
    return _cart;
  }
  return null;
}
function saveOrderToLocalStorage(order) {
  let orders = getOrdersFromLocalStorage();
  orders.push(order);
  localStorage.setItem("allOrders", JSON.stringify(orders));
}

function displayCartToDOM(_cart) {
  if (_cart && _cart[0]) {
    //computing the total
    let cart = _cart[0];
    if (cart.items.length > 0) {
      let totalItems = cart.items.length;
      $("#total-Items").text(totalItems);

      let listContainer = document.getElementById("list-container");
      listContainer.innerHTML = ``;
      let i = 0;
      cart.items.forEach((item) => {
        const listItem = document.createElement("li");
        listItem.className = "list-group-item d-flex justify-content-between";

        const div = document.createElement("div");
        const itemName = document.createElement("h6");
        itemName.className = "my-0";
        itemName.textContent = item.name;

        const itemDescription = document.createElement("small");
        itemDescription.className = "badge rounded-pill bg-secondary";
        itemDescription.textContent = `Quantity: ${item.quantity}`;

        div.appendChild(itemName);
        div.appendChild(itemDescription);

        const itemPrice = document.createElement("span");
        itemPrice.className = "text-dark";
        itemPrice.textContent = `$${item.price * item.quantity}`;

        listItem.appendChild(div);
        listItem.appendChild(itemPrice);

        if (i % 2 == 1) {
          listItem.classList.add("bg-light");
          itemPrice.classList.add("text-success");
          div.classList.add("text-success");
        }

        listContainer.appendChild(listItem);
        i++;
      });
      $("#total-price").text(`$${computeDiscountTotal(cart)}`);
    } else {
      const emptyDiv = document.createElement("div");
      emptyDiv.textContent = "No items available.";
      emptyDiv.style.color = "gray";
      listContainer.appendChild(emptyDiv);
    }
  } else {
    let listContainer = document.getElementById("list-container");
    listContainer.innerHTML = ``;

    const errorMessage = document.createElement("div");
    const listItem = document.createElement("li");
    listItem.className = "list-group-item d-flex justify-content-between";
    listItem.textContent = "No items listed.";
    listItem.classList.add("text-danger");
    errorMessage.appendChild(listItem);

    listContainer.appendChild(errorMessage);
  }
}

/*[
    {
        "ID": 1,
        "sellerId": 1,
        "name": "Tale of Two Cities",
        "price": 135,
        "quantity": 1,
        "imgLink": "Resources/Images/books/TaleofTwoCities.jpg"
    },
    {
        "ID": 2,
        "sellerId": 1,
        "name": "Men From Mars And Women From Venus",
        "price": 222,
        "quantity": 1,
        "imgLink": "Resources/Images/books/MenFromMarsAndWomenFromVenus.jpg"
    }
] */
function computeDiscountTotal(cart) {
  _total = computedCurrentTotal(cart);
  if (myPromoCodePercentage) {
    let final = _total - _total * (myPromoCodePercentage / 100);
    myCart.total = final;
    return final;
  } else {
    return _total;
  }
}
function computedCurrentTotal(cart) {
  let myTotal = 0;

  if (cart) {
    cart.items.forEach((item) => {
      let mul = item.quantity * item.price;
      myTotal += mul;
    });
    return myTotal;
  } else {
    return 0;
  }
}
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validateForm() {
  const form = $(".needs-validation")[0];

  if (!form.checkValidity()) {
    form.classList.add("was-validated");
    return false;
  }

  // Additional custom validation
  const emailInput = $("#email");
  if (emailInput.length && !validateEmail(emailInput.val())) {
    emailInput[0].setCustomValidity("Please enter a valid email address.");
    return false;
  }

  return true;
}
