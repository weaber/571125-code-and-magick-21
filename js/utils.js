'use strict';

const getRandomElement = function (array) {
  return array[Math.floor(Math.random() * array.length)];
};

window.utils = {
  getRandomElement
};
