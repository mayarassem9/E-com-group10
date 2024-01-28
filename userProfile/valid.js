/*===============User Profile================*/

export function createTableOrder(orders,currentUser){

    var order= getUserOrder(orders,currentUser)||[];
    var items =order.items || [];
    console.log(items);

    var tableBody=document.getElementsByTagName("tbody")[0];

    items.forEach(function(item){

        console.log(item);
        var newRow = document.createElement('tr');

    var data = [item.name, item.quantity, item.price*item.quantity+" $",order.status];
    for (var i = 0; i < 4; i++) {
        var newCell = document.createElement('td');
        newCell.textContent = data[i];
        newRow.appendChild(newCell);
    }
    tableBody.appendChild(newRow);

    })
}

export function getUserOrder(orders,currentUser){

    var foundOrder = null;

        orders.forEach(function(order) {
            console.log(order ,currentUser[0].id);
            if (order.userId === currentUser[0].id) {
                foundOrder = order;
            }
        });

        return foundOrder;

}

export function getUserData(currentUser){

    document.getElementById("nameText").innerText=currentUser[0].username;
    document.getElementById("emailText").innerText=currentUser[0].email;
    document.getElementById("roleText").innerText=currentUser[0].role;

}


export function changePass(currentUser,users){

    var foundUser=users.find(user => user.id === currentUser[0].id);
    console.log(foundUser.password,currentUser[0].password)
    currentUser[0].password=document.getElementById("newPassword").value;
    foundUser.password=document.getElementById("newPassword").value;
 
    updateLocalStorage("users",users);
    updateLocalStorage("currentUser",currentUser);

    clearModal();
 }
 
export function oldPass(currentUser){
     var oldPassword= document.getElementById("oldPassword").value;
     console.log(oldPassword);
 
     if(currentUser[0].password==oldPassword)
         return true
     else{
         var span=document.getElementById("oldPasswordSpan");
         span.style.display="";
         span.innerText="The password is incorrect";
     }
 
 }
 
 export function matchPass(){
 
     var newPass=document.getElementById("newPassword").value;
     var confirmPass=document.getElementById("ConfirmPassword").value;
 
     if(newPass != null &&newPass.trim()!=""&& newPass.length>8&&newPass.length<=20){
 
         if(newPass==confirmPass){
             return true;
         }else{
             var span=document.getElementById("confirmPasswordSpan");
             span.style.display="";
             span.innerText="The new password dose not match";
             return false;
         }
 
     }
     else{
         var span=document.getElementById("newPasswordSpan");
         span.style.display="";
         span.innerText="not valid password";
         return false;   
     }
 }
 
 export function updateLocalStorage(nameLocalStorge,arr) {
     localStorage.setItem(nameLocalStorge, JSON.stringify(arr));
 }
 export function clearModal(){
     var inputFields = document.querySelectorAll('input');
     inputFields.forEach(function (input) {
     input.value = "";
     });
 
 
     $("span").hide();
 }
 
 




  /*===============End User Profile================*/