// Controls the visual cropper of the image.
// This cropper is set to 900 px, and can be moved
// by the user.
const uparrow = document.getElementById('uparrow');
const downarrow = document.getElementById('downarrow');
const cropbox = document.getElementById('crop-box');
// const upperShadow = document.getElmentById('upper-shadow');
// const lowerShadow = document.getElmentById('lower-shadow');

// uparrow.addEventListener('click', raiseCrop);
// downarrow.addEventListener('click', lowerCrop);


// Adds 2 different divs with black background and
// low opacity, which will change in height to
// indicate where the image will be cropped.
function addShadows() {
    const imgHeight = imgPrev.height;
    const realHeight = imgPrev.naturalHeight;

    // Desired height of the final image
    const croppedHeight = 900;
    // We use 2 shadows so the height is split among them.
    const shadowHeight = (imgHeight - imgHeight / realHeight * croppedHeight) / 2;
    console.log(shadowHeight);

    let upperShadow = document.createElement('div');
    upperShadow.id = 'upper-shadow';
    upperShadow.classList.add('bg-black', 'opacity-50', 'absolute', 'inset-x-0', 'top-0');
    upperShadow.style.height = shadowHeight.toString() + 'px';

    let lowerShadow = document.createElement('div');
    lowerShadow.id = 'lower-shadow';
    lowerShadow.classList.add('bg-black', 'opacity-50', 'absolute', 'inset-x-0', 'bottom-0');
    lowerShadow.style.height = shadowHeight.toString() + 'px';

    cropbox.appendChild(upperShadow);
    cropbox.appendChild(lowerShadow);
}
