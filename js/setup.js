'use strict';

//
// Открытие и закрытие окна выбора и настройки персонажа
//

var setup = document.querySelector('.setup');

var setupOpen = document.querySelector('.setup-open');

var setupClose = document.querySelector('.setup-close');

var setupUserName = document.querySelector('.setup-user-name');

var openPopup = function(){
  setup.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = function(){
  setup.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

var onPopupEscPress = function(evt){
  if (evt.keyCode === 27) {
    closePopup();
  }
};

setupUserName.addEventListener('focus', function(){
  document.removeEventListener('keydown', onPopupEscPress);
});

setupOpen.addEventListener('click', function(){
  openPopup();
});

setupOpen.addEventListener('keydown', function(evt){
  if (evt.keyCode === 13) {
    openPopup();
  }
});

setupClose.addEventListener('click', function(){
  closePopup();
});

setupClose.addEventListener('keydown', function(evt){
  if (evt.keyCode === 13) {
    closePopup();
  }
});

//
// Запрос на сервер и получение созданных игроков
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

  var successHandler = function(wizards){
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < 4; i++) {
      fragment.appendChild(renderWizard(wizards[i]));
    }
    similarListElement.appendChild(fragment);

    setup.querySelector('.setup-similar').classList.remove('hidden');
  };

  var errorHandler = function(errorMessage){
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; backgroundColor: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontsize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.load(successHandler, errorHandler);

  var form = setup.querySelector('.setup-wizard-form');
  form.addEventListener('submit', function(evt){
    window.upload(new FormData(form), function(response){
      setup.classList.add('hidden');
    });
    evt.preventDefault();
  });
})();

//
// Кастомизация персонажа
//

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
};

var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

var wizardCoat = document.querySelector('.setup-wizard .wizard-coat');

var wizardEyes = document.querySelector('.setup-wizard .wizard-eyes');

var wizardFireball = document.querySelector('.setup-fireball-wrap');

wizardCoat.style.cursor = "pointer";
wizardEyes.style.cursor = "pointer";
wizardFireball.style.cursor = "pointer";

wizardCoat.addEventListener('click', function(){
  var wizardCoatColor = COAT_COLORS[getRandomInt(COAT_COLORS.length)];
  wizardCoat.style.fill = wizardCoatColor;
  document.querySelector('input[name="coat-color"]').value = wizardCoatColor;
});

wizardEyes.addEventListener('click', function(){
  var wizardEyesColor = EYES_COLORS[getRandomInt(EYES_COLORS.length)];
  wizardEyes.style.fill = wizardEyesColor;
  document.querySelector('input[name="eyes-color"]').value = wizardEyesColor;
});

wizardFireball.addEventListener('click', function(){
  var wizardFireballColor = FIREBALL_COLORS[getRandomInt(FIREBALL_COLORS.length)];
  wizardFireball.style.backgroundColor = wizardFireballColor;
  document.querySelector('input[name="fireball-color"]').value = wizardFireballColor;
});

//
// Перетаскивание окна
//

(function(){

  var setupDialogElement = document.querySelector('.setup');
  var dialogHandler = setupDialogElement.querySelector('.upload');

  dialogHandler.addEventListener('mousedown', function(evt){
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var dragged = false;

    var onMouseMove = function(moveEvt){
      moveEvt.preventDefault();
      dragged = true;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      setupDialogElement.style.top = (setupDialogElement.offsetTop - shift.y) + 'px';
      setupDialogElement.style.left = (setupDialogElement.offsetLeft - shift.x) + 'px';
    };

    var onMouseUp = function(upEvt){
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if(dragged){
        var onClickPreventDefault = function(evt){
          evt.preventDefault();
          dialogHandler.removeEventListener('click', onClickPreventDefault)
        };
        dialogHandler.addEventListener('click', onClickPreventDefault);
      }
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
