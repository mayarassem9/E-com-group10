


const customerServiceMessages =[
    {id:1,userId:1,userEmail:"jjj@gmail.com",message:'I have a problem in',isRead:false,date:'Jan 20, 2024, 9:24 PM GMT+2'},
    {id:2,userId:5,userEmail:"jjj@gmail.com",message:'I have a problem in',isRead:false,date:'Jan 20, 2024, 9:24 PM GMT+2'}

];


$(document).ready(function (){

    // make the current tab active
    links[2].parentElement.classList.add('active');
    //saveMessagesToLocalStorage(customerServiceMessages);
    loadAllMessages();
});

function loadAllMessages(){
    let tbody = $('#messagesTable tbody');
    tbody.empty();
    allMessages = loadMessagesFromLocalStorage();
    // console.log(allUsers);
    allMessages.forEach(message => {
        const row = `<tr${message.isRead ? ' class="read-message"' : ''} >

                        <td>${message.id}</td>
                        <td>${message.userId}</td>
                        <td>${message.userEmail}</td>
                        <td>${message.message}</td>
                        <td>${message.date}</td>
                        <td>
                            <button class="btn btn-danger rounded-circle" onclick="deleteMessage(${message.id})">
                                <i class="fa-solid fa-trash" style="color: #ffffff;"></i>
                            </button>
                            <button class="btn  rounded-circle " data-bs-toggle="modal" data-bs-target="#readMessageModal" onclick="markAsRead(${message.id})">
                            <i class="fa-solid fa-circle-info btn-lg"></i>
                            </button>
                         
                        </td>
                    </tr>`;
        tbody.append(row);
        // <input class="form-check-input mt-2 form-check-lg" type="checkbox" value="" id="flexCheckDefault" onclick="markAsRead(${message.id})">
        // </input>
    });
}

function loadMessagesFromLocalStorage(){
    let myMessages = JSON.parse(localStorage.getItem('customerServiceMessages'));
    return myMessages;
}
function saveMessagesToLocalStorage(_customerServiceMessages){
    let messagesJSON = JSON.stringify(_customerServiceMessages);
    localStorage.setItem('customerServiceMessages', messagesJSON);
}


function deleteMessage(id){
    let mycustomerServiceMessages = loadMessagesFromLocalStorage();
    mycustomerServiceMessages.forEach((message, index) => {
        if (message.id === id) {
            isDeleteConfirmed()
                .then((confirmed) => {
                    if (confirmed) {
                        customerServiceMessages.splice(index, 1);
                        saveMessagesToLocalStorage(customerServiceMessages);
                        loadAllMessages();
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
                resolve(true);
            } else {
                resolve(false);
            }
        });
    });
}

function markAsRead(id) {
    let customerServiceMessages  = loadMessagesFromLocalStorage();
    let myMessage =  customerServiceMessages.find(msg =>msg.id === id);
    console.log(customerServiceMessages,myMessage);
    myMessage.isRead = true;
    console.log(myMessage.message);
    $('#readMessageModal .modal-body').text(myMessage.message);
    saveMessagesToLocalStorage(customerServiceMessages);
    loadAllMessages();
}