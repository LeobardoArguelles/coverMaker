
function makeImage() {
    // Get the image data to create send it to
    // the server and create it there. Then receive
    // the finished image and prompt its
    // download.

    // Get all necessary data.

    const pos = getBannerPosition();
    const color = getBannerColor();
    const title = getTitle();

    // Create form to send the data
    const form = document.createElement('form');
    form.action = makeImageRoute;
    form.method = 'POST';

    const posInput = document.createElement('input');
    posInput.name = 'position';
    posInput.type = 'number';
    posInput.value = pos;

    const colorInput = document.createElement('input');
    colorInput.name = 'color';
    colorInput.type = 'text';
    colorInput.value = color;

    const titleInput = document.createElement('input');
    titleInput.name = 'title';
    titleInput.type = 'text';
    titleInput.value = title;

    form.appendChild(posInput);
    form.appendChild(colorInput);
    form.appendChild(titleInput);

    asyncMakeImage(form);
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
