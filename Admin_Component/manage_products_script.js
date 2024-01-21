
let data=[];
fetch('../Data/books.json')
  .then(response => response.json())
  .then(data => {
    // Now you can use the 'data' variable with the loaded JSON data
    data =data;
  })
  .catch(error => console.error('Error loading JSON data:', error));

$(document).ready(function() {
    debugger
    window.navigateToPage = function(pageUrl) {
        window.location.href = pageUrl;
    }

    /*===============Local Storage================*/
    /*============================================*/


    if (!localStorage.getItem("books")) {
        var books = data.books;
        updateLocalStorage(books);

    } else if(localStorage.getItem("books")){
        var books = JSON.parse(localStorage.getItem("books"));

    }

    function updateLocalStorage(arr) {
        console.log(arr);
        localStorage.setItem("books", JSON.stringify(arr));
    }
/*===============End Local Storge================*/

/*================Display=================*/
/*============================================*/
var rowsPerPage = 6;

        function createTable() {
            
            var tbody = document.querySelector("tbody");
            tbody.innerHTML = "";

            var prop = ["ID", "title", "author", "stockNum"];

            var totalPages = Math.ceil(books.length / rowsPerPage);
            var currentPage = parseInt(new URLSearchParams(window.location.search).get("page")) || 1;

            
            var startIndex = (currentPage - 1) * rowsPerPage;
            var endIndex = startIndex + rowsPerPage;

            var booksForPage = books.slice(startIndex, endIndex);

            booksForPage.forEach(function (book) {
                var createdTr = document.createElement("tr");

                prop.forEach(function (property) {
                    var createTd = document.createElement("td");

                    if (property === "stockNum") {
                        var stockValue = book[property];
                        var widthPercentage = Math.min((stockValue / 10) * 100, 100);
                        createTd.innerHTML = `<div class="progress">
                            <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuemin="0" aria-valuemax="100" style="width: ${widthPercentage}%"> ${widthPercentage}%</div>
                            </div>`;
                    } else {
                        createTd.innerText = book[property];
                    }

                    createdTr.appendChild(createTd);
                });

                var creatTdAction = document.createElement("td");
                creatTdAction.innerHTML = `
                    <div class='actionIcon'>
                        <button class="btn btn-secondary rounded-circle btn" onclick='Edit(${JSON.stringify(book)})'>
                            <i class="fa-regular fa-pen-to-square" style="color: #ffffff;" data-bs-toggle='modal' data-bs-target='#EditBook'></i>
                        </button>
                        <button class="btn btn-danger rounded-circle btn" onclick='Delete(${JSON.stringify(book)})'>
                            <i class="fa-solid fa-trash" style="color: #ffffff;"></i>
                        </button>
                        <button class="btn btn-info rounded-circle btn" onclick='Info(${JSON.stringify(book)})' data-bs-toggle="modal" data-bs-target="#Info">
                            <i class="fa-solid fa-circle-info" style="color: #ffffff;"></i>                         
                        </button>
                    </div>`;

                createdTr.appendChild(creatTdAction);
                tbody.appendChild(createdTr);
            });

            var pagination = document.querySelector(".pagination");
            pagination.innerHTML = "";

            for (var i = 1; i <= totalPages; i++) {
                var li = document.createElement("li");
                li.className = "page-item" + (i === currentPage ? " active" : "");
                li.innerHTML = `<a class="page-link" href="?page=${i}">${i}</a>`;
                pagination.appendChild(li);
            }
 }

        createTable();

/*===============End Display================*/

/*===============Validation================*/
/*============================================*/
function istextvalid(val) {
    return val != null && val.trim() != "" && /^[a-zA-Z\s]*$/.test(val.trim()) && val.length>=3;
}

function isnumbervalid(val) {
    return val != null && val.trim() != "" && /^[0-9]+$/.test(val);
}
function isImgValid(val){
    return val != null && val.trim() != "" ;
}

function validateForm() {

    var title = document.getElementById("title").value;
    var authorName = document.getElementById("AuthorName").value;
    var numOfStock =document.getElementById("NumberOfStock").value;
    var price =document.getElementById("Price").value;
    var description = document.getElementById("Description").value;
    var category = document.getElementById("Catogry").value;
    var bookImage = document.getElementById("BookImage").value;

    let isnotvalidForm=true;
    
    if (!istextvalid(title)) {
        document.getElementById("title").classList.toggle("is-invalid");
        isnotvalidForm=false;
        //return false;  
    }else{
        document.getElementById("title").classList.remove("is-invalid");
    }
    if (!istextvalid(authorName)) {
        document.getElementById("AuthorName").classList.toggle("is-invalid");
        isnotvalidForm=false;
        //return false;
    }else{
        document.getElementById("AuthorName").classList.remove("is-invalid");
    }
    if (!isnumbervalid(numOfStock)) {
        document.getElementById("NumberOfStock").classList.add("is-invalid");
        isnotvalidForm=false;
       // return false;
    }else{
        document.getElementById("NumberOfStock").classList.remove("is-invalid");
    }
    if (!isnumbervalid(price)) {
        document.getElementById("Price").classList.add("is-invalid");
        isnotvalidForm=false;
       // return false;
    }else{
        document.getElementById("Price").classList.remove("is-invalid");
    } if (!istextvalid(description)) {
        document.getElementById("Description").classList.add("is-invalid");
        isnotvalidForm=false;
        //return false;
    }else{
        document.getElementById("Description").classList.remove("is-invalid");
    } if (!istextvalid(category)) {
        document.getElementById("Catogry").classList.add("is-invalid");
        isnotvalidForm=false;
        //return false;
    }else{
        document.getElementById("Catogry").classList.remove("is-invalid");
    } if (!isImgValid(bookImage)) {
        document.getElementById("BookImage").classList.add("is-invalid");
        isnotvalidForm=false;
        //return false;
    }else{
        document.getElementById("BookImage").classList.remove("is-invalid");
    } 
    return isnotvalidForm;
}

function validateFormEdit() {
    

    var title = document.getElementById("titleEdit").value;
    var authorName = document.getElementById("AuthorNameEdit").value;
    var numOfStock =document.getElementById("NumberOfStockEdit").value;
    var price =document.getElementById("PriceEdit").value;
    var description = document.getElementById("DescriptionEdit").value;
    var category = document.getElementById("CatogryEdit").value;

    let isnotvalidForm=true;
    if (!istextvalid(title)) {
        document.getElementById("titleEdit").classList.add("is-invalid");
        isnotvalidForm=false;
        //return false;
    }
    else{
        document.getElementById("titleEdit").classList.remove("is-invalid");
    }
    if (!istextvalid(authorName)) {
        document.getElementById("AuthorNameEdit").classList.add("is-invalid");
        isnotvalidForm=false;
        //return false;
    }else{
        document.getElementById("AuthorNameEdit").classList.remove("is-invalid");
    }
    if (!isnumbervalid(numOfStock)) {
        document.getElementById("NumberOfStockEdit").classList.add("is-invalid");
        isnotvalidForm=false;
      //return false; 
    }else{
        document.getElementById("NumberOfStockEdit").classList.remove("is-invalid");
    }if (!isnumbervalid(price)) {
        document.getElementById("PriceEdit").classList.add("is-invalid");
        isnotvalidForm=false;
        //return false;
    } else{
        document.getElementById("PriceEdit").classList.remove("is-invalid");
    }if (!istextvalid(description)) {
        document.getElementById("DescriptionEdit").classList.add("is-invalid");
        isnotvalidForm=false;
        //return false;
    }else{
        document.getElementById("DescriptionEdit").classList.remove("is-invalid");
    } if (!istextvalid(category)) {
        document.getElementById("CatogryEdit").classList.add("is-invalid");
        isnotvalidForm=false;
        //return false;
    }else{
        document.getElementById("CatogryEdit").classList.remove("is-invalid");
    }
    return isnotvalidForm;
}
/*===============End Validation================*/

/*===============Add================*/
/*============================================*/

function Add() {
    var title = document.getElementById("title").value;
    var authorName = document.getElementById("AuthorName").value;
    var numOfStock = document.getElementById("NumberOfStock").value;
    var price = document.getElementById("Price").value;
    var description = document.getElementById("Description").value;
    var category = document.getElementById("Catogry").value;
    var bookImage = document.getElementById("BookImage").value;

    var lastIndex = bookImage.lastIndexOf("\\");
    bookImage = bookImage.slice(lastIndex + 1);

    var lastID = Math.max(...books.map(book => book.ID), 0);

    var newBook = {
        "ID": lastID + 1,
        "title": title,
        "author": authorName,
        "description": description,
        "price": price,
        "category": category,
        "salerID": "11",
        "imgLink": "Resources/Images/books/" + bookImage,
        "stockNum": numOfStock
    };

    books.push(newBook);

    clearModalInputs();
    updateLocalStorage(books);
    createTable();

    Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Your work has been saved",
        showConfirmButton: false,
        timer: 1500
    });

    $('#AddBook').modal('hide');
}
var form = document.querySelector('.needs-validation');
var submitBtn = document.getElementById('addBookBtn');
submitBtn.addEventListener('click', function (event) {
    if (validateForm()) {
        Add();
    }
    })
