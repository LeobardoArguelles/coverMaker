
function flashError(msg) {
  flashMessage(msg, 'error');
}

function flashSuccess(msg) {
  flashMessage(msg, 'success');
}

function flashInfo(msg) {
  flashMessage(msg, 'msg', 2500);
}

function flashMessage(msg, kind, duration=5000) {
  // Flash an error message without refreshing the page
  // You must have a div with id="flash-placeholder" where you want to show the messages
  const DURATION = duration;
  let container = document.createElement('div');
  let position = document.getElementById('flash-placeholder');

  container.innerText = msg;
  container.classList.add('sticky', 'top-0', 'text-white', 'text-xl', 'w-full', 'text-center', kind);

  document.body.insertBefore(container, position);

  setTimeout(function() {
    clearFlashedMessage(container);
  }, DURATION);
}

function clearFlashedMessage(element) {
  element.parentNode.removeChild(element);
}
