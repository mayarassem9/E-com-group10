import data from "../../Data/books.json" assert { type: 'json' };
import * as valid from './valid.js';

$(document).ready(function() {
    debugger
    window.navigateToPage = function(pageUrl) {
        window.location.href = pageUrl;
    }
/*===============Local Storage================*/
/*============================================*/

    if (!localStorage.getItem("books")) {
        var books = data.books;
        valid.updateLocalStorage(books);

    } else if(localStorage.getItem("books")){
        var books = JSON.parse(localStorage.getItem("books"));

    }  
/*===============End Local Storge================*/

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
    if (valid.validateForm()) {
        valid.Add(books,rowsPerPage);
    }
    })
/*===============End Add================*/


/*===============Edit================*/
/*============================================*/
 window.Edit=function(obj){
    
    document.getElementById("BookImageEdit").value=null;
    document.getElementById("titleEdit").value=obj["title"];
    document.getElementById("AuthorNameEdit").value=obj["author"];
    document.getElementById("NumberOfStockEdit").value=obj["stockNum"];
    document.getElementById("PriceEdit").value=obj["price"];
    document.getElementById("DescriptionEdit").value=obj["description"];
    document.getElementById("CatogryEdit").value=obj["category"];
    document.getElementById("idd").value=obj["ID"]; 
 }

 var submitBtnEdit = document.getElementById('EditBookBtn');
 submitBtnEdit.addEventListener('click', function (event) {
    event.preventDefault(); 
    if (!valid.validateFormEdit()) {
        event.stopPropagation();
    } else {
        valid.EditV2(books,rowsPerPage);
        form.classList.add('was-validated');
    }
    
});
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
    
    updateTable(filteredBooks);

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

$('#AddBook').on('hidden.bs.modal', function () {
    valid.clearModalInputs();
});
/*===============End Clear Input================*/  

/*===============Delete================*/
window.Delete=function(obj){
    valid.Delete(obj,rowsPerPage,books);
}
/*===============End Delete================*/

});

