'use strict';

(function () {
  let coat = document.querySelector('.setup-wizard .wizard-coat');
  let eyes = document.querySelector('.setup-wizard .wizard-eyes');
  let fireball = document.querySelector('.setup-fireball-wrap');

  window.utils.colorizeElement(coat, window.utils.COAT_COLORS);
  window.utils.colorizeElement(eyes, window.utils.EYES_COLORS);
  window.utils.colorizeElement(fireball, window.utils.FIREBALL_COLORS);
})();
