'use strict';

(function () {
  const footerTopBtn = document.querySelector('.footer-top__btn');
  const formPopup = document.querySelector('.form-popup');
  const formPopupExit = document.querySelector('.form-popup__btn-exit');
  const body = document.querySelector('body');

  const getOpen = function () {
    let div = document.createElement('div');
    div.style.overflowY = 'scroll';
    div.style.width = '50px';
    div.style.height = '50px';
    document.body.append(div);
    let scrollWidth = div.offsetWidth - div.clientWidth;
    div.remove();

    formPopup.classList.remove('hidden');
    body.style.overflow = 'hidden';
    body.style.paddingRight = scrollWidth + 'px';
  };

  const getClose = function () {
    formPopup.classList.add('hidden');
    body.style = '';
  };

  footerTopBtn.addEventListener('click' , function() {
    getOpen();
  })

  formPopupExit.addEventListener('click' , function() {
    getClose();
  })

  formPopup.addEventListener('click' , function(event) {
    if (event.target === this) {
      getClose();
    }
  })

  document.addEventListener('keydown', function(e) {
    if (e.key === "Escape") {
      getClose();
    }
  });

})();
