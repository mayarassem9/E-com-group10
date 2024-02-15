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
let searchTerm;
const itemsPerPage = 5; // Change this value to the desired number of orders per page
let currentPage = 1;

$(document).ready(function () {
  links[3].parentElement.classList.add("active");
  myallOrders = loadOrdersFromLocalStorage();
  //displayAllOrders(myallOrders);
  const totalPages = Math.ceil(myallOrders.length / itemsPerPage);
  updatePaginationButtons(totalPages);
  displayOrdersForPage(myallOrders, currentPage);

  document.getElementById("prevPage").addEventListener("click", function () {
    if (currentPage > 1) {
      currentPage--;
      displayOrdersForPage(myallOrders, currentPage);
      updatePaginationButtons(Math.ceil(myallOrders.length / itemsPerPage));
    }
  });

  document.getElementById("nextPage").addEventListener("click", function () {
    const totalPages = Math.ceil(myallOrders.length / itemsPerPage);
    if (currentPage < totalPages) {
      currentPage++;
      displayOrdersForPage(myallOrders, currentPage);
      updatePaginationButtons(totalPages);
    }
  });
});

function loadOrdersFromLocalStorage() {
  let _allorders = localStorage.getItem("allOrders");
  if (_allorders) {
    let allOrders = JSON.parse(_allorders);
    if (allOrders.length > 0) return allOrders;
    else return [];
  }
  return [];
}
function displayAllOrders(myallOrders) {
  // Sort orders by latest date
  myallOrders.sort((a, b) => new Date(b.date) - new Date(a.date));

  let tableBody = document.getElementById("sellerOrdersTableBody");
  tableBody.innerHTML = ``;

  myallOrders.forEach((order) => {
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
      } else if (key === "items" || key === "total") {
        // Nothing
      } else {
        let cell = document.createElement("td");
        cell.textContent = value;
        row.appendChild(cell);
      }
    });

    if (status === "completed") {
      let actionCell = document.createElement("td");
      // <button class="btn btn-secondary rounded-circle" onclick="changeOrderStatus('${_orderId}')">
      // <i class="fa-regular fa-circle-check"></i>
      // </button>
      actionCell.innerHTML = `
      <button class="btn btn-info rounded-circle" onclick="seeOrderDetails('${_orderId}')">
      <i class="fa-regular fa-eye"></i>
      </button>
    `;
      row.appendChild(actionCell);
    } else {
      let actionCell = document.createElement("td");
      actionCell.innerHTML = `
      <button class="btn btn-info rounded-circle" onclick="seeOrderDetails('${_orderId}')">
      <i class="fa-regular fa-eye"></i>
      </button>
    `;
      row.appendChild(actionCell);
    }

    tableBody.appendChild(row);
  });
}


function searchOrdersByDate() {
  let dateInput = document.getElementById("dateInput").value;
  
  // If no date is entered, reset the table to display all orders
  if (!dateInput) {
    displayAllOrders(myallOrders);
    return;
  }
  
  // Filter orders based on the entered date
  let filteredOrders = myallOrders.filter(order => {
    // Extracting date portion from order date
    let orderDate = order.date.split('T')[0];
    return orderDate === dateInput;
  });

  // Display filtered orders
  displayAllOrders(filteredOrders);
}




