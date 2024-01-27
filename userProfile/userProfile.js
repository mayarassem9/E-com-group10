import * as valid from '../../userProfile/valid.js';
import * as valid2 from '../../order/valid.js';

var orders =  JSON.parse(localStorage.getItem("orders")) || [];
var users = JSON.parse(localStorage.getItem("users")) || [];
var currentUser=JSON.parse(localStorage.getItem("currentUser")) || [];



$(document).ready(function(){

    valid2.notificationUpdate(orders);

    valid.createTableOrder(orders,currentUser);
    valid.getUserData(currentUser);

    document.getElementById("EditBtn").addEventListener("click",function(){
        if(valid.oldPass(currentUser)&&valid.matchPass()){
            valid.changePass(currentUser,users);  
            
            document.getElementById("EditPassModel").style.display="none";
            document.querySelector(".modal-backdrop.show").style.opacity="0"
        }
        
    })

    document.getElementById("change").addEventListener("click",function(){
        valid.clearModal();
    })
    

    if(currentUser[0].role=="seller"){
        document.getElementById("sellerBtn").style.display="";
    }
    
});



