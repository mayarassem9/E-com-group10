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
];
$(document).ready(function () {
    links[3].parentElement.classList.add("active");
});




// 1. get Orders from Local Storage
// Cook the data   Get USer Name From ID, Get Seller Name from ID 
// 2. Display to The Dom
// 3. add View Button to see the items
// 4. fix the pagination
// 5. 