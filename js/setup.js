'use strict';

// (1) Показываю блок .setup
let userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');

// (2) Из исходных данных генерирую таблицу с 4-мя волшебниками
const NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
const SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
const COATS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
const EYES = ['black', 'red', 'blue', 'yellow', 'green'];
const WIZARDS_AMOUNT = 4;

// Структура объекта wizard
// {
//   name: '',
//   coatColor: '',
//   eyesColor: ''
// }

// Рандомайзер для вытаскивания рандом элемента из массива
const randomElement = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

// Функция генерации массива волшебников с характеристиками из исходных данных
const getWizards = function (amount, names, surnames, coats, eyes) {

  let wizards = [];

  for (let i = 0; i < amount; i++) {
    let wizard = {};
    wizard.name = randomElement(names) + ' ' + randomElement(surnames);
    wizard.coatColor = randomElement(coats);
    wizard.eyesColor = randomElement(eyes);

    wizards.push(wizard);
  }
  return wizards;
};

let wizards = getWizards(WIZARDS_AMOUNT, NAMES, SURNAMES, COATS, EYES);

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
