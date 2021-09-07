'use strict';

(function () {
  const formPopup = document.querySelector('.form-popup');
  const successPopup = document.querySelector('.result-popup[data-popup="success"]');
  const errorPopup = document.querySelector('.result-popup[data-popup="error"]');
  const form = document.querySelector('.form-popup form');
  const formBtn = document.querySelector('.form-popup .form-popup__btn');
  const textarea = document.querySelector('.form-popup textarea');
  const input = document.querySelectorAll('.form-popup input');
  const body = document.querySelector('body');

  let stopSubmit = false;

  const successForm = function() {
    formPopup.classList.add('hidden');
    successPopup.classList.remove('hidden');
    setTimeout(() => successPopup.classList.add('hidden'), 1000);
    body.style = '';
  };

  const errorForm = function() {
    formPopup.classList.add('hidden');
    errorPopup.classList.remove('hidden');
    setTimeout(() => errorPopup.classList.add('hidden'), 1000);
    body.style = '';
  };

  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    if (!stopSubmit) {
      window.backend.upload(
        new FormData(form),
        successForm,
        errorForm
      );
    }
  });

  const getTrueTextarea = function () {
    if (textarea.value.length < 3) {
      textarea.classList.add('invalid');
      textarea.setCustomValidity('Не меньше трёх букв!');
      stopSubmit = true;
    } else {
      textarea.classList.remove('invalid');
      textarea.setCustomValidity('');
      stopSubmit = false;
    }
  }

  const getTrueInput = function (thisInput) {
    if (thisInput.value.length < 1) {
      thisInput.classList.add('invalid');
      thisInput.setCustomValidity('Не должен быть пустой!');
      stopSubmit = true;
    } else {
      thisInput.classList.remove('invalid');
      thisInput.setCustomValidity('');
      stopSubmit = false;
    }
  }

  formBtn.addEventListener('click' , function() {
    getTrueTextarea();

    input.forEach(function(item) {
      getTrueInput(item);
    });
  })

  textarea.addEventListener('input' , function() {
    getTrueTextarea();
  })

  input.forEach(function(item) {
    item.addEventListener('input' , function() {
      getTrueInput(this);
    })
  });
})();
