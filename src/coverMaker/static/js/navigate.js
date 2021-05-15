const prevBtn = document.getElementById('previous-btn');
const nextBtn = document.getElementById('next-btn');
let imgPrev = document.getElementById('preview');

// Activate navigation buttons when a image is loaded
// fileInput is defined in fileDropArea.js
fileInput.addEventListener('change', function(e) {
    loadImage(e)
    show(prevBtn);
    show(imgPrev);
    hide(dropArea);
    nextBtn.disabled = false;
});

// Loads the uploaded image to view it and work with it
// on the app
function loadImage(e) {
    imgPrev.src = URL.createObjectURL(e.target.files[0]);
    imgPrev.onload = function() {
      URL.revokeObjectURL(imgPrev.src) // free memory
    }
}
