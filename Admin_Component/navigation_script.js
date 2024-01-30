let links = document.querySelectorAll(".sidebar-nav a");
const currentTab = 0;
links.forEach(function (link) {
  link.addEventListener("click", activateTab);
});

// this is the toggle collapse script
const $button = document.querySelector("#sidebar-toggle");
const $wrapper = document.querySelector("#wrapper");

$button.addEventListener("click", (e) => {
  e.preventDefault();
  $wrapper.classList.toggle("toggled");
});
function activateTab(event) {
  links.forEach(function (l) {
    l.parentElement.classList.remove("active");
  });

  event.currentTarget.parentElement.classList.add("active");

  currentTab = parseInt(event.currentTarget.getAttribute("data-tab"));
  console.log(currentTab);

  window.location.href = event.currentTarget.getAttribute("href");
}

$("document").ready(function () {
  isAdminAuthenticated();
});

function isAdminAuthenticated() {
  debugger;
  let currentUser = localStorage.getItem("currentUser");
  if (currentUser) {
    let _currentUser = JSON.parse(currentUser);
    if (_currentUser[0].role !== "admin") {
      window.location.href = "../login.html";
    }
  } else {
    window.location.href = "../login.html";
  }
}
function logoutAdmin() {
  localStorage.removeItem("currentUser");
}