/*===============End Add================*/


/*===============Edit================*/
/*============================================*/
window.EditV2 = function (obj) {
    var id = Number(document.getElementById("idd").value);
    var title = document.getElementById("titleEdit").value;
    var authorName = document.getElementById("AuthorNameEdit").value;
    var numOfStock = document.getElementById("NumberOfStockEdit").value;
    var price = document.getElementById("PriceEdit").value;
    var description = document.getElementById("DescriptionEdit").value;
    var category = document.getElementById("CatogryEdit").value;
    var bookImage = document.getElementById("BookImageEdit").value;

    var lastIndex = bookImage.lastIndexOf("\\");
    bookImage = bookImage.slice(lastIndex + 1);

    for (let i = 0; i < books.length; i++) {
        if (id === books[i]["ID"]) {
            books[i]["title"] = title;
            books[i]["author"] = authorName;
            books[i]["stockNum"] = numOfStock;
            books[i]["price"] = price;
            books[i]["description"] = description;
            books[i]["category"] = category;

            if (bookImage) {
                books[i]["imgLink"] = "Resources/Images/books/" + bookImage;
            }
        }
    }

    updateLocalStorage(books);
    createTable(); 
    $('#EditBook').modal('hide');
};


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
    if (!validateFormEdit()) {
        event.stopPropagation();
    } else {
        EditV2();
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
        createTable();
    }
});

