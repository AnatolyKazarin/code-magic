'use strict';

// Функция настройки открытия и закрытия окна setup настройки персонажа.
// И функция перетаскивания окна.

var setup = document.querySelector('.setup');

(function(){

  var setupOpen = document.querySelector('.setup-open');

  var setupClose = document.querySelector('.setup-close');

  var setupUserName = document.querySelector('.setup-user-name');

  // Функции открытия и закрытия окна.

  var openPopup = function(){
    setup.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);
  };

  var closePopup = function(){
    setup.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
  };

  // Закрытие окна при нажатии ESC.

  var onPopupEscPress = function(evt){
    if (evt.keyCode === 27) {
      closePopup();
    }
  };

  // Отключение ESC, когда поле ввода имени в фокусе

  setupUserName.addEventListener('focus', function(){
    document.removeEventListener('keydown', onPopupEscPress);
  });

  // Открытие окна при щелчке на иконке пользователя или нажатии Enter на иконке пользователя в состоянии фокуса.

  setupOpen.addEventListener('click', function(){
    openPopup();
  });

  setupOpen.addEventListener('keydown', function(evt){
    if (evt.keyCode === 13) {
      openPopup();
    }
  });

  // Закрытие окна при щелке на крестик или нажатии Enter, когда крестик в фокусе

  setupClose.addEventListener('click', function(){
    closePopup();
  });

  setupClose.addEventListener('keydown', function(evt){
    if (evt.keyCode === 13) {
      closePopup();
    }
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
  window.wizard.onCoatChange(wizardCoatColor);
});

wizardEyes.addEventListener('click', function(){
  var wizardEyesColor = EYES_COLORS[getRandomInt(EYES_COLORS.length)];
  wizardEyes.style.fill = wizardEyesColor;
  document.querySelector('input[name="eyes-color"]').value = wizardEyesColor;
  window.wizard.onEyesChange(wizardEyesColor);
});

wizardFireball.addEventListener('click', function(){
  var wizardFireballColor = FIREBALL_COLORS[getRandomInt(FIREBALL_COLORS.length)];
  wizardFireball.style.backgroundColor = wizardFireballColor;
  document.querySelector('input[name="fireball-color"]').value = wizardFireballColor;
  window.wizard.onFireballChange(wizardFireballColor);
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
