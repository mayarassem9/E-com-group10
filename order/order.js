import data from "../../Data/books.json" assert { type: 'json' };
import * as valid from '../../order/valid.js';

$(document).ready(function(){

    var books = JSON.parse(localStorage.getItem("books")) ||[];
    var orders = JSON.parse(localStorage.getItem("orders")) || [];
    var currentUser = JSON.parse(localStorage.getItem("currentUser")) || [];

    var orderIndex =orders.findIndex(order => order.userId === currentUser[0].id)
    console.log(orderIndex,orders[orderIndex]);
    valid.notificationUpdate(orders);

    var order =orders[orderIndex]||[];
    
            if (order.items ) {  
                order.items.forEach(function (item, itemIndex) {
                    console.log(item);
                    createCartItem(books,item,orders,orderIndex)
                });
            } 
    $('#goToCheckout').click(function (event) {
        window.location.href = "Checkout_Component/checkout.html"
    })
});

function createCartItem(books,item,orders,orderIndex) {
    // Create main elements
    var card = document.createElement('div');
    card.classList.add('card', 'rounded-3', 'mb-4');

    var cardBody = document.createElement('div');
    cardBody.classList.add('card-body', 'p-4');

    var row = document.createElement('div');
    row.classList.add('row', 'd-flex', 'justify-content-between', 'align-items-center');

    //  image 
    var imageCol = document.createElement('div');
    imageCol.classList.add('col-md-2', 'col-lg-2', 'col-xl-2');

    var img = document.createElement('img');
    img.src = item["imgLink"];
    img.classList.add('img-fluid', 'rounded-3');
    

    imageCol.appendChild(img);

    //  product details 
    var detailsCol = document.createElement('div');
    detailsCol.classList.add('col-md-3', 'col-lg-3', 'col-xl-3');

    var productName = document.createElement('p');
    productName.classList.add('lead', 'fw-normal', 'mb-2');
    productName.textContent = item["name"];

    detailsCol.appendChild(productName);


    var priceCol = document.createElement('div');
    priceCol.classList.add('col-md-3', 'col-lg-2', 'col-xl-2', 'offset-lg-1');

    var priceS = document.createElement('h5');
    priceS.classList.add('mb-0','priceH5');
    priceS.id="priceH5";
    priceS.innerText = item.price* item.quantity;
    //  quantity 
    var quantityCol = document.createElement('div');
    quantityCol.classList.add('col-md-3', 'col-lg-3', 'col-xl-2', 'd-flex');

    var minusButton = document.createElement('button');
    minusButton.classList.add('btn', 'btn-link', 'px-2');
    minusButton.innerHTML = '<i class="fas fa-minus"></i>';

    minusButton.addEventListener('click', function () {
        if(item.quantity>1){
           
        var input = this.parentNode.querySelector('input[type=number]');
        input.stepDown();
        item.quantity--;
        updateLocalStorage(orders);
        var subTotal =item["price"]*quantityInput.value;
        priceS.innerText = subTotal;
        updateTotalPrice();}
    });
    console.log(books);
    var selectedBook = books.find(book => book["title"] == item["name"]);
    console.log(selectedBook);

    var quantityInput = document.createElement('input');
    quantityInput.id = 'form1';
    quantityInput.min = '1';
    quantityInput.max = selectedBook["stockNum"];
    quantityInput.name = 'quantity';
    quantityInput.value = `${item.quantity}`;
    quantityInput.type = 'number';
    quantityInput.classList.add('form-control', 'form-control-sm');

   

    var plusButton = document.createElement('button');
    plusButton.classList.add('btn', 'btn-link', 'px-2');
    plusButton.innerHTML = '<i class="fas fa-plus"></i>';
    plusButton.addEventListener('click', function () {

        if(selectedBook["stockNum"]>quantityInput.value){
            var input = this.parentNode.querySelector('input[type=number]');
            input.stepUp();
            item.quantity++;
            updateLocalStorage(orders);
            var subTotal =item["price"]*quantityInput.value;
            priceS.innerText = subTotal;
            updateTotalPrice();
        }
        else{
            Swal.fire("Sorry Out Of Stock !!!");
        }
       
    });

    quantityCol.appendChild(minusButton);
    quantityCol.appendChild(quantityInput);
    quantityCol.appendChild(plusButton);

    //  price 
    

    priceCol.appendChild(priceS);

    //  delete 
    var deleteCol = document.createElement('div');
    deleteCol.classList.add('col-md-1', 'col-lg-1', 'col-xl-1', 'text-end');

    var deleteCol = document.createElement('div');
    deleteCol.classList.add('col-md-1', 'col-lg-1', 'col-xl-1', 'text-end');
    
    var deleteButton = document.createElement('button');
    deleteButton.classList.add('btn', 'btn-link', 'text-danger');
    
    var deleteIcon = document.createElement('i');
    deleteIcon.classList.add('fas', 'fa-trash', 'fa-lg');
    
    deleteButton.appendChild(deleteIcon);
    deleteCol.appendChild(deleteButton);
    
    
    deleteButton.addEventListener('click', function () {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to delete this book!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes"
        }).then((result) => {
            if (result.isConfirmed) {
                console.log(orders[orderIndex].items);
                var orderIndexToDelete = orders[orderIndex].items.findIndex(itemm => itemm.name === item.name);
    
                if (orderIndexToDelete !== -1) {
                    orders[orderIndex].items.splice(orderIndexToDelete, 1);
    
                    if (orders[orderIndex].items.length === 0) {
                        // If items array is empty, remove the entire order
                        orders.splice(orderIndex, 1);
                    }
    
                    updateLocalStorage(orders);
                    var container = document.getElementById('orderDiv');
                    container.removeChild(card);
                }
    
                updateTotalPrice();
                valid.notificationUpdate(orders);
            }
        });
    });
    
    // Append delete button column to row
    row.appendChild(deleteCol);

    //  columns to the row
    row.appendChild(imageCol);
    row.appendChild(detailsCol);
    row.appendChild(quantityCol);
    row.appendChild(priceCol);
    row.appendChild(deleteCol);

    //  row to card body
    cardBody.appendChild(row);

    //  card body to card
    card.appendChild(cardBody);

    // Append card to container (adjust the container id accordingly)
    var container = document.getElementById('orderDiv');
    container.appendChild(card);

    updateTotalPrice();  
}
 function updateLocalStorage(arr) {
    localStorage.setItem("orders", JSON.stringify(arr));
}
function updateTotalPrice() {
    var priceElements = document.querySelectorAll(".priceH5");
    var total = 0;

    priceElements.forEach(price => {
        console.log(Number(price.innerText));
        total += Number(price.innerText);
    });
    document.getElementById("TotalPrice").innerText ="";
    document.getElementById("TotalPrice").innerText ="   "+ total + " $";
}