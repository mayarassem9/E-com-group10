const users = [
  {
    id: 1,
    username: "customer1",
    email: "customer1@gmail.com",
    password: "password123",
    role: "customer",
  },
  {
    id: 2,
    username: "seller1",
    email: "seller1@gmail.com",
    password: "sellerpass",
    role: "seller",
  },
  {
    id: 3,
    username: "admin1",
    email: "admin1@gmail.com",
    password: "adminpass",
    role: "admin",
  },
];
let allUsers = [];
const usersPerPage = 5;
let currentPage = 1;
let searchRole = "";

$(document).ready(function () {
  //saveUsersInLocalStorage(users)

  links[0].parentElement.classList.add("active");

  loadUsersFromLocalStorage();
  // OnLoad
  loadAllUsers();
  updatePagination();
  displayUsersByPage(currentPage);

  $("#prevPage").click(function () {
    if (currentPage > 1) {
      currentPage--;
      displayUsersByPage(currentPage);
    }
  });

  $("#nextPage").click(function () {
    const totalPages = Math.ceil(allUsers.length / usersPerPage);
    if (currentPage < totalPages) {
      currentPage++;
      displayUsersByPage(currentPage);
    }
  });

  //********* Event Listeners ***********
  $("#submitAddUser").click(function () {
    let name = $("#name").val();
    let password = $("#password").val();
    let email = $("#email").val();
    let role = $("#role").val();
    createNewUser(name, email, password, role);
    console.log(name);
  });
  $("#Add-User").click(function () {
    // resetting values
    $("#name").val("");
    $("#password").val("");
    $("#email").val("");
    $("#role").val("");
    $("#errorMsg").addClass("d-none");
  });
  $('input[type="search"]').on("input", function () {
    let searchTerm = $(this).val().toLowerCase();
    searchAndDisplayUsers(searchTerm, searchRole);
  });
  $("#selectedRole").on("change", function () {
    let searchTerm = $('input[type="search"]').val().toLowerCase();
    searchRole = $(this).val();
    searchAndDisplayUsers(searchTerm, searchRole);
    let totalUsers = filterUsersByRole(searchRole);
    displayUsersByPage(currentPage);
  });
  $("#submitEditUser").click(function () {
    console.log("HERE");

    let target_id = $("#edit-id").val();
    let name = $("#edit-name").val();
    let password = $("#edit-password").val();
    let email = $("#edit-email").val();
    let role = $("#edit-role").val();
    if (validateForm()) {
      updateUser(target_id, name, email, password, role);
    }
  });
});

function navigateLink(element) {
  // Remove 'active' class from all links
  $(".sidebar-nav li").removeClass("active");

  // Add 'active' class to the clicked link
  $(element).parent().addClass("active");
}

function displayUsersByPage(page) {
  currentPage = page; // Set the current page to the clicked page
  const startIndex = (page - 1) * usersPerPage;
  const endIndex = startIndex + usersPerPage;
  let paginationUsers = filterUsersByRole(searchRole); // Filter users by selected role

  const usersToDisplay = paginationUsers.slice(startIndex, endIndex);
  displayFilteredUsers(usersToDisplay);

  updatePagination(paginationUsers.length);
}

function updatePagination(totalUsers) {
  const totalPages = Math.ceil(totalUsers / usersPerPage);
  let paginationHtml = "";

  for (let i = 1; i <= totalPages; i++) {
    const activeClass = i === currentPage ? "active" : "";
    paginationHtml += `<li class="page-item ${activeClass}">
            <a class="page-link" href="#" onclick="displayUsersByPage(${i})">${i}</a>
        </li>`;
  }
  $(".pagination-numbers").html(paginationHtml);
}

function filterUsersByRole(role) {
  if (role === "customer" || role === "seller") {
    return allUsers.filter((user) => user.role === role);
  } else {
    return allUsers;
  }
}

function searchAndDisplayUsers(searchTerm, searchRole) {
  let filteredUsers = [];

  if (searchTerm.trim() === "") {
    if (searchRole === "customer" || searchRole === "seller") {
      filteredUsers = allUsers.filter((user) => user.role.includes(searchRole));
    } else {
      displayUsersByPage(currentPage);
      return;
    }
  } else {
    if (searchRole === "customer" || searchRole === "seller") {
      filteredUsers = allUsers.filter(
        (user) =>
          (user.username.toLowerCase().includes(searchTerm) &&
            user.role.includes(searchRole)) ||
          (user.email.toLowerCase().includes(searchTerm) &&
            user.role.includes(searchRole))
      );
    } else {
      filteredUsers = allUsers.filter(
        (user) =>
          user.username.toLowerCase().includes(searchTerm) ||
          user.email.toLowerCase().includes(searchTerm)
      );
    }
  }

  displayFilteredUsers(filteredUsers);
}

