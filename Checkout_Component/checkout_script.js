import { isCurrentCustomerAuthenticated, getCurrentUser} from "../Scripts/validateCredentials.js";


const sampleCartData = {
  userId: 1,
  items: [
      {
          ID: 1,
          title: "Abu Alhoul",
          author: "Ahmed Mourad",
          description: "Mourads novel details the life of photographer and crime expert Sulaiman ElSeyofy known for investigating a mysterious century crime during the Egyptian plague",
          price: 115,
          category: "Fiction",
          salerID: "11",
          imgLink: "Resources/Images/books/abuAlhoulBook.jpg",
          stockNum: 10
      },
      {
        ID: 1,
        title: "Abu Alhoul",
        author: "Ahmed Mourad",
        description: "Mourads novel details the life of photographer and crime expert Sulaiman ElSeyofy known for investigating a mysterious century crime during the Egyptian plague",
        price: 115,
        category: "Fiction",
        salerID: "11",
        imgLink: "Resources/Images/books/abuAlhoulBook.jpg",
        stockNum: 10
    },
    
  ],
  total: 21.98 
};
const sampleOrderData = {
  orderId: 1,
  userId: 1,
  items: [
      {
          ID: 1,
          title: "Abu Alhoul",
          author: "Ahmed Mourad",
          description: "Mourad's novel details the life of photographer and crime expert Sulaiman ElSeyofy known for investigating a mysterious century crime during the Egyptian plague",
          price: 115,
          category: "Fiction",
          salerID: "11",
          imgLink: "Resources/Images/books/abuAlhoulBook.jpg",
          stockNum: 10
      },
      {
          ID: 2,
          title: "Abu",
          author: "Ahmed Mourad",
          description: "Mourad's novel details the life of photographer and crime expert Sulaiman ElSeyofy known for investigating a mysterious century crime during the Egyptian plague",
          price: 115,
          category: "Fiction",
          salerID: "11",
          imgLink: "Resources/Images/books/abuAlhoulBook.jpg",
          stockNum: 10
      }
  ],
  total: 21.98,
  date: '24/1/2024',
  promoCode:"hamada",
  promoCodeDiscount:20
};

console.log(sampleOrderData);



class ShoppingCart {
  constructor(userId, books) {
      this.userId = userId;
      this.books = books;
  }
}

class Order {
  constructor(orderId, userId, cart,date) {
      this.orderId = orderId;
      this.userId = userId;
      this.cart = cart;
      this.date= date;
  }
}
let myCart =new ShoppingCart();




$('document').ready(function () {
  // check if the user is authenticated and authorized as a customer
 
    if (isCurrentCustomerAuthenticated()) {
      console.log("authenticated");
      myCart = sampleCartData;
      //myCart = getCartFromLocalStorage();
  
   
        let myOrder = new Order(1, getCurrentUser().id, sampleCartData, '1/10/2020');
        console.log(myOrder);
  
        displayCartToDOM(myCart);

        $('#confirm_payment').click(function () {
          if (validateBillingAddress()) {
            // Confirm payment
            confirmPayment();
    
            // Save the order to local storage
            saveOrderToLocalStorage(myOrder);
          } else {
            alert('Please provide a valid billing address.');
          }
        });
    } else {
      window.location.href = "../login.html";
    }

   
  // get the cart object and check if not empty
  
  // copy the cart into the orders object

  // view the order information  on the DOM
  // when the confirm is clicked then 
  //1.  decrement the user balance
  //2. decrement the sold product from the stock
});

function getCartFromLocalStorage() {
  let cart = localStorage.getItem('cart');
  if(cart){
    let _cart = JSON.parse(cart);
    return _cart;
  }
  return [];
}
function saveOrderToLocalStorage(order) {
  let orders = getOrdersFromLocalStorage();
  orders.push(order);
  localStorage.setItem('orders', JSON.stringify(orders));
}

