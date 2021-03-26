/* Create a drop area to receive file uploads.
To use this, create a div with id='drop-area' where you will receive the files
You can also add a <p></p> element with id='drop-area-text' with text to show when
dropping files

tailwind class: 
  #drop-area {
      @apply flex flex-col min-h-screen min-w-full items-center justify-center m-0 fixed bg-black;
      @apply transition-all ease-in duration-150;
    }

Additionally, the element must have the following classes on the html element, in line:
    class="hidden opacity-0"
  
The full element would be like:
  <div id="drop-area" class="hidden opacity-0 -z-10"></div>
*/


let dropArea = document.getElementById('drop-area');

if (document.getElementById('drop-area-text')) {
  var dropAreaText = document.getElementById('drop-area-text');
}

let fileInput = document.getElementById('image');

dropArea.addEventListener('dragover', function(e) {
  // Prevent default to allow for drop without triggering other actions
  e.preventDefault();
}, false);

dropArea.addEventListener('drop', function(evt) {
  // Prevent default to allow for drop
  evt.preventDefault();
  fileInput.files = evt.dataTransfer.files;
  hideDropArea();
});

/* lastTarget is set first on dragenter, then
compared with during dragleave. */
var lastTarget = null;

window.addEventListener("dragenter", function(e)
{
    lastTarget = e.target; // cache the last target here
    // unhide our dropzone overlay
    showDropArea();
});

window.addEventListener("dragleave", function(e)
{
    // this is the magic part. when leaving the window,
    // e.target happens to be exactly what we want: what we cached
    // at the start, the dropzone we dragged into.
    // so..if dragleave target matches our cache, we hide the dropzone.
    // `e.target === document` is a workaround for Firefox 57
    if(e.target === lastTarget || e.target === document)
    {
      hideDropArea();
    }
});

function showDropArea() {
  // Send drop area to the front to be able to drop files anywhere on the page
  dropArea.classList.remove('-z-10');
  dropArea.classList.add('z-10');
  // show(dropArea);
  dropArea.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
}

function hideDropArea(){ 
  // Send drop area behind all elements to prevent form blocking them
  dropArea.classList.add('-z-10');
  dropArea.classList.remove('z-10');
  // hide(dropArea);
  dropArea.style.backgroundColor = "rgba(0, 0, 0, 0)";
}

function show(element){
  element.classList.remove('hide');
}

function hide(element){
  element.classList.add('hide');
}