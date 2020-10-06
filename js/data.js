'use strict';
(function () {
  const NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  const SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  const WIZARDS_AMOUNT = 4;

  const getWizards = function (amount, names, surnames, coats, eyes) {
    let wizards = [];

    for (let i = 0; i < amount; i++) {
      let wizard = {};
      wizard.name = window.utils.getRandomElement(names) + ' ' + window.utils.getRandomElement(surnames);
      wizard.coatColor = window.utils.getRandomElement(coats);
      wizard.eyesColor = window.utils.getRandomElement(eyes);

      wizards.push(wizard);
    }
    return wizards;
  };

  let wizards = getWizards(WIZARDS_AMOUNT, NAMES, SURNAMES, window.utils.COAT_COLORS, window.utils.EYES_COLORS);

  // (3) Функция для клонирования и заполнения шаблона
  // Ищу шаблон
  let similarWizardTemplate = document.querySelector('#similar-wizard-template')
      .content
      .querySelector('.setup-similar-item');

  let renderWizard = function (wizard) {
    let wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

    return wizardElement;
  };

  // (4) Создаю фрагмент, заполняю фрагмент, добавляю фрагмент в DOM
  let fragment = document.createDocumentFragment();

  for (let i = 0; i < WIZARDS_AMOUNT; i++) {
    fragment.appendChild(renderWizard(wizards[i]));
  }

  let setupSimilarList = document.querySelector('.setup-similar-list');
  setupSimilarList.appendChild(fragment);

  // (5) Показываю результат
  document.querySelector('.setup-similar').classList.remove('hidden');
})();
