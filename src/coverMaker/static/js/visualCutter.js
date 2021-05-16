// Controls the visual cropper of the image.
// This cropper is set to 900 px, and can be moved
// by the user.
const uparrow = document.getElementById('uparrow');
const downarrow = document.getElementById('downarrow');
const cropbox = document.getElementById('crop-box');
let mouseIsDown = false;
var upperShadow = '';
var lowerShadow = '';

uparrow.addEventListener('mousedown', raiseCrop);
uparrow.addEventListener('mouseup', () => {mouseIsDown = false;});

downarrow.addEventListener('mousedown', lowerCrop);
downarrow.addEventListener('mouseup', () => {mouseIsDown = false;});

nextBtn.addEventListener('click', cropImage);

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

    let upShadow = document.createElement('div');
    upShadow.id = 'upper-shadow';
    upShadow.classList.add('bg-black', 'absolute', 'inset-x-0', 'top-0');
    upShadow.style.height = shadowHeight.toString() + 'px';

    let lowShadow = document.createElement('div');
    lowShadow.id = 'lower-shadow';
    lowShadow.classList.add('bg-black', 'absolute', 'inset-x-0', 'bottom-0');
    lowShadow.style.height = shadowHeight.toString() + 'px';

    cropbox.appendChild(upShadow);
    cropbox.appendChild(lowShadow);

    upperShadow = document.getElementById('upper-shadow');
    lowerShadow = document.getElementById('lower-shadow');

}

function raiseCrop() {
    let uppH = parseHeight(upperShadow.style.height);
    let lowH = parseHeight(lowerShadow.style.height);

    if (uppH > 0) {
        upperShadow.style.height = (uppH - 1).toString() + 'px';
        lowerShadow.style.height = (lowH + 1).toString() + 'px';

        mouseIsDown = true;
        setTimeout(function() {
            if(mouseIsDown) {
                raiseCrop();
            }
        }, 100);
    }
}

function lowerCrop() {
    let uppH = parseHeight(upperShadow.style.height);
    let lowH = parseHeight(lowerShadow.style.height);

    if (lowH > 0) {
        upperShadow.style.height = (uppH + 1).toString() + 'px';
        lowerShadow.style.height = (lowH - 1).toString() + 'px';

        mouseIsDown = true;
        setTimeout(function() {
            if(mouseIsDown) {
                lowerCrop();
            }
        }, 100);
    }
}

function parseHeight(strHeight) {
    // :param strHeight: [String] Element's height in the form: '100px'
    // :return: [Int] Only the height number
    return parseInt(strHeight.split('px')[0]);
}

function cropImage() {
    // Sends image to server to be cropped, and replaces it with the
    // new version

    crops = calculateCrop();

    // Create form to send the data
    let form = document.createElement('form');
    // cropRoute defined on the template, to use a Jinja variable
    form.action = cropRoute;
    form.method = 'POST';

    let imInput = document.createElement('input');
    imInput.name = 'imageName';
    imInput.type = 'text';
    imInput.value = baseName(imgInput.value);;

    let upperCrop = document.createElement('input');
    upperCrop.name = 'upper';
    upperCrop.type = 'number';
    upperCrop.value = crops['top'];

    let lowerCrop = document.createElement('input');
    lowerCrop.name = 'lower';
    lowerCrop.type = 'number';
    lowerCrop.value = crops['bottom'];

    form.appendChild(imInput);
    form.appendChild(upperCrop);
    form.appendChild(lowerCrop);

    asyncSendImage(form);
}


function calculateCrop() {
    // Calculate where the image will be cropped.
    // :return: Object with 'top' and 'bottom' keys
    //          indicatig where to crop the image
    const imHeight = imgPrev.height;
    const upperShadowHeight = parseHeight(upperShadow.style.height);
    const lowerShadowHeight = parseHeight(lowerShadow.style.height);

    let upperCrop = upperShadowHeight / imHeight;
    let lowerCrop = lowerShadowHeight / imHeight;

    let crops = {
        top: upperCrop,
        bottom: lowerCrop
    };

    return crops

}

function removeShadows() {
    remove(upperShadow);
    remove(lowerShadow);
}

function changeImage(source) {
    // Deletes the current preview image, and creates a
    // new one with the provided source.
    // :param source: Source for the new image

    remove(imgPrev);

    let newImg = document.createElement('img');
    newImg.id = 'preview';
    newImg.src = source;
    newImg.classList.add('h-60', 'md:h-80');

    cropbox.appendChild(newImg);
}
