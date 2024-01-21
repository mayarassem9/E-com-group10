



$(document).ready(function () {

    /* poster Section Index.html*/

    var imageContainer = document.querySelector('.image-container');
    var images = Array.from(imageContainer.querySelectorAll('.image'));

    function resetImagesPosition() {
        imageContainer.style.transition = 'transform 2s ease';
        imageContainer.style.transform = 'translateY(0)';
        // Force reflow to apply the changes immediately
        void imageContainer.offsetWidth;
        imageContainer.style.transition = 'transform 2s ease-in-out';
    }

    setInterval(function () {
        // Apply a transform to move images to the top smoothly
        imageContainer.style.transform = 'translateY(-25%)';

        setTimeout(function () {
            // Move the first image to the end
            var firstImage = images.shift();
            images.push(firstImage);

            // Update the container with the new order
            images.forEach(function (image) {
                imageContainer.appendChild(image);
            });

            // Reset the transform
            resetImagesPosition();
// nada_v2
        }, 1000); // Set a timeout to match the transition duration
    }, 2000); // Set the interval (in milliseconds) between image movements

    // Reset images position when transitioning to the next or previous slide
    var carousel = new bootstrap.Carousel(document.getElementById('carouselExampleIndicators'), {
        interval: 5000, // Set the interval (in milliseconds) between slide transitions
        wrap: true
    });

    carousel._element.addEventListener('slide.bs.carousel', function () {
        resetImagesPosition();
    });

});
=======
        });
    
});

// Asmaa

// **************************** Cutomer Service Area *****************************

function closeFloatingBtn() {
    document.querySelector('.floating-btn-container').style.display = 'none';
  }

function sendComplain() 
{
    let myMessage= $('#complainTextarea').val();
    let messages = loadMessagesFromLocalStorage();

    let messageID = createNewMessageID(messages);
    let userID =1;  // static for now will get it from cookie later
    let userEmail  = "jjj@gmail.com";
    let currentDate = new Date();
    let formattedDate = currentDate.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      timeZoneName: 'short'
    });

    if(myMessage!==''){
        messages.push( {id:messageID,userId:userID,userEmail:userEmail,message:myMessage,isRead:false,date:formattedDate});
    }
    console.log(messages);
    saveMessagesToLocalStorage(messages);
    Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Your Email Has been sent",
        showConfirmButton: false,
        timer: 1500
    });
    $('#dismissCustomerComplain').click();
}
function loadMessagesFromLocalStorage(){
    let myMessages = JSON.parse(localStorage.getItem('customerServiceMessages'));
    return myMessages;
}
function saveMessagesToLocalStorage(_customerServiceMessages){
    let messagesJSON = JSON.stringify(_customerServiceMessages);
    localStorage.setItem('customerServiceMessages', messagesJSON);
}
function createNewMessageID(messages) {

    if (messages.length > 0) {
        return messages[messages.length - 1].id + 1;
    } else {
        return 1;
    }
}

// **************************** End of Cutomer Service Area *****************************

