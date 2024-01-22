/*===============Local Storage================*/
/*============================================*/
export function updateLocalStorage(arr) {
    console.log(arr);
    localStorage.setItem("books", JSON.stringify(arr));
}
/*===============End Local Storge================*/

/*===============Validation================*/
/*============================================*/
export function istextvalid(val) {
    return val != null && val.trim() != "" && /^[a-zA-Z\s]*$/.test(val.trim()) && val.length>=3;
}
export function isnumbervalid(val) {
    return val != null && val.trim() != "" && /^[0-9]+$/.test(val);
}
export function isImgValid(val){
    return val != null && val.trim() != "" ;
}
export function validateFormEdit() {
    

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
export function validateForm() {

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
/*===============End Validation================*/

/*================Display=================*/
/*============================================*/
export function createTable(rowsPerPage,books) {
            
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
export function updateTable(books) {
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
                <button class="btn btn-danger rounded-circle btn " onclick='Delete(${JSON.stringify(book)},${books},${rowsPerPage}) >
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
/*===============End Display================*/

/*===============Add================*/
/*============================================*/
export function Add(books,rowsPerPage) {
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
    createTable(rowsPerPage,books); 

    Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Your work has been saved",
        showConfirmButton: false,
        timer: 1500
    });

    $('#AddBook').modal('hide');
}
export function clearModalInputs() {
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
/*===============End Add================*/

/*===============Edit================*/
/*============================================*/
export function EditV2 (books,rowsPerPage) {
   
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
    createTable(rowsPerPage,books);  
    $('#EditBook').modal('hide');
};
/*===============End Edit================*/

/*===============Sort================*/
/*============================================*/
export function sortAscending(prop,books,rowsPerPage) {
    books.sort(function (a, b) {
        if (a[prop] < b[prop]) return -1;
        if (a[prop] > b[prop]) return 1;
        return 0;
    });
    updateLocalStorage(books);
    createTable(rowsPerPage,books);   
}
export function sortDescending(prop,books,rowsPerPage) {
    books.sort(function (a, b) {
        if (a[prop] > b[prop]) return -1;
        if (a[prop] < b[prop]) return 1;
        return 0;
    });
    updateLocalStorage(books);
    createTable(rowsPerPage,books);  
}
/*===============End Sort================*/

/*===============Delete================*/
export function Delete(obj,rowsPerPage,books) {
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
                    createTable(rowsPerPage,books); 
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your book has been deleted.",
                        icon: "success"
                    });
                    break; 
                }
                createTable(rowsPerPage,books);
            }
        }
    });
}
/*===============End Delete================*/
