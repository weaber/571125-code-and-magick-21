'use strict';

(function () {
  const WIZARDS_AMOUNT = 4;

  const similarWizardTemplate = document.querySelector(`#similar-wizard-template`)
      .content
      .querySelector(`.setup-similar-item`);

  const renderWizard = function (wizard) {
    const wizardTemplate = similarWizardTemplate.cloneNode(true);

    wizardTemplate.querySelector(`.setup-similar-label`).textContent = wizard.name;
    wizardTemplate.querySelector(`.wizard-coat`).style.fill = wizard.coatColor;
    wizardTemplate.querySelector(`.wizard-eyes`).style.fill = wizard.eyesColor;

    return wizardTemplate;
  };

  const successHandler = function (wizards) {
    const wizardsContainerFragment = document.createDocumentFragment();

    for (let i = 0; i < WIZARDS_AMOUNT; i++) {
      wizardsContainerFragment.appendChild(renderWizard(window.utils.getRandomElement(wizards)));
    }

    const setupSimilarListElement = document.querySelector(`.setup-similar-list`);
    setupSimilarListElement.appendChild(wizardsContainerFragment);

    document.querySelector(`.setup-similar`).classList.remove(`hidden`);
  };

  const errorHandler = function (errorMessage) {
    const node = document.createElement(`div`);
    node.style = `z-index: 100; margin: 0 auto; text-align: center; background-color: red;`;
    node.style.position = `absolute`;
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = `30px`;

    node.textContent = errorMessage;
    document.body.insertAdjacentElement(`afterbegin`, node);
  };

  window.backend.load(successHandler, errorHandler);

})();
