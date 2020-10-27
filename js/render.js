'use strict';

const WIZARDS_AMOUNT = 4;

const similarWizardTemplate = document.querySelector(`#similar-wizard-template`)
    .content
    .querySelector(`.setup-similar-item`);

const renderWizard = function (wizard) {
  const wizardTemplate = similarWizardTemplate.cloneNode(true);

  wizardTemplate.querySelector(`.setup-similar-label`).textContent = wizard.name;
  wizardTemplate.querySelector(`.wizard-coat`).style.fill = wizard.colorCoat;
  wizardTemplate.querySelector(`.wizard-eyes`).style.fill = wizard.colorEyes;

  return wizardTemplate;
};

const similar = document.querySelector(`.setup-similar`);
const setupSimilarListElement = document.querySelector(`.setup-similar-list`);

const renderSimilarWizards = function (wizards) {
  const takeNumber = wizards.length > WIZARDS_AMOUNT
    ? WIZARDS_AMOUNT
    : wizards.length;

  setupSimilarListElement.innerHTML = ``;

  for (let i = 0; i < takeNumber; i++) {
    setupSimilarListElement.appendChild(renderWizard(wizards[i]));
  }
  similar.classList.remove(`hidden`);
};

window.render = {
  renderSimilarWizards
};
