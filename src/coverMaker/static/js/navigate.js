const prevBtn = document.getElementById('previous-btn');
const nextBtn = document.getElementById('next-btn');

// Activate navigation buttons when a image is loaded
// fileInput is defined in fileDropArea.js
fileInput.addEventListener('change', function() {
    console.log('Change');
    show(prevBtn);
    nextBtn.disabled = false;
});
