'use strict';

var userDialog = document.querySelector('.setup');

var setupOpen = document.querySelector('.setup-open');

var setupClose = document.querySelector('.setup-close');

var setupUserName = document.querySelector('.setup-user-name');

var onPopupEscPress = function(evt){
  if (evt.keyCode === 27) {
    closePopup();
  }
}

var openPopup = function(){
  userDialog.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

setupUserName.addEventListener('focus', function(){
  document.removeEventListener('keydown', onPopupEscPress);
});

var closePopup = function(){
  userDialog.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

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

var similarListElement = document.querySelector('.setup-similar-list');

var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');


function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

//
// Задание цвета магу и произвольные 4 мага снизу
//

var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

var wizards = [];
for (var i = 0; i < 4; i++) {
  wizards[i] = {
    name: NAMES[getRandomInt(NAMES.length)] + ' ' + SURNAMES[getRandomInt(SURNAMES.length)],
    coatColor: COAT_COLORS[getRandomInt(COAT_COLORS.length)],
    eyesColor: EYES_COLORS[getRandomInt(EYES_COLORS.length)]
  }
};

var renderWizard = function(wizard){
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
}

var fragment = document.createDocumentFragment();
for (var i = 0; i < 4; i++) {
  fragment.appendChild(renderWizard(wizards[i]));
}
similarListElement.appendChild(fragment);

userDialog.querySelector('.setup-similar').classList.remove('hidden');

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