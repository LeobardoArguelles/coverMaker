
nextBtn.addEventListener('click', loadBannerMenu);

// Activate navigation buttons when a image is loaded
// fileInput is defined in fileDropArea.js
function activateNav() {
    show(prevBtn);
    show(nextBtn);
    show(imgPrev);
    show(prevBox);

    hide(upForm);
    // hide(dropArea);
    // Use js instead of css because dropArea has
    // display:flex, which overrides the class hidden
    dropArea.style.visibility = 'hidden';

    styleBox('image');
    // nextBtn.addEventListener('click', addBanner);
    // nextBtn.addEventListener('click')

    prevBtn.addEventListener('click', reset);
}

// Sends image to the server and receives the correct
// size image (1600 width, whatever height)
upForm.addEventListener('submit', function(e) {asyncSubmit(e)})

// Save file name to use later
imgInput.addEventListener('change', function() {
    imageName = baseName(imgInput.value);
} );

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
    hide(prevBox);

    show(upForm);
    dropArea.style.visibility = '';

    styleBox('dropbox');
    nextBtn.disabled = true;

    imgPrev.src = '';

    removeShadows();
}

function baseName(str)
{
   var base = new String(str).substring(str.lastIndexOf('\\') + 1);
   return base;
}

function loadBannerMenu() {
    // Loads the next menu, adds the banner, and replaces
    // the arrows to change the position of the banner.
    clearArrowsListeners();

    uparrow.addEventListener('mousedown', lowerBanner);
    uparrow.addEventListener('mouseup', () => {mouseIsDown = false;});
    downarrow.addEventListener('mousedown', raiseBanner);
    downarrow.addEventListener('mouseup', () => {mouseIsDown = false;});


    let inputsDiv = document.createElement('div');
    inputsDiv.classList.add('flex', 'flex-col', 'justify-center', 'items-start', 'mb-6', 'pl-10');

    // Color input div

    let colorDiv = document.createElement('div');
    colorDiv.classList.add('flex', 'flex-row', 'justify-center', 'items-center', 'space-x-10', 'mb-6');

    let colorLabel = document.createElement('label');
    colorLabel.htmlFor = 'color';
    colorLabel.classList.add('cursor-pointer');
    colorLabel.innerText = 'Elige color: ';
    colorLabel.classList.add('text-2xl');

    let colorPicker = document.createElement('input');
    colorPicker.type = 'color';
    colorPicker.classList.add('cursor-pointer');
    colorPicker.id = 'color';
    colorPicker.name = 'color';
    colorPicker.addEventListener('change', function() {
        const chosenColor = this.value;
        changeBannerColor(chosenColor);
    });

    colorDiv.appendChild(colorLabel);
    colorDiv.appendChild(colorPicker);

    // Title input div

    let titleDiv = document.createElement('div');
    titleDiv.classList.add('flex', 'flex-row', 'justify-center', 'items-center', 'space-x-10', 'mb-6');

    let titleLabel =  document.createElement('label');
    titleLabel.htmlFor = 'title';
    titleLabel.innerText = 'Título: ';
    titleLabel.classList.add('text-2xl');

    let titleInput = document.createElement('input');
    titleInput.type = 'text';
    titleInput.classList.add('pl-2', 'border-solid', 'border-2', 'rounded-sm', 'border-indigo-500', 'placeholder-indigo-600', 'placeholder-opacity-50');
    titleInput.placeholder = 'Trabaja desde casa, salva al mundo';
    titleInput.size = 35;
    titleInput.name = 'title';
    titleInput.id = 'titleInput';
    titleInput.addEventListener('input', function(e) {
        let titleInput = document.getElementById('title');
        titleInput.innerText = e.target.value;
    });

    titleDiv.appendChild(titleLabel);
    titleDiv.appendChild(titleInput);

    inputsDiv.appendChild(titleDiv);
    inputsDiv.appendChild(colorDiv);

    imgPrev.after(inputsDiv);

    addBanner();
    addDownloadForm();
}

function addBanner() {
    // Add a div to simulate where the banner will go.
    const imgHeight = getImageHeight();

    let bannersDiv = document.createElement('div');
    bannersDiv.classList.add('absolute', 'w-full');

    let bannerDiv = document.createElement('div');
    bannerDiv.id = 'banner';
    bannerDiv.style.height = imgHeight / 6  + 'px';
    bannerDiv.classList.add('bg-black', 'w-full', 'flex', 'flex-col', 'justify-center');

    let title = document.createElement('p');
    title.id = 'title';
    title.classList.add('text-white', 'text-shadow', 'text-center', 'text-2xl');

    bannerDiv.appendChild(title);

    let positionBanner = document.createElement('div');
    positionBanner.id = 'posBanner';
    positionBanner.style.height = imgHeight / 4 + 'px';
    positionBanner.classList.add('bg-transparent', 'w-full');

    bannersDiv.appendChild(positionBanner);
    bannersDiv.appendChild(bannerDiv);
    cropbox.appendChild(bannersDiv);
}

function clearArrowsListeners() {
    // Delete all event listeners in arrows by cloning them
    uparrow = cloneElement(uparrow);
    downarrow = cloneElement(downarrow);
}

function clearNextBtnListener() {
    // Delete all event listeners in the button used
    // to advance to next step
    nextBtn = cloneElement(nextBtn);
}

function cloneElement(el) {
    var new_element = el.cloneNode(true);
    el.parentNode.replaceChild(new_element, el);
    return new_element;
}


function addDownloadForm() {
    // Delete all event listeners in the button used
    // to advance to next step
    form = makeImageForm();

    nextBtn.parentNode.appendChild(form);
    remove(nextBtn);
}
