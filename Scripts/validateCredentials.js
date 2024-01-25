
let is_admin=false;
let is_user=false;
let is_seller=false;

export function isadmin(email ,password){
    let admin=localStorage.getItem("users");


    if(!admin){
        is_admin= false;
    }
    admin=JSON.parse(admin);
    const adminExists = admin.find(admin => admin.email ===email && admin.password === password && admin.role==="admin");
    if(adminExists){
        console.log("admin")
        is_admin=true;
        window.location.href="/Admin_Component/admin.html"
        
    }
    else{
         is_admin=false;
    }

}


 function isuser(email , password){
    let users = localStorage.getItem("users");
    if(!users){
        is_user= false;     
        return;
    }
    users = JSON.parse(users);
    const userExists = users.find(user => user.email === email && user.password === password&& user.role==="customer");
    if(userExists){
        is_user= true;
        localStorage.removeItem("currentUser");
        const currentUser = [userExists];
        // Save the current user's data in local storage
        localStorage.setItem("currentUser", JSON.stringify(currentUser));
        window.location.href="index.html";
        
    }
    else{
        is_user= false;
    }
}
 function isseller(email,password){
    let sellers = localStorage.getItem("users");

    if(!sellers){
        is_seller= false;
        return;
    }
    sellers=JSON.parse(sellers);
    const sellerExists = sellers.find(sellers => sellers.email === email && sellers.password === password&&sellers.role==="seller");
    if(sellerExists){
        is_seller=true;
        localStorage.removeItem("currentUser");
        const currentUser = [sellerExists];
        localStorage.setItem("currentUser", JSON.stringify(currentUser));
        window.location.href="seller.html"
       
    }
    else{
        is_seller= false;
    }

}
export function validateCredentials(email, password) {
    console.log("inside")
    isadmin(email,password);
    isuser(email,password);
    isseller(email,password);
    if(!is_admin && !is_seller && !is_user){
        console.log(is_admin);
        console.log(is_seller);
        console.log(is_user);

        document.getElementById('email').classList.remove('border-success');
        document.getElementById('email').classList.add('border-danger');
        document.getElementById('password').classList.remove('border-success');
        document.getElementById('password').classList.add('border-danger');
        Swal.fire({
            icon: "error",
            title: "Wrong Email or Password",
            text: "Something went wrong!"
        });

    }
}