function displayFilteredUsers(users) {
  let tbody = $("#userTable tbody");
  tbody.empty();

  if (users.length === 0) {
    const noDataFoundRow = `<tr><td colspan="6" class="text-danger text-center"> No Users Found !</td></tr>`;
    tbody.append(noDataFoundRow);
  }
  users.forEach((user) => {
    if (user.role !== "admin") {
      const row = `<tr>
                        <td>${user.id}</td>
                        <td>${user.username}</td>
                        <td>${user.email}</td>
                        <td>${user.password}</td>
                        <td>${user.role}</td>
                        <td>
                            <button class="btn btn-secondary rounded-circle"  data-bs-toggle="modal" data-bs-target="#editUserModal" onclick="loadUserToForm(${user.id})">
                                <i class="fa-regular fa-pen-to-square" style="color: #ffffff;"></i>
                            </button>
                            <button class="btn btn-danger rounded-circle" onclick="deleteUser(${user.id})">
                                <i class="fa-solid fa-trash" style="color: #ffffff;"></i>
                            </button>
                        </td>
                    </tr>`;

      tbody.append(row);
    }
  });
}
function loadAllUsers() {
  let tbody = $("#userTable tbody");
  tbody.empty();
  allUsers = loadUsersFromLocalStorage();
  console.log(allUsers);
  allUsers.forEach((user) => {
    const row = `<tr>
                        <td>${user.id}</td>
                        <td>${user.username}</td>
                        <td>${user.email}</td>
                        <td>${user.password}</td>
                        <td>${user.role}</td>
                        <td>
                            <button class="btn btn-secondary rounded-circle"  data-bs-toggle="modal" data-bs-target="#editUserModal" onclick="loadUserToForm(${user.id})">
                                <i class="fa-regular fa-pen-to-square" style="color: #ffffff;"></i>
                            </button>
                            <button class="btn btn-danger rounded-circle" onclick="deleteUser(${user.id})">
                                <i class="fa-solid fa-trash" style="color: #ffffff;"></i>
                            </button>
                        </td>
                    </tr>`;
    tbody.append(row);
  });
}

function createNewUser(name, email, pass, role) {
  if (validateNewUser()) {
    $("#errorMsg").addClass("d-none");
    let newId = createNewUserID();
    allUsers.push({
      id: newId,
      username: name,
      email: email,
      password: pass,
      role: role,
    });
    console.log(allUsers);

    // using sweet alert liberary to display successful message

    saveUsersInLocalStorage(allUsers);

    Swal.fire({
      position: "top",
      icon: "success",
      title: `You have created a new user `,
      showConfirmButton: false,
      timer: 1500,
    });
    // to dismiss my new user modal
    $("#addUserModal").modal("hide");
    displayUsersByPage(currentPage);
  } else {
    ShowErrorMessage();
  }
}
function createNewUserID() {
  if (allUsers.length > 0) {
    return allUsers[allUsers.length - 1].id + 1;
  } else {
    return 1;
  }
}
function validateNewUser() {
  let name = $("#name").val();
  let email = $("#email").val();

  if (name.trim() === "" || email.trim() === "") {
    ShowErrorMessage("Please enter both username and email.");
    return false;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    ShowErrorMessage("Please enter a valid email address.");
    return false;
  }

  const existingUser = allUsers.find(
    (user) => user.username === name || user.email === email
  );
  console.log(existingUser);
  if (existingUser) {
    ShowErrorMessage(
      "Username or email already exists. Please choose a different one."
    );
    return false;
  }

  // Add additional validation as needed

  return true; // If all validations pass
}
function ShowErrorMessage(message) {
  $("#errorMsg").removeClass("d-none");
  $("#errorMsg-text").text(message);
}

function saveUsersInLocalStorage(users) {
  let usersJSON = JSON.stringify(users);
  localStorage.setItem("users", usersJSON);
}
function loadUsersFromLocalStorage() {
  let myUsers = JSON.parse(localStorage.getItem("users"));
  return myUsers;
}

