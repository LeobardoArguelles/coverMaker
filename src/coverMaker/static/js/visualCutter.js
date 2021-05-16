// Controls the visual cropper of the image.
// This cropper is set to 900 px, and can be moved
// by the user.
const uparrow = document.getElementById('uparrow');
const downarrow = document.getElementById('downarrow');
const cropbox = document.getElementById('crop-box');
var upperShadow = '';
var lowerShadow = '';

uparrow.addEventListener('click', raiseCrop);
downarrow.addEventListener('click', lowerCrop);

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

    let upShadow = document.createElement('div');
    upShadow.id = 'upper-shadow';
    upShadow.classList.add('bg-black', 'opacity-50', 'absolute', 'inset-x-0', 'top-0');
    upShadow.style.height = shadowHeight.toString() + 'px';

    let lowShadow = document.createElement('div');
    lowShadow.id = 'lower-shadow';
    lowShadow.classList.add('bg-black', 'opacity-50', 'absolute', 'inset-x-0', 'bottom-0');
    lowShadow.style.height = shadowHeight.toString() + 'px';

    cropbox.appendChild(upShadow);
    cropbox.appendChild(lowShadow);

    upperShadow = document.getElementById('upper-shadow');
    lowerShadow = document.getElementById('lower-shadow');
}

function raiseCrop() {
    let uppH = parseHeight(upperShadow.style.height);
    let lowH = parseHeight(lowerShadow.style.height);

    upperShadow.style.height = (uppH - 1).toString() + 'px';
    lowerShadow.style.height = (lowH + 1).toString() + 'px';
}

function lowerCrop() {
    let uppH = parseHeight(upperShadow.style.height);
    let lowH = parseHeight(lowerShadow.style.height);

    upperShadow.style.height = (uppH + 1).toString() + 'px';
    lowerShadow.style.height = (lowH - 1).toString() + 'px';
}

function parseHeight(strHeight) {
    // :param strHeight: [String] Element's height in the form: '100px'
    // :return: [Int] Only the height number
    return parseInt(strHeight.split('px')[0]);
}
