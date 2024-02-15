class User {
  constructor(id, username, email, password, role) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.password = password;
    this.role = role;
  }
}

let searchTerm = "";
let pendingSellers;
const usersPerPage = 5;
let currentPage = 1;

$(document).ready(function () {
  // make the current tab active
  links[4].parentElement.classList.add("active");
  pendingSellers = loadPendingSellersFromLocalStorage();
  displaySellers();
  updatePagination();
  displayUsersByPage(currentPage);

  $("#prevPage").click(function () {
    if (currentPage > 1) {
      currentPage--;
      displayUsersByPage(currentPage);
    }
  });

  $("#nextPage").click(function () {
    const totalPages = Math.ceil(pendingSellers.length / usersPerPage);
    if (currentPage < totalPages) {
      currentPage++;
      displayUsersByPage(currentPage);
    }
  });

  $('input[type="search"]').on("input", function () {
    searchTerm = $(this).val().toLowerCase();
    console.log(searchTerm);
    searchAndDisplayUsers(searchTerm);
  });
});

function updatePagination() {
  debugger;
  const totalPages = Math.ceil(pendingSellers.length / usersPerPage);
  let paginationHtml = "";

  for (let i = 1; i <= totalPages; i++) {
    const activeClass = i === currentPage ? "active" : "";
    paginationHtml += `<li class="page-item ${activeClass}">
            <a class="page-link" href="#" onclick="displayUsersByPage(${i})">${i}</a>
        </li>`;
  }
  $(".pagination-numbers").html(paginationHtml);
}

function searchAndDisplayUsers(searchTerm) {
  const filteredSellers = pendingSellers.filter(
    (user) =>
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );
  console.log(filteredSellers);
  displaySellers(filteredSellers);
}

function displayUsersByPage(page) {
  currentPage = page;
  const startIndex = (page - 1) * usersPerPage;
  const endIndex = startIndex + usersPerPage;
  const usersToShow = pendingSellers.slice(startIndex, endIndex);
  displaySellers(usersToShow);
}

function displaySellers(users = pendingSellers) {
  const tbody = $("#userTable tbody");
  tbody.empty();
  if (users.length === 0) {
    const noDataFoundRow = `<tr><td colspan="6" class="text-danger text-center"> No Users Found !</td></tr>`;
    tbody.append(noDataFoundRow);
    updatePagination();
  }
  users.forEach((user) => {
    const row = `<tr>
                        <td>${user.id}</td>
                        <td>${user.username}</td>
                        <td>${user.email}</td>
                        <td>${user.password}</td>
                        <td>
                            <button class="btn btn-success rounded-circle"   onclick="approveSeller(${user.id})">
                                <i class="fa-solid fa-user-check"></i>
                            </button>
                        </td>
                    </tr>`;
    tbody.append(row);
  });
  updatePagination();
}

function approveSeller(id) {
  debugger;
  let sellers = loadPendingSellersFromLocalStorage();
  let approvedSeller_ = sellers.find((seller) => seller.id === id);
  if (approvedSeller_) {
    saveUserToLocalStorage(approvedSeller_);
  }
}

function loadPendingSellersFromLocalStorage() {
  const sellers = localStorage.getItem("approved");
  return sellers ? JSON.parse(sellers) : [];
}

function removePendingSellerFromLocalStorage(id) {
  const sellers = loadPendingSellersFromLocalStorage();
  const updatedSellers = sellers.filter((seller) => seller.id !== id);
  localStorage.setItem("approved", JSON.stringify(updatedSellers));
}

function saveUserToLocalStorage(user) {
  let users = JSON.parse(localStorage.getItem("users")) || [];
  const newSeller = new User(
    createNewUserID(users),
    user.username,
    user.email,
    user.password,
    user.role
  );
  users.push(newSeller);
  localStorage.setItem("users", JSON.stringify(users));
  removePendingSellerFromLocalStorage(newSeller.id);

  Swal.fire({
    position: "top",
    icon: "success",
    title: `This seller has been Approved! `,
    showConfirmButton: false,
    timer: 1500,
  });
  displaySellers();
}

function createNewUserID(users) {
  return users.length > 0 ? users[users.length - 1].id + 1 : 1;
}
