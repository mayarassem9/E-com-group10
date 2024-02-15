let isUserNameValid = false;
let isEmailValid = false;
let isPasswordValid = false;
let isPasswordAgainValid = false;
let id = 0;

document.getElementById("signup").addEventListener("click", function (e) {
  e.preventDefault();
  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const againpassword = document.getElementById("againpassword").value;
  uservalid(username);
  emailvalid(email);
  passvalid(password);
  samepass(password, againpassword);
  if (
    isUserNameValid &&
    isEmailValid &&
    isPasswordValid &&
    isPasswordAgainValid
  ) {
    if (emailExists(email)) {
      // Handle the case where email already exists
      document.getElementById("emailmessage").textContent =
        "Email already exists. Please use a different email.";
      document.getElementById("emailmessage").style.color = "red";
    } else {
      // Email is unique, proceed with the sign-up process

      let userRole = saveUserData(username, email, password); // save the role
      // Redirect based on role

      if (userRole === "seller") {
        localStorage.setItem("userSignedUp", "false");
        Swal.fire({
          title: "Signed up successfully. Please wait for your account to be verified.",
          showClass: {
            popup: `
              animate__animated
              animate__fadeInUp
              animate__faster
            `
          },
          hideClass: {
            popup: `
              animate__animated
              animate__fadeOutDown
              animate__faster
            `
          }
        });

        // window.location.href = "seller.html"; // Redirect to seller page
      } else {
        localStorage.setItem("userSignedUp", "true");
        window.location.href = "index.html";
      }
    }
  }
});

function uservalid(username) {
  user_massege = document.getElementById("usermassege");
  if (/^[a-zA-Z]{3,20}$/.test(username)) {
    isUserNameValid = true;
    user_massege.textContent = "valid";
    user_massege.style.color = "green";
    document.getElementById("username").classList.remove("border-danger");
    document.getElementById("username").classList.add("border-success");
  } else {
    isUserNameValid = false;
    user_massege.textContent =
      "Not valid. Only lowercase ,Uppercase letters allowed and Max lenght 20.";
    user_massege.style.color = "red   ";
    document.getElementById("username").classList.remove("border-success");
    document.getElementById("username").classList.add("border-danger");
  }
}

function emailvalid(email) {
  email_message = document.getElementById("emailmessage");

  // Extract the email name and domain
  const [emailName, emailDomain] = email.split("@");

  // Check if the email name length is within the desired range (e.g., 1 to 20 characters)
  const isEmailNameValid = emailName.length >= 3 && emailName.length <= 20;

  if (
    /^[a-zA-Z]+([._-][a-zA-Z]+)*@(gmail|yahoo)\.com$/.test(email)&&
    !isSellerEmail(email) &&
    isEmailNameValid
  ) {
    console.log("HHIIIIII");
    isEmailValid = true;
    email_message.textContent = "Valid email";
    email_message.style.color = "green";
    document.getElementById("email").classList.remove("border-danger");
    document.getElementById("email").classList.add("border-success");
  } else {
    isEmailValid = false;
    email_message.textContent =
      "Not valid. Only Gmail or Yahoo emails allowed, max length for name 20,can use .-_   or use another email.";
    email_message.style.color = "red";
    document.getElementById("email").classList.remove("border-success");
    document.getElementById("email").classList.add("border-danger");
  }
}
function passvalid(password) {
  pass_message = document.getElementById("passmassege");
  if (/^[0-9a-zA-Z]{8,20}$/.test(password) && password.length <= 20) {
    isPasswordValid = true;
    pass_message.textContent = "valid password";
    pass_message.style.color = "green";
    document.getElementById("password").classList.remove("border-danger");
    document.getElementById("password").classList.add("border-success");
  } else {
    isPasswordValid = false;
    pass_message.textContent =
      "Not valid only numbers and characters. Min 8 characters , Max limit 20, no spaces.";
    pass_message.style.color = "red";
    document.getElementById("password").classList.remove("border-success");
    document.getElementById("password").classList.add("border-danger");
  }
}

function samepass(password, againpassword) {
  passagain_massege = document.getElementById("passagainmassege");
  if (password === againpassword && isPasswordValid) {
    isPasswordAgainValid = true;
    passagain_massege.textContent = "valid password";
    passagain_massege.style.color = "green";
    document.getElementById("againpassword").classList.remove("border-danger");
    document.getElementById("againpassword").classList.add("border-success");
  } else {
    isPasswordAgainValid = false;
    passagain_massege.textContent = "Not valid. Passwords does not match.";
    passagain_massege.style.color = "red";
    document.getElementById("againpassword").classList.remove("border-success");
    document.getElementById("againpassword").classList.add("border-danger");
  }
}

function isSellerEmail(email) {
  let sellers = localStorage.getItem("users");
  if (!sellers) {
    return false;
  }
  sellers = JSON.parse(sellers);
  return sellers.some((sellers) => sellers.email === email);
}
function saveUserData(username, email, password) {
  let users = localStorage.getItem("users");
  let approved = localStorage.getItem("approved");
  users = users ? JSON.parse(users) : [];
  approved = approved ? JSON.parse(approved) : [];
  let newid = 1;
  if (users.length !== 0 ) {
    newid = users[users.length - 1].id+ 1;
  }

  const role = document.querySelector('input[name="role"]:checked').value;

  let newUser = {
    id: newid,
    username: username,
    email: email,
    password: password,

    role: role,
  };

   // Check the role and decide where to push the new user object
   if (role === "seller") {
      approved.push(newUser); // Add to approved array if seller
      localStorage.setItem("approved", JSON.stringify(approved)); // Update the localStorage
  } else {

    localStorage.removeItem("currentUser");
    const currentUser = [newUser];
    localStorage.setItem("currentUser", JSON.stringify(currentUser));

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
  }

  
  return role;
}
function emailExists(email) {
  let users = localStorage.getItem("users");
  let approved = localStorage.getItem("approved");
  users = users ? JSON.parse(users) : [];
  approved = approved ? JSON.parse(approved) : [];
  // Combine both arrays to check all emails together
  const allUsers = users.concat(approved);
  // Check if the email exists in the combined array
  return allUsers.some((user) => user.email === email);
}
