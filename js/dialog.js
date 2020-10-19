'use strict';

(function () {
  const setupElement = document.querySelector(`.setup`);
  const wizardForm = setupElement.querySelector(`.setup-wizard-form`);
  const setupOpen = document.querySelector(`.setup-open`);
  const setupClose = document.querySelector(`.setup-close`);
  const SETUP_START_COORDS = {
    x: `50%`,
    y: `80px`
  };

  const onSetupPopupEscPress = function (evt) {
    if (evt.key === `Escape`) {
      evt.preventDefault();
      closeSetupPopup();
    }
  };

  let openSetupPopup = function () {
    setupElement.style.left = SETUP_START_COORDS.x;
    setupElement.style.top = SETUP_START_COORDS.y;
    setupElement.classList.remove(`hidden`);
    document.addEventListener(`keydown`, onSetupPopupEscPress);
  };

  let closeSetupPopup = function () {
    setupElement.classList.add(`hidden`);
    document.removeEventListener(`keydown`, onSetupPopupEscPress);
  };

  setupOpen.addEventListener(`click`, openSetupPopup);

  setupOpen.addEventListener(`keydown`, function (evt) {
    if (evt.key === `Enter`) {
      openSetupPopup();
    }
  });

  setupClose.addEventListener(`click`, closeSetupPopup);

  setupClose.addEventListener(`keydown`, function (evt) {
    if (evt.key === `Enter`) {
      closeSetupPopup();
    }
  });

  // Вешаю eventListener на поле input и запрещаю всплытие события, если нажат Escape, иначе выше его отловят и форма закроется
  // если не указать, что Escape, тогда нельзя будет имя вводить
  let inputUsername = setupElement.querySelector(`input[name="username"]`);
  inputUsername.addEventListener(`keydown`, function (evt) {
    if (evt.key === `Escape`) {
      evt.stopPropagation();
    }
  });

  let uploadDialogElement = setupElement.querySelector(`.upload`);

  uploadDialogElement.addEventListener(`mousedown`, function (evt) {
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

      setupElement.style.left = (setupElement.offsetLeft - shift.x) + `px`;
      setupElement.style.top = (setupElement.offsetTop - shift.y) + `px`;
    };

    let onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener(`mousemove`, onMouseMove);
      document.removeEventListener(`mouseup`, onMouseUp);

      if (dragged) {
        let onClickPreventDefault = function (clickEvt) {
          clickEvt.preventDefault();
          uploadDialogElement.removeEventListener(`click`, onClickPreventDefault);
        };
        uploadDialogElement.addEventListener(`click`, onClickPreventDefault);
      }
    };

    document.addEventListener(`mousemove`, onMouseMove);
    document.addEventListener(`mouseup`, onMouseUp);
  });

  wizardForm.addEventListener(`submit`, function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(wizardForm), function () {
      setupElement.classList.add(`hidden`);
    });
  });
})();