function loadUserToForm(id) {
  debugger;
  let myUser = allUsers.find((user) => user.id === id);
  console.log(myUser);
  if (myUser) {
    $("#edit-id").val(myUser.id);
    $("#edit-name").val(myUser.username);
    $("#edit-email").val(myUser.email);
    $("#edit-password").val(myUser.password);
    $("#edit-role").val(myUser.role);
  }
}
function validateForm() {
  // Reset previous error messages
  clearErrors();
  let isValidated = true;

  // Get form fields
  const name = $("#edit-name").val().trim();
  const email = $("#edit-email").val().trim();
  const password = $("#edit-password").val().trim();
  const role = $("#edit-role").val();

  if (name === "") {
    displayError("Name is required.", "edit-name");
    isValidated = false;
  }

  if (email === "") {
    displayError("Email is required.", "edit-email");
    isValidated = false;
  } else if (!isValidEmail(email)) {
    displayError("Invalid email format.", "edit-email");
    isValidated = false;
  }

  if (password === "") {
    displayError("Password is required.", "edit-password");
    isValidated = false;
  }

  if (role === "") {
    displayError("Role is required.", "edit-role");
    isValidated = false;
  }
  return isValidated;
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function displayError(message, elementId) {
  const errorDiv = $("<div>").addClass("alert text-danger").text(message).css({
    "font-size": "0.8em", // Adjust the font size as needed
    "margin-top": "0", // Remove top margin
    "margin-bottom": "0", // Remove bottom margin
  });

  const inputField = $(`#${elementId}`);
  inputField.addClass("is-invalid");

  // Find the parent container (e.g., a div with class 'input-group')
  const parentContainer = inputField.closest(".input-group");

  if (parentContainer.length) {
    // If there is a parent container, append the error message after it
    parentContainer.after(errorDiv);
  } else {
    // If no parent container found, append it after the input field
    inputField.after(errorDiv);
  }
}

function clearErrors() {
  $(".alert-danger").remove();
  $(".is-invalid").removeClass("is-invalid");
}

function updateUser(userId, name, email, password, role) {
  userId = Number(userId);

  // Find the user to update
  let myUser = allUsers.find((user) => user.id === userId);
  let emailExists = allUsers.some(
    (user) => user.email === email && user.id !== userId
  );
  if (emailExists) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Email Exist Before",
    });
    return;
  }
  if (myUser) {
    // Update user properties
    myUser.username = name;
    myUser.email = email;
    myUser.password = password;
    myUser.role = role;

    saveUsersInLocalStorage(allUsers);

    Swal.fire({
      position: "top",
      icon: "success",
      title: "User updated successfully",
      showConfirmButton: false,
      timer: 1500,
    });

    $("#editUserModal").modal("hide");

    displayUsersByPage(currentPage);
  } else {
    console.error("User not found for userId:", userId);
  }
}

function getOrdersFromLocalStorage() {
  let orders = localStorage.getItem("allOrders");
  if (orders) {
    return JSON.parse(orders);
  } else return [];
}
function getCartFromLocalStorage() {
  let orders = localStorage.getItem("orders");
  if (orders) {
    return JSON.parse(orders);
  } else return [];
}

function deleteUser(id) {
  // Check if this user has an order that is pending
  let allOrders = getOrdersFromLocalStorage();
  let myUser = allUsers.find((user) => user.id === id);

  if (myUser.role === "customer") {
    let _orders = getCartFromLocalStorage();
    let ordersExist = _orders.filter(
      (order) => order.userId === id && order.status === "pending"
    );

    if (ordersExist.length > 0) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "This user has pending orders.",
      });
      return;
    }
  }

  allUsers.forEach((user, index) => {
    if (user.id === id) {
      debugger;
      isDeleteConfirmed().then((confirmed) => {
        if (confirmed) {
          console.log(2);
          allUsers.splice(index, 1);
          saveUsersInLocalStorage(allUsers);
          displayUsersByPage(currentPage);
        }
      });
    }
  });
}
function isDeleteConfirmed() {
  return new Promise((resolve) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
        console.log(1);
        resolve(true);
      } else {
        resolve(false);
      }
    });
  });
}

function fetchDataFromJSONFile() {
  fetch("Data/obj.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      console.log(response.json());
      return response.json();
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}
