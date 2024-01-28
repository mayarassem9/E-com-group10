const logout = document.getElementById("logout");
const signup = document.getElementById("signup");
const login = document.getElementById("login");
const myaccount = document.getElementById("myaccount");
document.addEventListener("DOMContentLoaded", function () {
  // Check if the user has signed up or logined
  const userSignedUp = localStorage.getItem("userSignedUp");

  if (userSignedUp === "true") {
    // Hide the "Sign Up" and "Login" elements
    signup.style.display = "none";
    login.style.display = "none";
  } else {
    signup.style.display = "";
    login.style.display = "";
    logout.style.display = "none";
    myaccount.style.display = "none";
  }
});
logout.addEventListener("click", function () {
  localStorage.setItem("userSignedUp", "false");
  localStorage.removeItem("currentUser");
  window.location.href = "login.html";
});
