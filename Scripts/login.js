import { validateCredentials } from "./validateCredentials.js"
let isEmailValid = false;
let isPasswordValid = false;


document.getElementById("login").addEventListener('click', function (e) {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    emailvalid(email);
     passvalid(password);
    if ( isEmailValid && isPasswordValid ){
        console.log("inside event")
        localStorage.setItem("userSignedUp",'true')

        validateCredentials(email, password);

    }
});



function emailvalid(email) {
   let email_message=document.getElementById("emailmessage");
    
    if (/^[a-zA-Z0-9._%+-]+@(gmail|yahoo)\.com$/.test(email)) {
        isEmailValid = true;
        //email_message.textContent = ('valid email');
        email_message.style.color='green'
        document.getElementById('email').classList.remove('border-danger');
        document.getElementById('email').classList.add('border-success');
    } else {
        isEmailValid = false;
        email_message.textContent = ('Not valid. Only Gmail or Yahoo emails allowed.');
        email_message.style.color='red'
        document.getElementById('email').classList.remove('border-success');
        document.getElementById('email').classList.add('border-danger');
    }
}
function passvalid(password) {
   let pass_message=document.getElementById("passmassege");
    if (/^\S{8,}$/.test(password)) {
        isPasswordValid = true;
        //pass_message.textContent = ('valid password');
        pass_message.style.color='green'
        document.getElementById('password').classList.remove('border-danger');
        document.getElementById('password').classList.add('border-success');
    } else {
        isPasswordValid = false;
        pass_message.textContent = ('Not valid. Min 8 characters, no spaces.');
        pass_message.style.color='red'
        document.getElementById('password').classList.remove('border-success');
        document.getElementById('password').classList.add('border-danger');
    }
}
// function validateCredentials(email, password) {
//     let users = localStorage.getItem("users");
//     let sellers = localStorage.getItem("sellers");
//     let admin=localStorage.getItem("Admin")

//     if(!admin){
//         alert('no admin');
//         return
//     }
//     if (!users && !sellers) {
//         alert('Login Failed: No users or sellers registered');
        
//         return;
//     }
    
//     users = JSON.parse(users);
//     sellers=JSON.parse(sellers);
//     admin=JSON.parse(admin);
//     const adminExists = admin.find(admin => admin.email === email && admin.password === password);
//     const userExists = users.find(user => user.email === email && user.password === password);
//     const sellerExists = sellers.find(sellers => sellers.email === email && sellers.password === password);
    
//     if(adminExists){
//         console.log("tat"); 
//         window.location.href="index.html"
//         return;
//     }
//     else if (userExists) {
//         localStorage.removeItem("currentUser");
//         const currentUser = [userExists];
//         // Save the current user's data in local storage
//         localStorage.setItem("currentUser", JSON.stringify(currentUser));
//         window.location.href="index.html"

        
//         return;
//     } 
//     else if(sellerExists){
//         localStorage.removeItem("currentUser");
//         const currentUser = [sellerExists];
//         localStorage.setItem("currentUser", JSON.stringify(currentUser));
//         window.location.href="seller.html"
//         return;

//     }
//     else {
//         email_message.textContent = ('incorrect email or password');
//         email_message.style.color='red'
//         document.getElementById('email').classList.remove('border-success');
//         document.getElementById('email').classList.add('border-danger');
//         pass_message.textContent = ('incorrect email or password')
//         pass_message.style.color='red'
//         document.getElementById('password').classList.remove('border-success');
//         document.getElementById('password').classList.add('border-danger');

//      }
// }