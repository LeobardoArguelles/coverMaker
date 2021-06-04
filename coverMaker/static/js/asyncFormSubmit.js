
// README!!!!!!!!!!
// Add event listener 'submit' to the form you wish to subit asynchronously
// Please please please use addEventListener('submit', function(e) {asyncSubmit(e)})
// For some reason, the attribute onsubmit doesn't work the same way, and
// e.preventDefault() doesn't work. Save yourself some trouble and add the listener
// using js.

function asyncSubmit(e) {
  // Store reference to form to make later code easier to read
  const form = e.target;

  console.log('aaaaaa');
  // Post data using the Fetch API
  fetch(form.action, {
    method: form.method,
    body: new FormData(form),
  })
  .then(response => response.json())
    .then((data) => {
    if (data['kind'] === 'success') {
      flashSuccess(data['message']);
    }
    else if (data['kind'] === 'error') {
      flashError(data['message']);
    }
    else if (data['kind'] === 'src') {
      imgPrev.src = data['message'];
      activateNav();
      // Wait a little bit to allow image to load
      setTimeout(addShadows, 250);
    }
    else {
      flashError('Ha ocurrido un error. Intenta de nuevo.');
    }
  });

  // Prevent the default form submit
  e.preventDefault();

}



function clearForm(form) {
  // Cleans all inputs of form
  let formChildren = form.children;

  for (let i = 0; i < formChildren.length; i++) {
    formChildren[i].value = '';
  }
}

function clearField(field) {
  // Cleans a specific input in a form
  field.value = '';
}


function asyncGetFiles(e) {
  // Store reference to form to make later code easier to read
  const form = e.target;
  // Post data using the Fetch API
  fetch(form.action, {
    method: form.method,
    body: new FormData(form),
  })
  .then(response => response.json())
  .then((data) => {
    loadFiles(data);
  });


  // Prevent the default form submit
  e.preventDefault();
}


function asyncSendImage(form) {

  // Post data using the Fetch API
  fetch(form.action, {
    method: form.method,
    body: new FormData(form),
  })
  .then(response => response.json())
    .then((data) => {
    if (data['kind'] === 'success') {
      flashSuccess(data['message']);
    }
    else if (data['kind'] === 'error') {
      flashError(data['message']);
      reset();
    }
    else if (data['kind'] === 'src') {
      removeShadows();
      changeImage(data['message']);
    }
    else {
      flashError('Ha ocurrido un error. Intenta de nuevo.');
    }
  });
}


function asyncMakeImage(form) {

  console.log('makeing');
  // Post data using the Fetch API
  fetch(form.action, {
    method: form.method,
    body: new FormData(form),
  });
}
