// Loads the uploaded image to view it and work with it
// on the app

let imgPrev = document.getElementById('preview');

function loadImage(e) {
    imgPrev.src = URL.createObjectURL(e.target.files[0]);
    imgPrev.onload = function() {
      URL.revokeObjectURL(imgPrev.src) // free memory
    }
}
