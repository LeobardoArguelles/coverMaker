
function makeImageForm() {
    // Get the image data to create send it to
    // the server and create it there. Then receive
    // the finished image and prompt its
    // download.

    // Get all necessary data.




    // Create form to send the data
    const form = document.createElement('form');
    form.action = makeImageRoute;
    form.method = 'POST';
    form.name = 'downForm';
    form.id = 'downForm';

    const posInput = document.createElement('input');
    posInput.name = 'position';
    posInput.type = 'text';
    posInput.value = '';
    posInput.classList.add('hidden');

    const colorInput = document.createElement('input');
    colorInput.name = 'color';
    colorInput.type = 'text';
    colorInput.value = '';
    colorInput.classList.add('hidden');

    const titleInput = document.createElement('input');
    titleInput.name = 'title';
    titleInput.id = 'title-input';
    titleInput.type = 'text';
    titleInput.value = '';
    titleInput.classList.add('hidden');

    const imgName = document.createElement('input');
    imgName.name = 'imageName';
    imgName.type = 'text';
    checkImageName();
    imgName.value = imageName;
    imgName.classList.add('hidden');

    const submitBtn = document.createElement('button');
    submitBtn.classList.add('btn-green', 'cursor-pointer');
    submitBtn.type = 'submit';
    submitBtn.innerText = 'Descargar';

    form.appendChild(posInput);
    form.appendChild(colorInput);
    form.appendChild(titleInput);
    form.appendChild(imgName);
    form.appendChild(submitBtn);

    form.addEventListener('submit', function() {
        // Add values right before submiting
        titleInput.value = getTitle();
        posInput.value = getBannerPosition();
        colorInput.value = getBannerColor();
        asyncMakeImage(this);
    });

    return form;
}

function getBannerPosition() {
    // Return the relation between the image element
    // and the height of the position banner. This
    // relation can be used server side to calculate
    // the correct position on the true size of the
    // image.
    const imgHeight = getImageHeight();
    const posBanner = document.getElementById('posBanner');
    const posBannerHeight = parseHeight(posBanner.style.height);

    return posBannerHeight / imgHeight;
}

function getBannerColor() {
    const banner = document.getElementById('banner');
    const color = banner.style.backgroundColor;
    if (color === '') {
        return '#000';
    }
    return color;
}

function getTitle() {
    const titleInput = document.getElementById('title');
    return titleInput.innerText;
}

function checkImageName() {
    // Confirm that the global variable
    // <imageName> is not empty. Give it a
    // name if it is.
    if (imageName === '') {
        imageName = baseName(imgInput.value);
    }
}
