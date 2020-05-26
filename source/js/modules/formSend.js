'use strict';

(function () {
  const formPopup = document.querySelector('.form-popup');
  const successPopup = document.querySelector('.success-popup');
  const form = document.querySelector('.form-popup form');

  const successForm = function() {
    formPopup.classList.add('hidden');
    successPopup.classList.remove('hidden');
    setTimeout(() => successPopup.classList.add('hidden'), 1000);
  };

  const errorForm = function() {
    alert('Беда!');
  };

  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.upload(
      new FormData(form),
      successForm,
      errorForm
    );
  });
})();