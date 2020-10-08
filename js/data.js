'use strict';

(function () {
  const NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  const SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  const WIZARDS_AMOUNT = 4;

  const generateWizards = function (amount, names, surnames, coats, eyes) {
    const wizards = [];

    for (let i = 0; i < amount; i++) {
      const wizard = {};
      wizard.name = window.utils.getRandomElement(names) + ' ' + window.utils.getRandomElement(surnames);
      wizard.coatColor = window.utils.getRandomElement(coats);
      wizard.eyesColor = window.utils.getRandomElement(eyes);

      wizards.push(wizard);
    }
    return wizards;
  };

  const wizards = generateWizards(
      WIZARDS_AMOUNT,
      NAMES,
      SURNAMES,
      window.utils.COAT_COLORS,
      window.utils.EYES_COLORS
  );

  // (3) Функция для клонирования и заполнения шаблона
  // Ищу шаблон
  const similarWizardTemplate = document.querySelector('#similar-wizard-template')
      .content
      .querySelector('.setup-similar-item');

  const renderWizard = function (wizard) {
    const wizardTemplate = similarWizardTemplate.cloneNode(true);

    wizardTemplate.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardTemplate.querySelector('.wizard-coat').style.fill = wizard.coatColor;
    wizardTemplate.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

    return wizardTemplate;
  };

  // (4) Создаю фрагмент, заполняю фрагмент, добавляю фрагмент в DOM
  const wizardsContainerFragment = document.createDocumentFragment();

  for (let i = 0; i < WIZARDS_AMOUNT; i++) {
    wizardsContainerFragment.appendChild(renderWizard(wizards[i]));
  }

  const setupSimilarListElement = document.querySelector('.setup-similar-list');
  setupSimilarListElement.appendChild(wizardsContainerFragment);

  // (5) Показываю результат
  document.querySelector('.setup-similar').classList.remove('hidden');
})();
