'use strict';

//
// Кастомизация персонажа
//

(function () {

  var wizardCoat = document.querySelector('.setup-wizard .wizard-coat');
  var wizardEyes = document.querySelector('.setup-wizard .wizard-eyes');
  var wizardFireball = document.querySelector('.setup-fireball-wrap');

  wizardCoat.style.cursor = "pointer";
  wizardEyes.style.cursor = "pointer";
  wizardFireball.style.cursor = "pointer";

  var wizardName = document.querySelector('.setup-user-name');
  var wizard = new window.Wizard({name: wizardName.value});

  wizardCoat.addEventListener('click', function(){
    wizardCoat.style.fill = wizard.changeCoatColor();
    // document.querySelector('input[name="coat-color"]').value = wizardCoatColor;
  });

  wizardEyes.addEventListener('click', function(){
    wizardEyes.style.fill = wizard.changeEyesColor();
    // document.querySelector('input[name="eyes-color"]').value = wizardEyesColor;
  });

  wizardFireball.addEventListener('click', function(){
    wizardFireball.style.backgroundColor = wizard.changeFireballColor();
    // document.querySelector('input[name="fireball-color"]').value = wizardFireballColor;
  });

  window.myWizard = wizard;
})()
