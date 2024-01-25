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

        // update form state when action happen
        $('.needs-validation').on('input', 'input', function (event) {
          const target = $(event.target);
    
          // Example: Custom validation for email format
          if (target.attr('type') === 'email') {
            if (!validateEmail(target.val())) {
              target[0].setCustomValidity('Please enter a valid email address.');
            } else {
              target[0].setCustomValidity('');
            }
          }
        });

        $('#confirm_payment').click(function (event) {
          if (validateForm()) {
            event.preventDefault();
            event.stopPropagation();
            alert('weldone')
            saveOrderToLocalStorage(myOrder);
          }
          else{
            alert('no');
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

function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Function to perform form validation
function validateForm() {
  const form = $('.needs-validation')[0];

  if (!form.checkValidity()) {
    form.classList.add('was-validated');
    return false;
  }

  // Additional custom validation
  const emailInput = $('#email');
  if (emailInput.length && !validateEmail(emailInput.val())) {
    emailInput[0].setCustomValidity('Please enter a valid email address.');
    return false;
  }

  return true;
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