function saveOrdersToLocalStorage(orders) {
  localStorage.setItem("allOrders", JSON.stringify(orders));
}
function getUserNameById(id) {
  let users = JSON.parse(localStorage.getItem("users")) || [];
  let user = users.find((user) => user.id === id);
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
function changeColor(status) {
  if (status == "pending") {
    return "text-warning";
  } else if (status == "completed") {
    return "text-success";
  } else {
    return "text-danger";
  }
}
function seeOrderDetails(orderID) {
  const order = myallOrders.find((o) => o.orderId === parseInt(orderID));

  if (!order) {
    alert("Order not found");
    return;
  }

  const modal = document.getElementById("orderDetailsModal");
  const modalContent = document.getElementById("orderDetailsModalContent");

  modalContent.innerHTML = "";
  const modalTitle = document.createElement("h5");
  //modalTitle.textContent = "Order Details";
  modalContent.appendChild(modalTitle);

  const table = document.createElement("table");
  table.classList.add("table");
  table.innerHTML = `
    <thead>
      <tr>
        <th>Item</th>
        <th>Price</th>
        <th>Quantity</th>
        <th>Image</th>
        <th>Seller Name</th>
        <th>Total</th>
       
      </tr>
    </thead>
    <tbody></tbody>
  `;

  const tbody = table.querySelector("tbody");

  // Add each item to the table
  order.items.forEach((item) => {
    const row = document.createElement("tr");
    let allUsers = loadUsersFromLocalStorage();
    let seller = allUsers.find((user) => user.id === item.sellerId);
    let sellerName = seller.username;
    row.innerHTML = `
      <td>${item.name}</td>
      <td>${item.price}</td>
      <td>${item.quantity}</td>
      <td><img src="../${
        item.imgLink
      }" alt="Book Image" style="max-width: 65px;"></td>
      <td>${sellerName}</td>
      <td>$${item.price * item.quantity}</td>
    
    `;
    tbody.appendChild(row);
  });

  modalContent.appendChild(table);
  // Display the total of the totals
  const totalTotal = order.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const totalParagraph = document.createElement("p");
  totalParagraph.classList.add("text-end", "me-4");
  totalParagraph.innerHTML = `<strong>Total:</strong> $${totalTotal}`;
  modalContent.appendChild(totalParagraph);

  // Add a horizontal rule
  const hr = document.createElement("hr");
  modalContent.appendChild(hr);

  // Make the modal wider
  modal.querySelector(".modal-dialog").classList.add("modal-xl");

  const bootstrapModal = new bootstrap.Modal(modal);
  bootstrapModal.show();
}

function loadUsersFromLocalStorage() {
  let myUsers = JSON.parse(localStorage.getItem("users"));
  return myUsers;
}
function changeOrderStatus(_orderId) {
  _orderId = Number(_orderId);
  console.log(_orderId);
  myallOrders = loadOrdersFromLocalStorage();
  myallOrders.forEach((order) => {
    if (order.orderId === _orderId) {
      if (order.status === "pending") {
        order.status = "completed";
      } else if (order.status === "completed") {
        order.status = "pending";
      }
    }
  });
  saveOrdersToLocalStorage(myallOrders);
  myallOrders = loadOrdersFromLocalStorage();
  //displayAllOrders(myallOrders);
  const totalPages = Math.ceil(myallOrders.length / itemsPerPage);
  updatePaginationButtons(totalPages);
  displayOrdersForPage(myallOrders, currentPage);
  // displayOrdersForPage(sellerOrders, currentPage);
}

function displayOrdersForPage(orders, page) {
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedOrders = orders.slice(startIndex, endIndex);

  displayAllOrders(paginatedOrders);
}

function updatePaginationButtons(totalPages) {
  const paginationContainer = document.querySelector(".pagination-numbers");
  paginationContainer.innerHTML = "";

  for (let i = 1; i <= totalPages; i++) {
    const li = document.createElement("li");
    li.classList.add("page-item");

    const button = document.createElement("a");
    button.classList.add("page-link");
    button.href = "#";
    button.textContent = i;

    button.addEventListener("click", function () {
      currentPage = i;
      displayOrdersForPage(myallOrders, currentPage);
      updatePaginationButtons(totalPages);
    });

    if (i === currentPage) {
      li.classList.add("active");
    }

    li.appendChild(button);
    paginationContainer.appendChild(li);
  }
}

let sortOrder = {
  column: null,
  direction: "asc", // 'asc' for ascending, 'desc' for descending
};

function sortTable(column) {
  if (sortOrder.column === column) {
    sortOrder.direction = sortOrder.direction === "asc" ? "desc" : "asc";
  } else {
    sortOrder.column = column;
    sortOrder.direction = "asc";
  }

  myallOrders.sort((a, b) => {
    let aValue = a[column];
    let bValue = b[column];

    if (column === "date") {
      aValue = new Date(aValue).getTime();
      bValue = new Date(bValue).getTime();
    } else if (typeof aValue === "string") {
      aValue = aValue.toLowerCase();
      bValue = bValue.toLowerCase();
    }

    if (sortOrder.direction === "asc") {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  displayOrdersForPage(myallOrders, currentPage);
}
