// let data = {
//     "users":[
//        {
//           "id":1,
//           "role":"customer",
//           "username":"customer1",
//           "password":"password123",
//           "cart":[
             
//           ]
          
//        },
//        {
//           "id":2,
//           "role":"seller",
//           "username":"seller1",
//           "password":"sellerpass",
//           "products":[
             
//           ]
//        },
//        {
//           "id":3,
//           "role":"admin",
//           "username":"admin1",
//           "password":"adminpass"
//        }
//     ],
//     "products":[
//        {
//           "id":101,
//           "title":"The Great Gatsby",
//           "description":"Classic novel by F. Scott Fitzgerald",
//           "price":10.99,
//           "image":"gatsby.jpg",
//           "sellerId":2
//        },
//        {
//           "id":102,
//           "title":"To Kill a Mockingbird",
//           "description":"Harper Lee's masterpiece",
//           "price":12.99,
//           "image":"mockingbird.jpg",
//           "sellerId":2
//        }
//     ],
//     "cart":[
//        {
//           "userId":1,
//           "items":[
//              {
//                 "productId":101,
//                 "quantity":2
//              }
//           ]
//        }
//     ],
//     "orders":[
//         {
//             "orderId": 1,
//             "userId": 3,
//             "status": "pending",
//             "total": 1260,
//             "items": {
//                 "orderId": 1,
//                 "userId": 1,
//                 "status": "pending",
//                 "total": 1260,
//                 "items": [
//                     {
//                         "ID": 1,
//                         "name": "Tale of Two Cities",
//                         "price": 135,
//                         "quantity": 2,
//                         "sellerId": 1,
//                         "imgLink": "Resources/Images/books/TaleofTwoCities.jpg"
//                     },
//                     {
//                         "ID": 2,
//                         "name": "The final Gambit",
//                         "price": 125,
//                         "quantity": 4,
//                         "sellerId": 5,
//                         "imgLink": "Resources/Images/books/TheFinalGambit.jpg"
//                     },
//                     {
//                         "ID": 3,
//                         "name": "Abu Alhoul",
//                         "price": 115,
//                         "quantity": 3,
//                         "sellerId": 6,
//                         "imgLink": "Resources/Images/books/abuAlhoulBook.jpg"
//                     }
//                 ]
//             },
//             "date": "2024-01-26T15:56:41.478Z"
//         },
//         {
//             "orderId": 2,
//             "userId": 3,
//             "status": "pending",
//             "total": 1260,
//             "items": {
//                 "orderId": 1,
//                 "userId": 1,
//                 "status": "pending",
//                 "total": 1260,
//                 "items": [
//                     {
//                         "ID": 1,
//                         "name": "Tale of Two Cities",
//                         "price": 135,
//                         "quantity": 2,
//                         "sellerId": 1,
//                         "imgLink": "Resources/Images/books/TaleofTwoCities.jpg"
//                     },
//                     {
//                         "ID": 2,
//                         "name": "The final Gambit",
//                         "price": 125,
//                         "quantity": 4,
//                         "sellerId": 5,
//                         "imgLink": "Resources/Images/books/TheFinalGambit.jpg"
//                     },
//                     {
//                         "ID": 3,
//                         "name": "Abu Alhoul",
//                         "price": 115,
//                         "quantity": 3,
//                         "sellerId": 6,
//                         "imgLink": "Resources/Images/books/abuAlhoulBook.jpg"
//                     }
//                 ]
//             },
//             "date": "2024-01-26T16:02:16.366Z"
//         },
    
        
//         {
//             "orderId": 16,
//             "userId": 3,
//             "status": "pending",
//             "total": 1260,
//             "items": [
//                 {
//                     "ID": 1,
//                     "name": "Tale of Two Cities",
//                     "price": 135,
//                     "quantity": 2,
//                     "sellerId": 1,
//                     "imgLink": "Resources/Images/books/TaleofTwoCities.jpg"
//                 },
//                 {
//                     "ID": 2,
//                     "name": "The final Gambit",
//                     "price": 125,
//                     "quantity": 4,
//                     "sellerId": 5,
//                     "imgLink": "Resources/Images/books/TheFinalGambit.jpg"
//                 },
//                 {
//                     "ID": 3,
//                     "name": "Abu Alhoul",
//                     "price": 115,
//                     "quantity": 3,
//                     "sellerId": 6,
//                     "imgLink": "Resources/Images/books/abuAlhoulBook.jpg"
//                 }
//             ],
//             "date": "2024-01-26T16:44:03.576Z"
//         },
      
