/*===============Local Storage================*/
/*============================================*/
export function updateLocalStorage(arr) {
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

export function validateForm(num) {

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
        document.getElementById("titleSpan").innerText="more than 3 characters";
        document.getElementById("titleSpan").style.display="";
        //return false;  
    }else{
        document.getElementById("title").classList.remove("is-invalid");
        document.getElementById("titleSpan").style.display="none";
    }
    if (!istextvalid(authorName)) {
        document.getElementById("AuthorName").classList.toggle("is-invalid");
        isnotvalidForm=false;
        document.getElementById("AuthoreSpan").innerText="more than 3 characters";
        document.getElementById("AuthoreSpan").style.display="";

        //return false;
    }else{
        document.getElementById("AuthorName").classList.remove("is-invalid");
        document.getElementById("AuthoreSpan").style.display="none";

    }
    if (!isnumbervalid(numOfStock)) {
        document.getElementById("NumberOfStock").classList.add("is-invalid");
        isnotvalidForm=false;
        document.getElementById("NumStockSpan").innerText="just number";
        document.getElementById("NumStockSpan").style.display="";
       // return false;
    }else{
        document.getElementById("NumberOfStock").classList.remove("is-invalid");
        document.getElementById("NumStockSpan").style.display="none";
    }
    if (!isnumbervalid(price)) {
        document.getElementById("Price").classList.add("is-invalid");
        isnotvalidForm=false;
        document.getElementById("PriceSpan").innerText="only number";
        document.getElementById("PriceSpan").style.display="";
       // return false;
    }else{
        document.getElementById("Price").classList.remove("is-invalid");
        document.getElementById("PriceSpan").style.display="none";
    } if (!istextvalid(description)) {
        document.getElementById("Description").classList.add("is-invalid");
        isnotvalidForm=false;
        document.getElementById("DescriptionSpan").innerText="more than 3 characters";
        document.getElementById("DescriptionSpan").style.display="";
        //return false;
    }else{
        document.getElementById("Description").classList.remove("is-invalid");
        document.getElementById("DescriptionSpan").style.display="none";
    } if (!istextvalid(category)) {
        document.getElementById("Catogry").classList.add("is-invalid");
        isnotvalidForm=false;
        document.getElementById("CatogrySpan").innerText="please choose";
        document.getElementById("CatogrySpan").style.display="";
        //return false;
    }else{
        document.getElementById("Catogry").classList.remove("is-invalid");
        document.getElementById("CatogrySpan").style.display="none";
    }
    if(num==0){
        if (!isImgValid(bookImage)) {
            document.getElementById("BookImage").classList.add("is-invalid");
            isnotvalidForm=false;
            document.getElementById("ImgSpan").innerText="choose one";
            document.getElementById("ImgSpan").style.display="";
            //return false;
        }else{
            document.getElementById("BookImage").classList.remove("is-invalid");
            document.getElementById("ImgSpan").style.display="none";
        } 
    }
    
    return isnotvalidForm;
}
/*===============End Validation================*/

/*================Display=================*/
/*============================================*/
export function createTable(rowsPerPage,books) {
      //debugger;      
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
            createTd.innerText = book[property];

            createdTr.appendChild(createTd);
        });

        var creatTdAction = document.createElement("td");
        creatTdAction.innerHTML = `
            <div class='actionIcon'>
                <button class="btn btn-secondary rounded-circle btn"  id='editb'   data-bs-toggle='modal' data-bs-target='#ModelBook' onclick='Edit(${JSON.stringify(book)})'>
                    <i class="fa-regular fa-pen-to-square" style="color: #ffffff;"></i>
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
export function updateTable(rowsPerPage,books) {
    var tbody = document.querySelector("tbody");
    tbody.innerHTML = "";

    var prop = ["ID", "title", "author", "stockNum"];

    books.forEach(function (book) {
        var createdTr = document.createElement("tr");

        prop.forEach(function (property) {
            var createTd = document.createElement("td");
            createTd.innerText = book[property];

            createdTr.appendChild(createTd);
        });

        var creatTdAction = document.createElement("td");
        creatTdAction.innerHTML = `
            <div class='actionIcon'>
                <button class="btn btn-secondary rounded-circle btn" onclick='Edit(${JSON.stringify(book)})'>
                    <i class="fa-regular fa-pen-to-square" style="color: #ffffff;" data-bs-toggle='modal' data-bs-target='#ModelBook'></i>
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

    

    var currentUser = JSON.parse(localStorage.getItem("currentUser")) || [];

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
        "salerID": currentUser[0].id,
        "imgLink": "Resources/Images/books/" + bookImage,
        "stockNum": numOfStock
    };

    books.push(newBook);

    
    updateLocalStorage(books);
    createTable(rowsPerPage,books); 

    Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Your work has been saved",
        showConfirmButton: false,
        timer: 1500
    });

    $('#ModelBook').modal('hide');
}
export function clearModalInputs() {
    var form = document.querySelector('#ModelBook .needs-validation');
    const inputArr=document.querySelectorAll("input")
    form.classList.remove('was-validated');  
    inputArr.forEach((inp)=>{
        inp.classList.remove('is-invalid');
    })
    document.querySelector("select").classList.remove("is-invalid");
    document.querySelector("textarea").classList.remove("is-invalid");
  

    // Clear validation styles and messages
    

    $("#ModelBook span").hide();
    
}
/*===============End Add================*/

