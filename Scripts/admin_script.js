const users =  [ {id: 1, username: "customer1", password: "password123", role: "customer"},
                 {id: 2, username: "seller1", password: "sellerpass", role: "seller"},
                 {id: 3, username: "admin1",password: "adminpass",role: "admin"}
               ];
let allUsers=[];

$(document).ready(function (){
    loadUsersFromLocalStorage();
    // OnLoad
    loadAllUsers();

    $('#submitAddUser').click(function(){
        let name = $('#name').val();
        let password = $('#password').val();
        let role = $('#role').val();
        createNewUser(name, password, role);
        console.log(name);
    });

    // Event Listeners

});

function loadAllUsers() {
    let tbody = $('#userTable tbody');
    tbody.empty();
    allUsers = loadUsersFromLocalStorage();
    console.log(allUsers);
    allUsers.forEach(user => {
        const row = `<tr>
                        <td>${user.id}</td>
                        <td>${user.username}</td>
                        <td>${user.password}</td>
                        <td>${user.role}</td>
                        <td>
                            <button class="btn btn-secondary rounded-circle">
                                <i class="fa-regular fa-pen-to-square" style="color: #ffffff;"></i>
                            </button>
                            <button class="btn btn-danger rounded-circle">
                                <i class="fa-solid fa-trash" style="color: #ffffff;"></i>
                            </button>
                        </td>
                    </tr>`;
        tbody.append(row);
    });
}

function createNewUser(name, pass, role){

    allUsers.push({id: 555, username: name, password: pass, role: role});
    console.log(allUsers);
    saveUsersInLocalStorage(allUsers);
    loadAllUsers();
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
function deleteUser(){

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