function getOrdersFromLocalStorage() {
  let orders = localStorage.getItem('orders');
  if (orders) {
    return JSON.parse(orders);
  }
  return [];
}
function createNewOrderId() {
  let myOrder = getOrdersFromLocalStorage();
  if(myOrder){
    return myOrder[myOrder.length-1].orderId+1;
  }
  else{
    return 1;
  }
}
function displayCartToDOM(cart) {
  //computing the total 
  console.log(cart);
  if(cart.items.length>0){
      let totalItems = cart.items.length;
      $('#total-Items').text(totalItems);

      let listContainer = document.getElementById('list-container');

      let i =0;
      cart.items.forEach(item => {
        const listItem = document.createElement("li");
          listItem.className = "list-group-item d-flex justify-content-between";

          const div = document.createElement("div");
          const itemName = document.createElement("h6");
          itemName.className = "my-0";
          itemName.textContent = item.title;

          const itemDescription = document.createElement("small");
          itemDescription.className = "text-muted";
          itemDescription.textContent = item.author;

          div.appendChild(itemName);
          div.appendChild(itemDescription);

          const itemPrice = document.createElement("span");
          itemPrice.className = "text-dark";
          itemPrice.textContent = `$${item.price}`;

          listItem.appendChild(div);
          listItem.appendChild(itemPrice);

          if (i%2==1) {
            listItem.classList.add("bg-light");
            itemPrice.classList.add("text-success");
            div.classList.add("text-success");
          }

          listContainer.appendChild(listItem);
          i++;
      });
      $('#total-price').text(`$${cart.total}`);
  }
  else{
    const emptyDiv = document.createElement("div");
    emptyDiv.textContent = "No items available.";
    emptyDiv.style.color = "gray"; 
    listContainer.appendChild(emptyDiv);

  }
}

function validateBillingAddress() {
  // Get values from input fields
  console.log("ggg");
  debugger;
  var firstName = document.getElementById('firstName').value;
  var lastName = document.getElementById('lastName').value;
  var username = document.getElementById('username').value;
  var email = document.getElementById('email').value;
  var address = document.getElementById('address').value;
  var country = document.getElementById('country').value;
  var state = document.getElementById('state').value;
  var zip = document.getElementById('zip').value;

  // Validation messages
  var validationMessages = {
    firstName: 'Valid first name is required.',
    lastName: 'Valid last name is required.',
    username: 'Your username is required.',
    email: 'Please enter a valid email address for shipping updates.',
    address: 'Please enter your shipping address.',
    country: 'Please select a valid country.',
    state: 'Please provide a valid state.',
    zip: 'Zip code required.'
  };

  // Iterate through fields and validate
  var isValid = true;
  for (var field in validationMessages) {
    var value = eval(field); // Get the value dynamically
    var tooltip = document.getElementById(field + 'Tooltip');

    if (!value) {
      isValid = false;
      showTooltip(field, validationMessages[field]);
    } else {
      hideTooltip(field);
    }
  }

  return isValid;
}

function showTooltip(field, message) {
  var inputElement = document.getElementById(field);
  var tooltip = document.createElement('div');
  tooltip.className = 'tooltip';
  tooltip.textContent = message;

  // Position tooltip relative to the input field
  var rect = inputElement.getBoundingClientRect();
  tooltip.style.top = rect.bottom + window.scrollY + 'px';
  tooltip.style.left = rect.left + window.scrollX + 'px';

  // Set a unique ID for the tooltip so we can hide it later
  tooltip.id = field + 'Tooltip';

  document.body.appendChild(tooltip);
}

function hideTooltip(field) {
  var tooltip = document.getElementById(field + 'Tooltip');
  if (tooltip) {
    tooltip.parentNode.removeChild(tooltip);
  }
}

function confirmPayment() {
  // Logic to confirm the payment
  // You may want to interact with a payment gateway or simulate a successful payment
  // Display a success message or handle the payment confirmation as needed
  let order = createNewOrder();
  saveOrderToLocalStorage(order);
}
function createNewOrder(){

}