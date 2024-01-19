let isUserNameValid = false;
let isEmailValid = false;
let isPasswordValid = false;
let isPasswordAgainValid = false;
let id=0;


document.getElementById("signup").addEventListener('click', function (e) {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const againpassword = document.getElementById("againpassword").value;
    uservalid(username);
    emailvalid(email);
    passvalid(password);
    samepass(password, againpassword);
    if (isUserNameValid && isEmailValid && isPasswordValid && isPasswordAgainValid) {
        if (emailExists(email)) {
            // Handle the case where email already exists
            document.getElementById('emailmessage').textContent = ('Email already exists. Please use a different email.');
            document.getElementById('emailmessage').style.color='red'
        } else {
            // Email is unique, proceed with the sign-up process
            saveUserData(username, email, password);
            window.location.href="index.html"

        }
   }
});

function uservalid(username) {
    user_massege=document.getElementById("usermassege");
    if (/^[a-z]{3,}$/.test(username)) {
        isUserNameValid = true;
        user_massege.textContent = ("valid");
        user_massege.style.color='green'
        document.getElementById('username').classList.remove('border-danger');
        document.getElementById('username').classList.add('border-success');
    } else {
        isUserNameValid = false;
        user_massege.textContent = ("Not valid. Only lowercase letters allowed.");
        user_massege.style.color='red   '
        document.getElementById('username').classList.remove('border-success');
        document.getElementById('username').classList.add('border-danger');
    }
}

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

function samepass(password, againpassword) {
    passagain_massege = document.getElementById("passagainmassege");
    if (password === againpassword && isPasswordValid) {
        isPasswordAgainValid = true;
        passagain_massege.textContent = ('valid password');
        passagain_massege.style.color = 'green';
        document.getElementById("againpassword").classList.remove('border-danger');
        document.getElementById("againpassword").classList.add('border-success');
    } else {
        isPasswordAgainValid = false;
        passagain_massege.textContent = ('Not valid. Passwords do not match.');
        passagain_massege.style.color = 'red';
        document.getElementById("againpassword").classList.remove('border-success');
        document.getElementById("againpassword").classList.add('border-danger');
    }
}
function saveUserData(username, email, password) {
    let sellers = localStorage.getItem("sellers");
    sellers = sellers ? JSON.parse(sellers) : [];

    let newSeller = {
        id:++id,
        username: username,
        email: email,
        password: password,
        role:"seller"
}
    localStorage.removeItem("currentUser");
    const currentUser = [newSeller];
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
    
    sellers.push(newSeller);
    localStorage.setItem("sellers", JSON.stringify(sellers));
}
function emailExists(email) {
    let sellers = localStorage.getItem("sellers");
    if (!sellers) {
        return false; // No users stored yet
    }

    sellers = JSON.parse(sellers);
    return sellers.some(sellers => sellers.email === email);
}