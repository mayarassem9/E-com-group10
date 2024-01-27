window.addEventListener('load',function(){
    const navlink=this.document.querySelector('.nav-links');
    const navicon=this.document.querySelector('.nav-icons');
    const burger=this.document.querySelector(".hamburger-icon")


    burger.addEventListener('click',function(){
        navicon.classList.toggle('mobile')
        navlink.classList.toggle('mobile')
    })
    


})