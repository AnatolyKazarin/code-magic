'use strict';

(function () {
  var wizards = [];

  var getRank = function(wizard){
    var rank = 0;
    if(wizard.colorCoat === window.myWizard.coatColor){
      rank +=2;
    }
    if(wizard.colorEyes === window.myWizard.eyesColor){
      rank +=1;
    }
    if(wizard.colorFireball === window.myWizard.fireballColor){
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

  var wizardsComparator = function(left, right){
    var rankDiff = getRank(right) - getRank(left);
    return rankDiff === 0 ? namesComparator(left.name, right.name) : rankDiff;
  }

  var updateFilter = function(){
    window.render(wizards.sort(wizardsComparator));
  }

  var lastTimeout;

  window.myWizard.onChange = function () {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(function () {
        updateFilter();
    }, 300);
  }

  var successHandler = function(data){
    wizards = data;
    updateFilter();
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
})();
