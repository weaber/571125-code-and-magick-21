'use strict';

(function () {
  const COAT_COLORS = [`rgb(101, 137, 164)`, `rgb(241, 43, 107)`, `rgb(146, 100, 161)`, `rgb(56, 159, 117)`, `rgb(215, 210, 55)`, `rgb(0, 0, 0)`];
  const EYES_COLORS = [`black`, `red`, `blue`, `yellow`, `green`];
  const FIREBALL_COLORS = [`#ee4830`, `#30a8ee`, `#5ce6c0`, `#e848d5`, `#e6e848`];
  let wizardCoatElement = document.querySelector(`.setup-wizard .wizard-coat`);
  let wizardEyesElement = document.querySelector(`.setup-wizard .wizard-eyes`);
  let wizardFireballElement = document.querySelector(`.setup-fireball-wrap`);
  let coatColor = `rgb(101, 137, 164)`;
  let eyesColor = `black`;
  let wizards = [];

  const getRank = function (wizard) {
    let rank = 0;
    if (wizard.colorCoat === coatColor) {
      rank += 2;
    }
    if (wizard.colorEyes === eyesColor) {
      rank += 1;
    }
    return rank;
  };

  const namesComparator = function (left, right) {
    if (left > right) {
      return 1;
    } else if (left < right) {
      return -1;
    } else {
      return 0;
    }
  };

  const updateWizards = function () {
    window.render.renderSimilarWizards(wizards.sort(function (left, right) {
      let rankDiff = getRank(right) - getRank(left);
      if (rankDiff === 0) {
        rankDiff = namesComparator(left.name, right.name);
      }
      return rankDiff;
    }));
  };

  const updateWizardsWithDebounce = window.debounce(updateWizards);

  wizardCoatElement.addEventListener(`click`, function () {
    const newColor = window.utils.getRandomElement(COAT_COLORS);
    wizardCoatElement.style.fill = newColor;
    document.querySelector(`input[name="coat-color"]`).value = newColor;
    coatColor = newColor;
    updateWizardsWithDebounce();
  });

  wizardEyesElement.addEventListener(`click`, function () {
    const newColor = window.utils.getRandomElement(EYES_COLORS);
    wizardEyesElement.style.fill = newColor;
    document.querySelector(`input[name="eyes-color"]`).value = newColor;
    eyesColor = newColor;
    updateWizardsWithDebounce();
  });

  wizardFireballElement.addEventListener(`click`, function () {
    const newColor = window.utils.getRandomElement(FIREBALL_COLORS);
    wizardFireballElement.style.backgroundColor = newColor;
    document.querySelector(`input[name="fireball-color"]`).value = newColor;
  });

  const successHandler = function (data) {
    wizards = data;
    updateWizards();
  };

  const errorHandler = function (errorMessage) {
    const node = document.createElement(`div`);
    node.style = `
    z-index: 100;
    margin: 0 auto;
    text-align: center;
    background-color: red;
    position: absolute;
    left: 0;
    right: 0;
    font-size: 30px;
    `;
    node.textContent = errorMessage;
    document.body.insertAdjacentElement(`afterbegin`, node);
  };

  window.backend.load(successHandler, errorHandler);
})();
