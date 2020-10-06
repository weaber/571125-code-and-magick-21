'use strict';

(function () {
  window.utils = {
    COAT_COLORS: ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'],
    EYES_COLORS: ['black', 'red', 'blue', 'yellow', 'green'],
    FIREBALL_COLORS: ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'],

    getRandomElement: function (array) {
      return array[Math.floor(Math.random() * array.length)];
    },

    colorizeElement: function (element, colors) {
      element.addEventListener('click', function () {
        let randomColor = window.utils.getRandomElement(colors);
        element.value = randomColor;
        if (element.tagName.toLowerCase() === 'div') {
          element.style.backgroundColor = randomColor;
        } else {
          element.setAttribute('style', 'fill: ' + randomColor);
        }
      });
    }
  };
})();

