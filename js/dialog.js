'use strict';

(function () {
  let setup = document.querySelector('.setup');
  let setupOpen = document.querySelector('.setup-open');
  let setupClose = document.querySelector('.setup-close');
  const setupStartCoords = {
    x: '50%',
    y: '80px'
  };

  let onSetupPopupEscPress = function (evt) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      closeSetupPopup();
    }
  };

  let openSetupPopup = function () {
    setup.style.left = setupStartCoords.x;
    setup.style.top = setupStartCoords.y;
    setup.classList.remove('hidden');
    document.addEventListener('keydown', onSetupPopupEscPress);
  };

  let closeSetupPopup = function () {
    setup.classList.add('hidden');
    document.removeEventListener('keydown', onSetupPopupEscPress);
  };

  setupOpen.addEventListener('click', function () {
    openSetupPopup();
  });

  setupOpen.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter') {
      openSetupPopup();
    }
  });

  setupClose.addEventListener('click', function () {
    closeSetupPopup();
  });

  setupClose.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter') {
      closeSetupPopup();
    }
  });

  // Вешаю eventListener на поле input и запрещаю всплытие события, если нажат Escape, иначе выше его отловят и форма закроется
  // если не указать, что Escape, тогда нельзя будет имя вводить
  let inputUsername = setup.querySelector('input[name="username"]');
  inputUsername.addEventListener('keydown', function (evt) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      evt.stopPropagation();
    }
  });

  let dialogHandle = setup.querySelector('.upload');

  dialogHandle.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    let startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    let dragged = false;

    let onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;
      let shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      setup.style.left = (setup.offsetLeft - shift.x) + 'px';
      setup.style.top = (setup.offsetTop - shift.y) + 'px';
    };

    let onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (dragged) {
        let onClickPreventDefault = function (clickEvt) {
          clickEvt.preventDefault();
          dialogHandle.removeEventListener('click', onClickPreventDefault);
        };
        dialogHandle.addEventListener('click', onClickPreventDefault);
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
