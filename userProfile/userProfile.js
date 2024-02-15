import * as valid from "../../userProfile/valid.js";
import * as valid2 from "../../order/valid.js";

var orders = JSON.parse(localStorage.getItem("orders")) || [];
var users = JSON.parse(localStorage.getItem("users")) || [];
var currentUser = JSON.parse(localStorage.getItem("currentUser")) || [];
var allOrders = JSON.parse(localStorage.getItem("allOrders")) || [];

$(document).ready(function () {
  valid2.notificationUpdate(orders);

  valid.createTableOrder(allOrders, currentUser);
  valid.getUserData(currentUser);

  document.getElementById("EditBtn").addEventListener("click", function () {
    if (
      valid.oldPass(currentUser) &&
      valid.matchPass() &&
      valid.samePass(currentUser)
    ) {
      valid.changePass(currentUser, users);

      //document.getElementById("EditPassModel").style.display = "none";
      //document.querySelector(".modal-backdrop.show").style.opacity="0"
      //document.querySelector(".modal-backdrop.show").modal("hide");
      window.location.href = "userProfile.html";
    }
  });
  valid2.notificationUpdate(orders);
  document.getElementById("change").addEventListener("click", function () {
    valid.clearModal();
  });

  $('#EditPassModel').on('hidden.bs.modal', function (e) {
    // Your custom action here
    document.getElementById("notification").style.display = "block";
    valid2.notificationUpdate(orders);
    console.log("jhg");
    
  })

  if (currentUser[0].role == "seller") {
    document.getElementById("sellerBtn").style.display = "";
  }
});
