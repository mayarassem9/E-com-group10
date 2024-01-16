$(document).ready(function () {
    let counter = 0;
    $('#btnCount').click(function () {
        counter++;
        $('#count').html(counter);
    });
});


let app = {
    users: [{
        username: "",

    },
    {

    }]

}

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
