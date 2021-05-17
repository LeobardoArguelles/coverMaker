function raiseBanner() {
    // Change the height of the position banner
    // to move up the bannerDiv
    let banner = document.getElementById('posBanner');
    let bannerHeight = parseHeight(banner.style.height);

    if (bannerHeight > 0) {
        banner.style.height = (bannerHeight + 1).toString() + 'px';

        mouseIsDown = true;
        setTimeout(function() {
            if(mouseIsDown) {
                raiseBanner();
            }
        }, 25);
    }
}

function lowerBanner() {
    // Change the height of the position banner
    // to move down the bannerDiv
    let banner = document.getElementById('posBanner');
    let bannerHeight = parseHeight(banner.style.height);

    if (bannerHeight > 0) {
        banner.style.height = (bannerHeight - 1).toString() + 'px';

        mouseIsDown = true;
        setTimeout(function() {
            if(mouseIsDown) {
                lowerBanner();
            }
        }, 25);
    }
}

function changeBannerColor(color) {
    // Change banner div background color, with a color
    // selected with the color picker element.

    const banner = document.getElementById('banner');
    banner.style.backgroundColor = color;
}
