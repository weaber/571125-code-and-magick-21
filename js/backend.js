'use strict';

(function () {
  const SAVE_URL = `https://21.javascript.pages.academy/code-and-magick`;
  const LOAD_URL = `https://21.javascript.pages.academy/code-and-magick/data`;

  const save = function (data, onLoad, onError) {
    // Создал объект для запроса на сервер
    let xhr = new XMLHttpRequest();
    // Задал тип ответа, чтобы не парсить
    xhr.responseType = `json`;

    // При получении ответа от сервера выполнится этот код
    xhr.addEventListener(`load`, function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError(`Статус ответа ${xhr.status}. ${xhr.statusText}`);
      }
    });

    // Открывю запрос на сервер
    xhr.open(`POST`, SAVE_URL);
    // Отправляю запрос на сервер
    xhr.send(data);
  };

  const load = function (onLoad, onError) {
    let xhr = new XMLHttpRequest();
    xhr.responseType = `json`;

    xhr.open(`GET`, LOAD_URL);

    xhr.addEventListener(`load`, function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError(`Статус ответа ${xhr.status}. ${xhr.statusText}`);
      }
    });

    // xhr.timeout = 10;

    xhr.addEventListener(`error`, function () {
      onError(`Произошла ошибка соединения`);
    });
    xhr.addEventListener(`timeout`, function () {
      onError(`Запрос не успел выполниться за ${xhr.timeout} мс`);
    });

    xhr.send();
  };

  window.backend = {
    save,
    load
  };
})();
