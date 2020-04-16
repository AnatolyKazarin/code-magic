'use strict';

// Функция настройки открытия и закрытия окна setup настройки персонажа.
// И функция перетаскивания окна.

var setup = document.querySelector('.setup');

(function(){
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
})();

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
