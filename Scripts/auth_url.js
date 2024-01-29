let current = localStorage.getItem("currentUser");
current = current ? JSON.parse(current):false;



if(current){
    let isseller=current.some((current) => current.role === "seller");
    let isadmin=current.some((current) => current.role === "admin");
    if(!isadmin){
        window.location.href="index.html";
    }
    if(!isseller){
        window.location.href="index.html";
    }

}
else{
    window.location.href="index.html";
}