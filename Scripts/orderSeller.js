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
          sellerId: 5,
          imgLink: "Resources/Images/books/TaleofTwoCities.jpg",
        },
        {
          ID: 2,
          name: "The final Gambit",
          price: 125,
          quantity: 4,
          sellerId: 1,
          imgLink: "Resources/Images/books/TheFinalGambit.jpg",
        },
        {
          ID: 3,
          name: "Abu Alhoul",
          price: 115,
          quantity: 3,
          sellerId: 1,
          imgLink: "Resources/Images/books/abuAlhoulBook.jpg",
        },
      ],
      date: "2024-01-27T14:00:09.892Z",
    },
    {
      orderId: 2,
      userId: 2,
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
      userId: 4,
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
  let sellerOrders = [];
  let sellerID;
  let searchTerm;
  $(document).ready(function () {
    //saveOrdersToLocalStorage(orders);
    // populateUser();
  
    // EventListener
    $("#searchBookOrder").on("input", function () {
      searchTerm = $("#searchBookOrder").val();
      console.log(searchTerm);
      // displaySellerOrders(sellerOrders,searchTerm);
    });
  
    sellerID = getSellerID();
    console.log(sellerID);
    myallOrders = loadOrdersFromLocalStorage();
    console.log(myallOrders);
  
    sellerOrders = filterOrdersToSeller(myallOrders, sellerID);
    displaySellerOrders(sellerOrders);
  });
  function getSellerID() {
    let _seller = localStorage.getItem("currentUser");
    if (_seller) {
      let seller = JSON.parse(_seller);
      return seller[0].id;
    } else {
      return [];
    }
  }
  
  function loadOrdersFromLocalStorage() {
    let _allorders = localStorage.getItem("allOrders");
    if (_allorders) {
      let allOrders = JSON.parse(_allorders);
      if (allOrders.length > 0) return allOrders;
      else return [];
    }
    return [];
  }
  function populateUser() {
    localStorage.setItem(
      "currentUser",
      JSON.stringify([
        {
          id: 1,
          username: "mohamed",
          email: "mohamedhamed3343@gmail.com",
          password: "123456789",
          role: "seller",
        },
      ])
    );
  }
  
  function saveOrdersToLocalStorage(orders) {
    localStorage.setItem("allOrders", JSON.stringify(orders));
  }
  
  function filterOrdersToSeller(orders, sellerID) {
    orders.forEach((order) => {
      order.items.forEach((item) => {
        if (item.sellerId === sellerID) {
          sellerOrders.push({
            orderId: order.orderId,
            userId: order.userId,
            bookID: item.ID,
            bookName: item.name,
            bookPrice: item.price,
            bookQuantity: item.quantity,
            imgLink: item.imgLink,
            date: order.date,
            status: order.status,
          });
        }
      });
    });
    console.log(sellerOrders);
    return sellerOrders;
  }
  function displaySellerOrders(sellerOrder) {
    let tableBody = document.getElementById("sellerOrdersTableBody");
    tableBody.innerHTML = ``;
  
    sellerOrder.forEach((order) => {
      let row = document.createElement("tr");
      let _orderId;
      let status;
      Object.entries(order).forEach(([key, value]) => {
        console.log(`Key: ${key}, Value: ${value}`);
  
        if (key === "userId") {
          let userName = getUserNameById(value);
          let cell = document.createElement("td");
          cell.textContent = userName;
          row.appendChild(cell);
        } else if (key === "imgLink") {
          let cell = document.createElement("td");
          let img = document.createElement("img");
          img.src = "./" + value;
          img.alt = "Book Image";
          img.style.maxWidth = "50px";
          cell.appendChild(img);
          row.appendChild(cell);
        } else if (key === "date") {
          let cell = document.createElement("td");
          cell.textContent = formatNiceDate(value);
          row.appendChild(cell);
        } else if (key === "orderId") {
          let cell = document.createElement("td");
          cell.textContent = value;
          row.appendChild(cell);
          _orderId = value;
        } else if (key === "status") {
          let cell = document.createElement("td");
          cell.classList.add(changeColor(value));
          cell.textContent = value;
          row.appendChild(cell);
          status = value;
        } else {
          let cell = document.createElement("td");
          cell.textContent = value;
          row.appendChild(cell);
        }
      });
  
      if (status === "completed") {
        let actionCell = document.createElement("td");
        actionCell.innerHTML = `
      <button class="btn btn-secondary rounded-circle" onclick="changeOrderStatus('${_orderId}')">
      <i class="fa-regular fa-circle-check"></i>
      </button>
    `;
        row.appendChild(actionCell);
      } else {
        let actionCell = document.createElement("td");
        actionCell.innerHTML = `
      <button class="btn btn-secondary rounded-circle" onclick="changeOrderStatus('${_orderId}')">
      <i class="fa fa-hourglass-end"></i>
      </button>
    `;
        row.appendChild(actionCell);
      }
  
      tableBody.appendChild(row);
    });
  }
  
  function getUserNameById(id) {
    // Assuming users are stored in localStorage
    let users = JSON.parse(localStorage.getItem("users")) || [];
  
    // Find the user with the given ID
    let user = users.find((user) => user.id === id);
  
    // Return the username if the user is found, otherwise return null
    return user ? user.username : null;
  }
  function formatNiceDate(dateString) {
    const options = {
      month: "long",
      day: "numeric",
      hour: "2-digit",
    };
    const formattedDate = new Date(dateString).toLocaleDateString(
      "en-US",
      options
    );
    return formattedDate;
  }
  
  function changeOrderStatus(_orderId) {
    _orderId = Number(_orderId);
    console.log(_orderId);
  
    sellerOrders.forEach((order) => {
      if (order.orderId === _orderId) {
        order.status = "completed";
      }
    });
    displaySellerOrders(sellerOrders);
    //saveOrdersToLocalStorage(allorders);
  }
  function changeColor(status) {
    if (status == "pending") {
      return "text-warning";
    } else if (status == "completed") {
      return "text-success";
    } else {
      return "text-danger";
    }
  }
  // 1. get Orders from Local Storage
  /*
      sellerOrders={
        orderId: order.orderId,
        userId: order.userId,
        bookID: item.ID,
        bookName: item.name,
        bookPrice: item.price,
        bookQuantity: item.quantity,
        imgLink: item.imgLink,
        date: order.date,
        status: order.status,
      } */
  // Cook the data  Total Profit
  // 2. Display seller order to The Dom
  // 3. add View Button to see the items
  // - search by bookname
  // - compute total profit
  // 4. add pagination
  