let isEmailValid = false;
let isPasswordValid = false;


document.getElementById("login").addEventListener('click', function (e) {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    emailvalid(email);
    passvalid(password);
    if ( isEmailValid && isPasswordValid ){
        validateCredentials(email, password);
    }
});



function emailvalid(email) {
    email_message=document.getElementById("emailmessage");
    
    if (/^[a-zA-Z0-9._%+-]+@(gmail|yahoo)\.com$/.test(email)) {
        isEmailValid = true;
        email_message.textContent = ('valid email');
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
    pass_message=document.getElementById("passmassege");
    if (/^\S{8,}$/.test(password)) {
        isPasswordValid = true;
        pass_message.textContent = ('valid password');
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
function validateCredentials(email, password) {
    let users = localStorage.getItem("users");
    if(!users) return;
    users = JSON.parse(users);

    const userExists = users.find(user => user.email === email && user.password === password);
    if (userExists) {
        localStorage.removeItem("currentUser");
        const currentUser = [userExists];
        // Save the current user's data in local storage
        localStorage.setItem("currentUser", JSON.stringify(currentUser));
        window.location.href = "index.html";
    } else{
        Swal.fire({
            icon: "error",
            title: "Wrong Email or Password",
            text: "Something went wrong!"
          });
          return;
    }
}