function updateTable(books) {
    var tbody = document.querySelector("tbody");
    tbody.innerHTML = "";

    var prop = ["ID", "title", "author", "stockNum"];

    books.forEach(function (book) {
        var createdTr = document.createElement("tr");

        prop.forEach(function (property) {
            var createTd = document.createElement("td");

            if (property === "stockNum") {
                var stockValue = book[property];
                var widthPercentage = Math.min((stockValue / 10) * 100, 100);
                createTd.innerHTML = `<div class="progress">
                    <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuemin="0" aria-valuemax="100" style="width: ${widthPercentage}%"> ${widthPercentage}%</div>
                    </div>`;
            } else {
                createTd.innerText = book[property];
            }

            createdTr.appendChild(createTd);
        });

        var creatTdAction = document.createElement("td");
        creatTdAction.innerHTML = `
            <div class='actionIcon'>
                <button class="btn btn-secondary rounded-circle btn" onclick='Edit(${JSON.stringify(book)})'>
                    <i class="fa-regular fa-pen-to-square" style="color: #ffffff;" data-bs-toggle='modal' data-bs-target='#EditBook'></i>
                </button>
                <button class="btn btn-danger rounded-circle btn" onclick='Delete(${JSON.stringify(book)})'>
                    <i class="fa-solid fa-trash" style="color: #ffffff;"></i>
                </button>
                <button class="btn btn-info rounded-circle btn" onclick='Info(${JSON.stringify(book)})' data-bs-toggle="modal" data-bs-target="#Info">
                    <i class="fa-solid fa-circle-info" style="color: #ffffff;"></i>                         
                </button>
            </div>`;

        createdTr.appendChild(creatTdAction);
        tbody.appendChild(createdTr);
    });
}

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
        sortAscending(prop);
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
        sortDescending(prop);
    }
});

function sortAscending(prop) {
    books.sort(function (a, b) {
        if (a[prop] < b[prop]) return -1;
        if (a[prop] > b[prop]) return 1;
        return 0;
    });
    updateLocalStorage(books);
    createTable();  
}

function sortDescending(prop) {
    books.sort(function (a, b) {
        if (a[prop] > b[prop]) return -1;
        if (a[prop] < b[prop]) return 1;
        return 0;
    });
    updateLocalStorage(books);
    createTable();  
}

/*===============End Sort================*/


/*===============Delete================*/
window.Delete=function (obj) {
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to delete this book!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes"
    }).then((result) => {
        if (result.isConfirmed) {
            for (var i = 0; i < books.length; i++) {
                if (obj["ID"] == books[i]["ID"]) {
                    books.splice(i, 1); 
                    
                    updateLocalStorage(books);
                    createTable(); 
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your book has been deleted.",
                        icon: "success"
                    });
                    break; 
                }
                createTable();
            }
        }
    });
}

/*===============End Delete================*/


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
   
/*===============Clear Input================*/
document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
        clearModalInputs();
    }
});

$('#AddBook').on('hidden.bs.modal', function () {
    clearModalInputs();
});
function clearModalInputs() {
    var inputFields = document.querySelectorAll('input');
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
    // Clear validation styles and messages
    var form = document.querySelector('.needs-validation');
    form.classList.remove('was-validated');
    
}

/*===============End Clear Input================*/  
});
