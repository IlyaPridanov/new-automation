// Подключение js-файлов с помощью rigger-а
// Vendor
// Modules
'use strict';

(function () {
  var headerNavBtn = document.querySelector('.header__button');
  var headerNav = document.querySelector('.header__nav');

  var getOpenNav = function getOpenNav(link) {
    link.addEventListener('click', function () {
      link.classList.toggle('header__button--active');
      headerNav.classList.toggle('header__nav--inactive');
    });
  };

  getOpenNav(headerNavBtn);
})();

'use strict';

(function () {
  var footerTopBtn = document.querySelector('.footer-top__btn');
  var formPopup = document.querySelector('.form-popup');
  var formPopupExit = document.querySelector('.form-popup__btn-exit');
  var body = document.querySelector('body');

  var getOpen = function getOpen() {
    var div = document.createElement('div');
    div.style.overflowY = 'scroll';
    div.style.width = '50px';
    div.style.height = '50px';
    document.body.append(div);
    var scrollWidth = div.offsetWidth - div.clientWidth;
    div.remove();
    formPopup.classList.remove('hidden');
    body.style.overflow = 'hidden';
    body.style.paddingRight = scrollWidth + 'px';
  };

  var getClose = function getClose() {
    formPopup.classList.add('hidden');
    body.style = '';
  };

  footerTopBtn.addEventListener('click', function () {
    getOpen();
  });
  formPopupExit.addEventListener('click', function () {
    getClose();
  });
  formPopup.addEventListener('click', function (event) {
    if (event.target === this) {
      getClose();
    }
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === "Escape") {
      getClose();
    }
  });
})();

'use strict';

(function () {
  var URL_UPLOAD = 'https://httpbin.org/post';
  var NORMAL_STATUS = 200;

  var upload = function upload(data, onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      if (xhr.status === NORMAL_STATUS) {
        onLoad(xhr.response);
      } else {
        onError();
      }
    });
    xhr.addEventListener('error', function () {
      onError();
    });
    xhr.open('POST', URL_UPLOAD);
    xhr.send(data);
  };

  window.backend = {
    upload: upload
  };
})();

'use strict';

(function () {
  var formPopup = document.querySelector('.form-popup');
  var successPopup = document.querySelector('.result-popup[data-popup="success"]');
  var errorPopup = document.querySelector('.result-popup[data-popup="error"]');
  var form = document.querySelector('.form-popup form');
  var formBtn = document.querySelector('.form-popup .form-popup__btn');
  var textarea = document.querySelector('.form-popup textarea');
  var input = document.querySelectorAll('.form-popup input');
  var body = document.querySelector('body');
  var stopSubmit = false;

  var successForm = function successForm() {
    formPopup.classList.add('hidden');
    successPopup.classList.remove('hidden');
    setTimeout(function () {
      return successPopup.classList.add('hidden');
    }, 1000);
    body.style = '';
  };

  var errorForm = function errorForm() {
    formPopup.classList.add('hidden');
    errorPopup.classList.remove('hidden');
    setTimeout(function () {
      return errorPopup.classList.add('hidden');
    }, 1000);
    body.style = '';
  };

  form.addEventListener('submit', function (evt) {
    evt.preventDefault();

    if (!stopSubmit) {
      window.backend.upload(new FormData(form), successForm, errorForm);
    }
  });

  var getTrueTextarea = function getTrueTextarea() {
    if (textarea.value.length < 3) {
      textarea.classList.add('invalid');
      textarea.setCustomValidity('Не меньше трёх букв!');
      stopSubmit = true;
    } else {
      textarea.classList.remove('invalid');
      textarea.setCustomValidity('');
      stopSubmit = false;
    }
  };

  var getTrueInput = function getTrueInput(thisInput) {
    if (thisInput.value.length < 1) {
      thisInput.classList.add('invalid');
      thisInput.setCustomValidity('Не должен быть пустой!');
      stopSubmit = true;
    } else {
      thisInput.classList.remove('invalid');
      thisInput.setCustomValidity('');
      stopSubmit = false;
    }
  };

  formBtn.addEventListener('click', function () {
    getTrueTextarea();
    input.forEach(function (item) {
      getTrueInput(item);
    });
  });
  textarea.addEventListener('input', function () {
    getTrueTextarea();
  });
  input.forEach(function (item) {
    item.addEventListener('input', function () {
      getTrueInput(this);
    });
  });
})();