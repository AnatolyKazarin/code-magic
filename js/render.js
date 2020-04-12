'use strict';

//
// Модуль отрисовки похожих волшебников.
//

(function () {
  var similarListElement = document.querySelector('.setup-similar-list');

  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

  var renderWizard = function(wizard){
    var wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;

    return wizardElement;
  }

  var coatColor;
  var eyesColor;
  var fireballColor;
  var wizards = [];

  var getRank = function(wizard){
    var rank = 0;

    if(wizard.colorCoat === coatColor){
      rank +=2;
    }
    if(wizard.colorEyes === eyesColor){
      rank +=1;
    }
    if(wizard.colorFireball ===fireballColor){
      rank +=1;
    }

    return rank;
  }

  var namesComparator = function(left, right){
    if (left > right){
      return 1;
    } else if (left < right) {
      return -1;
    } else {
      return 0;
    }
  }

  var fragment = document.createDocumentFragment();

  var updateWizards = function () {
    similarListElement.innerHTML = '';
    renderWizard(wizards.sort(function(left, right){
      var rankDiff = getRank(right) - getRank(left);
      if (rankDiff === 0) {
        rankDiff = namesComparator(left.name, right.name);
      }
      return rankDiff;
    }));

    for (var i = 0; i < 4; i++) {
      fragment.appendChild(renderWizard(wizards[i]));
    }
    similarListElement.appendChild(fragment);

    setup.querySelector('.setup-similar').classList.remove('hidden');
  }

  var lastTimeout;

  window.wizard.onEyesChange = function(color){
    eyesColor = color;
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(function () {
      updateWizards();
    }, 300);
  }

  window.wizard.onCoatChange = function(color){
    coatColor = color;
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(function () {
      updateWizards();
    }, 300);
  }

  window.wizard.onFireballChange = function(color){
    fireballColor = color;
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(function () {
      updateWizards();
    }, 300);
  }

  var successHandler = function(data){
    wizards = data;
    updateWizards();
  };

  var errorHandler = function(errorMessage){
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.load(successHandler, errorHandler);

  var form = document.querySelector('.setup-wizard-form');
  form.addEventListener('submit', function(evt){
    window.upload(new FormData(form), function(response){
      setup.classList.add('hidden');
    });
    evt.preventDefault();
  });
})();
