const prevBtn = document.getElementById('previous-btn');
const nextBtn = document.getElementById('next-btn');
const box = document.getElementById('box');
const upForm = document.getElementById('uploadForm');
let imgPrev = document.getElementById('preview');

// Activate navigation buttons when a image is loaded
// fileInput is defined in fileDropArea.js
// fileInput.addEventListener('change', function(e) {
//     // const upImage = resizeImage(e);
//     // loadImage(upImage);

//     show(prevBtn);
//     show(imgPrev);

//     hide(upForm);
//     // hide(dropArea);
//     // Use js instead of css because dropArea has
//     // display:flex, which overrides the class hidden
//     dropArea.style.visibility = 'hidden';

//     styleBox('image');
//     nextBtn.disabled = false;

//     prevBtn.addEventListener('click', reset);
// });

// Sends image to the server and receives the correct
// size image (1600 width, whatever height)
upForm.addEventListener('submit', function(e) {asyncSubmit(e)})


// Loads the uploaded image to view it and work with it
// on the app
function loadImage(e) {
    imgPrev.src = URL.createObjectURL(e.target.files[0]);
    imgPrev.onload = function() {
      URL.revokeObjectURL(imgPrev.src) // free memory
    }
}

// Style the flexbox either to show the image, or to show
// the dropbox
function styleBox(style) {

    switch (style) {

    case 'image':
        box.classList.remove('h-screen');
        break;

    case 'dropbox':
        box.classList.add('h-screen');
        break;
    default:
        break;
    }
}

// Resets previously made changes and leaves the
// page ready to receive a different image
function reset() {
    fileInput.value = null;
    hide(prevBtn);
    hide(imgPrev);

    show(upForm);
    dropArea.style.visibility = '';

    styleBox('dropbox');
    nextBtn.disabled = true;

    imgPrev.src = '';
}

