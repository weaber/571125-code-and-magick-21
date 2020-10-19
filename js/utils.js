'use strict';

(function () {

  const getRandomElement = function (array) {
    return array[Math.floor(Math.random() * array.length)];
  };

  window.utils = {
    getRandomElement
  };
})();

