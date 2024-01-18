const users =  [ {id: 1, username: "customer1",email:"customer1@gmail.com", password: "password123", role: "customer"},
                 {id: 2, username: "seller1",email:"seller1@gmail.com", password: "sellerpass", role: "seller"},
                 {id: 3, username: "admin1",email:"admin1@gmail.com",password: "adminpass",role: "admin"}
               ];
let allUsers=[];

$(document).ready(function (){
    //saveUsersInLocalStorage(users) 

    loadUsersFromLocalStorage();
    // OnLoad
    loadAllUsers();

    //********* Event Listeners ***********
    $('#submitAddUser').click(function(){
        let name = $('#name').val();
        let password = $('#password').val();
        let email = $('#email').val();
        let role = $('#role').val();
        createNewUser(name, email,password,role);
        console.log(name);
    });
    $('#Add-User').click(function(){
        // resetting values
        $('#name').val('');
        $('#password').val('');
        $('#email').val('');
        $('#role').val('');
        $("#errorMsg").addClass("d-none");
    });
    $('input[type="search"]').on('input', function () {
        let searchTerm = $(this).val().toLowerCase();
        searchAndDisplayUsers(searchTerm);
    });

});


function searchAndDisplayUsers(searchTerm) {
    let filteredUsers = [];

   
    if (searchTerm.trim() === '') {
        loadAllUsers();
        return;
    }

    filteredUsers = allUsers.filter(user =>
        user.username.toLowerCase().includes(searchTerm) ||
        user.email.toLowerCase().includes(searchTerm)
    );
    displayFilteredUsers(filteredUsers);
}

function displayFilteredUsers(users) {
    let tbody = $('#userTable tbody');
    tbody.empty();

    if (users.length === 0) {
        const noDataFoundRow =  `<tr><td colspan="6" class="text-danger text-center"> No Users Found !</td></tr>`;
        tbody.append(noDataFoundRow);
    }
    users.forEach(user => {
        const row = `<tr>
                        <td>${user.id}</td>
                        <td>${user.username}</td>
                        <td>${user.email}</td>
                        <td>${user.password}</td>
                        <td>${user.role}</td>
                        <td>
                            <button class="btn btn-secondary rounded-circle">
                                <i class="fa-regular fa-pen-to-square" style="color: #ffffff;"></i>
                            </button>
                            <button class="btn btn-danger rounded-circle" onclick="deleteUser(${user.id})">
                                <i class="fa-solid fa-trash" style="color: #ffffff;"></i>
                            </button>
                        </td>
                    </tr>`;
        tbody.append(row);
    });
    

}
function loadAllUsers() {
    let tbody = $('#userTable tbody');
    tbody.empty();
    allUsers = loadUsersFromLocalStorage();
    console.log(allUsers);
    allUsers.forEach(user => {
        const row = `<tr>
                        <td>${user.id}</td>
                        <td>${user.username}</td>
                        <td>${user.email}</td>
                        <td>${user.password}</td>
                        <td>${user.role}</td>
                        <td>
                            <button class="btn btn-secondary rounded-circle">
                                <i class="fa-regular fa-pen-to-square" style="color: #ffffff;"></i>
                            </button>
                            <button class="btn btn-danger rounded-circle" onclick="deleteUser(${user.id})">
                                <i class="fa-solid fa-trash" style="color: #ffffff;"></i>
                            </button>
                        </td>
                    </tr>`;
        tbody.append(row);
    });
}

function createNewUser(name,email, pass, role){

    if(validateNewUser()){
        $("#errorMsg").addClass("d-none");
        let newId= createNewUserID();
        allUsers.push({id: newId, username: name,email:email, password: pass, role: role});
        console.log(allUsers);

        // using sweet alert liberary to display successful message

        saveUsersInLocalStorage(allUsers);
            Swal.fire({
            position: "top",
            icon: "success",
            title: `You have added ${name} as a new user `,
            showConfirmButton: false,
            timer: 1500
          });
          // to dismiss my new user modal
          $('#addUserModal').modal('hide');
        loadAllUsers();
    }
    else{
        ShowErrorMessage();
    }
}
function createNewUserID() {

    if (allUsers.length > 0) {
        return allUsers[allUsers.length - 1].id + 1;
    } else {
        return 1;
    }
}
function validateNewUser() {
    let name = $('#name').val();
    let email = $('#email').val();


    if (name.trim() === '' || email.trim() === '') {
        ShowErrorMessage('Please enter both username and email.');
        return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        ShowErrorMessage('Please enter a valid email address.');
        return false;
    }


    const existingUser = allUsers.find(user => user.username === name || user.email === email);
    console.log(existingUser);
    if (existingUser) {
        ShowErrorMessage('Username or email already exists. Please choose a different one.');
        return false;
    }

    // Add additional validation as needed

    return true; // If all validations pass
}
function ShowErrorMessage(message) {

    $("#errorMsg").removeClass("d-none");
    $("#errorMsg-text").text(message);
}

function saveUsersInLocalStorage(users) {
    let usersJSON = JSON.stringify(users);
    localStorage.setItem('users', usersJSON);
}
function loadUsersFromLocalStorage() {
    let myUsers = JSON.parse (localStorage.getItem('users'));
    return myUsers;
}

function updateUser(){

}
function deleteUser(id) {
    allUsers.forEach((user, index) => {
        if (user.id === id) {
            debugger;
            isDeleteConfirmed()
                .then((confirmed) => {
                    if (confirmed) {
                        console.log(2);
                        allUsers.splice(index, 1);
                        saveUsersInLocalStorage(allUsers);
                        loadAllUsers();
                    }
                });
        }
    });
}
function isDeleteConfirmed() {
    return new Promise((resolve) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                });
                console.log(1);
                resolve(true);
            } else {
                resolve(false);
            }
        });
    });
}

function fetchDataFromJSONFile(){
    fetch('Data/obj.json')
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        console.log(response.json());
        return response.json();
    }).catch(error => {
        console.error('Error fetching data:', error);
    });
}