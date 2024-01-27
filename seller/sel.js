import data from "../../Data/books.json" assert { type: 'json' };
import * as valid from './valid.js';

$(document).ready(function() {
//    debugger
    window.navigateToPage = function(pageUrl) {
        window.location.href = pageUrl;
    }
/*===============Local Storage================*/
/*============================================*/

if (!localStorage.getItem("books")) {
    var books = data.books;
    valid.updateLocalStorage(books);
} else {
    var books = JSON.parse(localStorage.getItem("books")) || [];
}

var currentUser = JSON.parse(localStorage.getItem("currentUser")) || {};
 books = books.filter(book => book["salerID"] === currentUser[0].id);


/*===============End Local Storge================*/
//=====================log out=======================///
    const logout=document.getElementById("logout");
    logout.addEventListener('click',function(){
        localStorage.removeItem("currentUser");
        localStorage.setItem("userSignedUp",'false')
        window.history.replaceState({},"","login.html");
        window.location.href="login.html";
    })



//=====================end of log out================////
/*================Display=================*/
/*============================================*/
var rowsPerPage = 6;
valid.createTable(rowsPerPage,books);
/*===============End Display================*/

/*===============Add================*/
/*============================================*/
var form = document.querySelector('.needs-validation');
var submitBtn = document.getElementById('addBookBtn');
submitBtn.addEventListener('click', function (event) {

    var addBtnn = document.getElementById("addBookBtn");
    addBtnn.style.display = "block";

    var editBtn = document.getElementById("EditBookBtn");
    editBtn.style.display = "none";

    if (valid.validateForm(0)) {
        valid.Add(books,rowsPerPage);
    }
    })
/*===============End Add================*/


/*===============Edit================*/
/*============================================*/

 window.Edit=function(obj){
    //debugger;
if(obj){
    var form = document.querySelector('.needs-validation');
    form.classList.remove('was-validated');
    
    document.getElementById("BookImage").value=null;
    document.getElementById("title").value=obj["title"];
    document.getElementById("AuthorName").value=obj["author"];
    document.getElementById("NumberOfStock").value=obj["stockNum"];
    document.getElementById("Price").value=obj["price"];
    document.getElementById("Description").value=obj["description"];
    document.getElementById("Catogry").value=obj["category"];
    document.getElementById("idd").value=obj["ID"];
}
    
 }

 var submitBtnEdit = document.getElementById('EditBookBtn');
 submitBtnEdit.addEventListener('click', function (event) {
    event.preventDefault(); 

    if (!valid.validateForm(1)) {
        event.stopPropagation();
    } else {
        valid.EditV2(books,rowsPerPage);
        form.classList.add('was-validated');
    }
    
});

document.getElementById("addb").addEventListener("click",function(){
    valid.clearModalInputs(); 

        //clear all field of form

    inputFields.forEach(function (input) {
    input.value = "";
    });


    var textareas = document.getElementsByTagName('textarea');
    for (var i = 0; i < textareas.length; i++) {
        textareas[i].value = "";
    }
    
    var selects = document.getElementsByTagName('select');
    for (var i = 0; i < selects.length; i++) {
        selects[i].selectedIndex = 0;
    }

    //end of clear
    var addBtnn = document.getElementById("addBookBtn");
    addBtnn.style.display = "";

    var editBtn = document.getElementById("EditBookBtn");
    editBtn.style.display = "none";
})
document.getElementById("editb").addEventListener("click",function(){
    valid.clearModalInputs(); 
    var addBtnn = document.getElementById("addBookBtn");
    addBtnn.style.display = "none";

    var editBtn = document.getElementById("EditBookBtn");
    editBtn.style.display = "";
})


/*===============End Edit================*/


/*===============Search================*/
/*============================================*/
document.getElementById("searchInput").addEventListener("input", function (event) {
    var searchValue = this.value.trim().toUpperCase();
        var storedBooks =books;

    var filteredBooks = storedBooks.filter(function (book) {
        return (
            String(book.ID).startsWith(searchValue) ||
            book.title.toUpperCase().startsWith(searchValue)
        );
    });
    
    valid.updateTable(rowsPerPage,filteredBooks);

    if (event.inputType === "deleteContentBackward" && searchValue === "") {
        valid.createTable(rowsPerPage,books); 
    }   
});

/*===============End Search================*/

/*===============Sort================*/
/*============================================*/
document.getElementsByTagName("thead")[0].addEventListener("click", function (e) {
    if (e.target.nodeName == "TH") {
        var prop = e.target.innerText;
        console.log(prop);
        if(e.target.innerText=="Title")
            prop="title";
        else if(e.target.innerText=="Author")
            prop="author";
        else if(e.target.innerText=="Mount Available")
            prop="stockNum";
        valid.sortAscending(prop,books,rowsPerPage);
    }
});

document.getElementsByTagName("thead")[0].addEventListener("dblclick", function (e) {
    if (e.target.nodeName == "TH") {
        var prop = e.target.innerText;
        console.log(prop);
        if(e.target.innerText=="Title")
            prop="title";
        else if(e.target.innerText=="Author")
            prop="author";
        else if(e.target.innerText=="Mount Available")
            prop="stockNum";
        valid.sortDescending(prop,books,rowsPerPage);
    }
});
/*===============End Sort================*/

/*===============Info================*/
/*============================================*/


window.Info=function(obj){
    var img=document.createElement("img");
    img.setAttribute("src",obj["imgLink"]);
    img.setAttribute("width","100%");
    img.setAttribute("height","100%");
    document.getElementById("ImgInfo").innerHTML="";
    document.getElementById("ImgInfo").appendChild(img);

    document.getElementById("staticBackdropLabel").innerHTML="";
    document.getElementById("staticBackdropLabel").innerText=obj["title"]; 

    document.getElementById("authorInfo").innerHTML="";
    document.getElementById("authorInfo").innerText="By "+obj["author"];

    document.getElementById("catagoryInfo").innerHTML="";
    document.getElementById("catagoryInfo").innerText="Category "+obj["category"];

    document.getElementById("descriptionInfo").innerHTML="";
    document.getElementById("descriptionInfo").innerText=obj["description"];

    document.getElementById("priceInfo").innerHTML="";
    document.getElementById("priceInfo").innerText=obj["price"]+" $";
 
} 
    function findObjectById(array, id) {
        return array.find(item => item.ID === id);
    }
/*===============End Info================*/
   
/*===============Clear Input================*/
/*============================================*/
document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
        valid.clearModalInputs();
    }
});

$('#ModelBook').on('hidden.bs.modal', function () {
    valid.clearModalInputs();
});
/*===============End Clear Input================*/  

/*===============Delete================*/
window.Delete=function(obj){
    valid.Delete(obj,rowsPerPage,books);
}
/*===============End Delete================*/

});