/*===============Edit================*/
/*============================================*/
export function EditV2 (books,rowsPerPage) {
   
    var id = Number(document.getElementById("idd").value);
    var title = document.getElementById("title").value;
    var authorName = document.getElementById("AuthorName").value;
    var numOfStock =Number( document.getElementById("NumberOfStock").value);
    var price =Number( document.getElementById("Price").value);
    var description = document.getElementById("Description").value;
    var category = document.getElementById("Catogry").value;
    var bookImage = document.getElementById("BookImage").value;

    var lastIndex = bookImage.lastIndexOf("\\");
    bookImage = bookImage.slice(lastIndex + 1);

    var book=findObjectById(books,id);
    book["title"] = title;
    book["author"] = authorName;
    book["stockNum"] = numOfStock;
    book["price"] = price;
    book["description"] = description;
    book["category"] = category;

    if (bookImage) {
        book["imgLink"] = "Resources/Images/books/" + bookImage;
    }

    var orders = JSON.parse(localStorage.getItem("orders")) || [];
            
    orders.forEach(function(order) {
        var itemIndex = order.items.findIndex(item => item.bookId === book["ID"]);
        console.log(itemIndex);
        if (itemIndex != -1) {
            order.items[itemIndex].name=title;
            order.items[itemIndex].price=price;
            order.items[itemIndex].imgLink=book["imgLink"];
            console.log(orders);
            localStorage.setItem("orders", JSON.stringify(orders));
        }
    });

    
    var wishList = JSON.parse(localStorage.getItem("wishlist")) || [];
            const wishListIndex = wishList.findIndex(wish => wish.bookid === book["ID"]);

            if (wishListIndex != -1) {
                wishList.title=title;
                wishList.price=price;
                 localStorage.setItem("wishlist", JSON.stringify(wishList));
            }

    updateLocalStorage(books);
    createTable(rowsPerPage,books); 
    $('#ModelBook').modal('hide');
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
export function Delete(obj, rowsPerPage, books) {
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
            const bookIndex = books.findIndex(book => book.ID === obj.ID);

            var orders = JSON.parse(localStorage.getItem("orders")) || [];
            
            orders.forEach(function(order) {
                var itemIndex = order.items.findIndex(item => item.bookId === obj.ID);
                console.log(itemIndex);
                if (itemIndex != -1) {
                    order.items.splice(itemIndex, 1);
                    console.log(orders);
                    localStorage.setItem("orders", JSON.stringify(orders));
                }
            });

            var wishList = JSON.parse(localStorage.getItem("wishlist")) || [];
            const wishListIndex = wishList.findIndex(wish => wish.bookid === obj.ID);

            if (wishListIndex !== -1) {
                wishList.splice(wishListIndex, 1);
                 localStorage.setItem("wishlist", JSON.stringify(wishList));
            }

            if (bookIndex !== -1) {
                books.splice(bookIndex, 1);
                updateLocalStorage(books);
                createTable(rowsPerPage, books);
                Swal.fire({
                    title: "Deleted!",
                    text: "Your book has been deleted.",
                    icon: "success"
                });
            } else {
                console.error("Book not found for deletion");
            }
        }
    });
}

/*===============End Delete================*/
export function findObjectById(array, id) {
    return array.find(item => item.ID === id);
}



 




