'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;

var CLOUD_X = 150;
var CLOUD_Y = 10;

var GAP = 20;
var GAP_LEFT = 40;
var FONT_GAP = 15;

var BAR_GAP = 50;
var BAR_WIDTH = 40;

var MAX_HEIGHT = 150;

var renderCloud = function(ctx, x, y, color){
  ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
  ctx.fillRect(x + 10, y + 10, CLOUD_WIDTH, CLOUD_HEIGHT);

  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
}

var getMaxElement = function(arr) {
    var maxElement = arr[0];

    for (var i = 0; i < arr.length; i++) {
      if (arr[i]>maxElement) {
        maxElement = arr[i];
      }
    }

    return maxElement;
}

window.renderStatistics = function(ctx, players, times){
  var maxElement = getMaxElement(times);

  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';
  ctx.textBaseline = 'hanging';
  ctx.fillText('Ура вы победили!', CLOUD_X+GAP, CLOUD_Y+GAP);
  ctx.fillText('Список результатов (в мс.):', CLOUD_X+GAP, CLOUD_Y+16+GAP);
  for (var i = 0; i < players.length; i++) {

    ctx.fillStyle = 'black'
    ctx.fillText(Math.round(times[i]), CLOUD_X+GAP_LEFT+(BAR_GAP+BAR_WIDTH)*i, CLOUD_Y+(GAP+16*3)+(MAX_HEIGHT*(1-times[i]/maxElement)));
    ctx.fillText(players[i], CLOUD_X+GAP_LEFT+(BAR_GAP+BAR_WIDTH)*i, CLOUD_Y+(GAP+16*5)+MAX_HEIGHT);

    var tempColor = Math.round(10 * Math.random()) / 10;
    ctx.fillStyle = 'rgba(6, 24, 133, ' + tempColor + ')';
    if (players[i] == "Вы") {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    };
    ctx.fillRect(CLOUD_X+GAP_LEFT+(BAR_GAP+BAR_WIDTH)*i, CLOUD_Y+(GAP+16*4)+(MAX_HEIGHT*(1-times[i]/maxElement)), BAR_WIDTH, times[i]*MAX_HEIGHT/maxElement);
  }
  // ctx.fillText('Вы', CLOUD_X + GAP, CLOUD_Y + GAP + FONT_GAP);
  // ctx.fillRect(CLOUD_X + GAP + TEXT_WIDTH, CLOUD_Y + GAP, barWidth, BAR_HEIGHT);
  //
  // ctx.fillText('Иван', CLOUD_X + GAP, CLOUD_Y + GAP + FONT_GAP + GAP + BAR_HEIGHT);
  // ctx.fillRect(160, 90, 430, 20);
  //
  // ctx.fillText('Юлия', CLOUD_X + GAP, CLOUD_Y + GAP + FONT_GAP + (GAP + BAR_HEIGHT) * 2);
  // ctx.fillRect(160, 120, 430, 20);
};