//     ],

//     "sellerDashboard":{
//        "sellerId":2,
//        "products":[
//           {
//              "productId":101,
//              "quantity":50,
//              "sales":200
//           }
//        ],
//        "orders":[
//           {
//              "orderId":1,
//              "items":[
                
//              ],
//              "total":21.98,
//              "status":"completed"
//           }
//        ],
//        "analytics":{
//           "totalSales":5000
//        }
//     }
//  };
// // fetch('./Data/obj.json')
// //     .then((response) => response.json())
// //     .then((json) => {data=json; createTable(json)});



// function createTable(data) {
//     let num = 0;
//     let tableBody = document.getElementById("orderTableBody"); // Corrected selection
//     let tableHead = document.getElementById("orderTableHead"); // Corrected selection

//     tableHead.innerHTML ="";
//     tableBody.innerHTML = "";
    
//     tableHead.innerHTML += `
//         <tr>
//             <th scope="col">#</th>
//             <th scope="col">Order ID</th>
//             <th scope="col">Items</th>
//             <th scope="col">Total</th>
//             <th scope="col">Status</th>
//             <th scope="col" colspan="2">Actions</th>
//         </tr>
//     `;
//     Array.from(data.orders).forEach(orders => {
//         tableBody.innerHTML += `
//             <tr>
//                 <th scope="row">${++num}</th>
//                 <td>${orders.orderId}</td>
//                 <td>
//                 <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" id="modalbody"  data-order-id="${orders.orderId}">Display</button>
//                 </td>
//                 <td>${orders.total}</td>
//                 <td class="${color(orders.status)}">${orders.status}</td>
//                 <td>
//                     <button type="button" class="btn m-1  btn-success  completed" data-id=${orders.orderId}>Completed</button>
//                 </td>
//                 <td>
//                     <button type="button" class="btn m-1 btn-danger rejected" data-id=${orders.orderId}>Rejrcted</button>
//                 </td>
//             </tr>
//         `;
//     });
// };
// ///////////////////////main fumction/////////////////
// function color(status){
//     if(status=="pending"){
//         return "text-warning"
//     }else if(status=="completed"){
//         return "text-success"
//     }else{
//         return "text-danger";
//     }

// }





// window.addEventListener("load", (event) => {
    
//     createTable(data);

//     function changeOrderStatus(orderId, newStatus) {
//         // Update the status in the JSON data
//         data.orders.forEach(order => {
//             if (order.orderId === orderId) {
//                 order.status = newStatus;
//             }
//         });
    
//         // Update the table to reflect the changed status
//         createTable(data);
//     }
    
//     // Event listener for "rejected" buttons

//     document.querySelectorAll(".rejected").forEach(button => {
//         button.addEventListener('click', function(e) {
//             const orderId = parseInt(e.target.dataset.id);
//             console.log(orderId);
//             changeOrderStatus(orderId, 'rejected');
//         });
//     });
    
//     // Event listener for "completed" buttons
//     document.querySelectorAll('.completed').forEach(button => {
//         button.addEventListener('click', function(e) {
//             const orderId = parseInt(e.target.dataset.id);
//             changeOrderStatus(orderId, 'completed');
//         });
//     });







