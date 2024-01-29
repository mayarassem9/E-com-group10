let current = localStorage.getItem("currentUser");
current = current ? JSON.parse(current):false;

debugger;


if(current){
    let isseller=current.some((current) => current.role === "seller");
    let isadmin=current.some((current) => current.role === "admin");
    if(isadmin){
        window.location.href="/Admin_Component/admin.html";
    }
    if(isseller){
        window.location.href="seller.html";
    }

}
else{
    window.location.href="index.html";
}