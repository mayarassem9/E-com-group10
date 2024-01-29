const logout = document.getElementById("logout");
const signup = document.getElementById("signup");
const login = document.getElementById("login");
const myaccount = document.getElementById("myaccount");
const sellerdash = document.getElementById("sellerdashborad");
const admindash = document.getElementById("admindashboard");

document.addEventListener("DOMContentLoaded", function () {
  // Check if the user has signed up or logined
  const userSignedUp = localStorage.getItem("userSignedUp");

  if (userSignedUp === "true") {
    // Hide the "Sign Up" and "Login" elements
    signup.style.display = "none";
    login.style.display = "none";
  } else {
    signup.style.display = "block";
    login.style.display = "block";
    logout.style.display = "none";
    myaccount.style.display = "none";
  }
  dashboard();
});
logout.addEventListener("click", function () {
  localStorage.setItem("userSignedUp", "false");
  localStorage.removeItem("currentUser");
  window.location.href = "login.html";
});
function dashboard() {
  admindash.style.display = "none";
  sellerdash.style.display = "none";
  let currentuser = localStorage.getItem("currentUser");
  currentuser = currentuser ? JSON.parse(currentuser) : false;
  seller = currentuser.some((currentuser) => currentuser.role === "seller");
  admin = currentuser.some((currentuser) => currentuser.role === "admin");
  if (currentuser && seller) {
    sellerdash.style.display = "block";
    admindash.style.display = "none";
  } else if (currentuser && admin) {
    admindash.style.display = "block";
    sellerdash.style.display = "none";
  }
}