//     let displaybtn =document.getElementById("modalbody");
//    // let modabody =document.getElementById("modal-body");
//     displaybtn.addEventListener('click',function(){
//         const orderId = parseInt(this.dataset.orderId);
//         displayItems(orderId);  
//     });
//     function displayItems(orderId) {
//         // Find the order with the given orderId
//         // console.log(orderId);
//         const order =data.orders.find(order => order.orderId === orderId);
        
//         // Check if the order is found
//         if (order) {
//             // Get the modal body element
//             let modalBody = document.getElementById("modal-body");
//              let items =0; // Assuming you want to access the items from the first order
//              data.orders.forEach(order => {
//                 // Access the items array within the current order
//                 let items = order.items.items; // Adjust this according to your data structure
            
//                 // Construct the table header for the current order
//                 let tableHTML = `
//                     <table class="table">
//                         <thead>
//                             <tr>
//                                 <th>ID</th>
//                                 <th>Name</th>
//                                 <th>Price</th>
//                                 <th>Quantity</th>
//                                 <th>Seller ID</th>
//                                 <th>Image Link</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                 `;
            
//                 // Construct table rows for each item in the current order
//                 items.forEach(item => {
//                     tableHTML += `
//                         <tr>
//                             <td>${item.ID}</td>
//                             <td>${item.name}</td>
//                             <td>${item.price}</td>
//                             <td>${item.quantity}</td>
//                             <td>${item.sellerId}</td>
//                             <td><img src="${item.imgLink}" alt="${item.name}" style="width: 100px; height: auto;"></td>
//                         </tr>
//                     `;
//                 });
            
//                 // Close the table for the current order
//                 tableHTML += `
//                         </tbody>
//                     </table>
//                 `;
            
//                 // Append the table HTML to the modal body
//                 modalBody.innerHTML = tableHTML; // Use '+=' to append for each order
//             });
//         }
//     }
            
// });

let orders = [
    {
      orderId: 1,
      userId: 3,
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
      date: "2024-01-27T14:00:09.892Z",
    },
    {
      orderId: 2,
      userId: 3,
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
      date: "2024-01-27T14:01:32.371Z",
    },
    {
        orderId: 3,
        userId: 3,
        status: "pending",
        total: 556,
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
        date: "2024-01-27T14:01:32.371Z",
      },
  ];
let myallOrders;
let sellerOrders;
let sellerID;
  $(document).ready(function () {
    //saveOrdersToLocalStorage(orders);
    //populateUser();

    sellerID =getSellerID();
   
    myallOrders = loadOrdersFromLocalStorage();
    console.log(myallOrders);

    sellerOrders = filterOrdersToSeller(myallOrders,sellerID);

    // if(true){
    //     displaySellerOrders(sellerOrders);
    // }

  });
  function getSellerID() {
    debugger;
    let _seller = localStorage.getItem('currentUser');
    if(_seller){
        let seller = JSON.parse(_seller);
        return seller[0].id;
    }
    else{
        return [];
    }
  }
  
  function loadOrdersFromLocalStorage() {
    let _allorders = localStorage.getItem('allOrders');
    if(_allorders){
        let allOrders = JSON.parse (_allorders);
        if(allOrders.length>0)
            return allOrders
        else
            return [];
    }
    return [];
  }
  function populateUser() {
    
    localStorage.setItem('currentUser',JSON.stringify([{"id":1,"username":"mohamed","email":"mohamedhamed3343@gmail.com","password":"123456789","role":"seller"}]));
  }
 
  function saveOrdersToLocalStorage(orders) {
    localStorage.setItem('allOrders',JSON.stringify(orders));
  }
  function filterOrdersToSeller(orders,sellerID) {
    
  }
  function displaySellerOrders(sellerOrder){

  }
  
  // 1. get Orders from Local Storage
     
  // Cook the data  Total Profit
  // 2. Display seller order to The Dom 
  // 3. add View Button to see the items
  // 4. add pagination


