'use strict';

// Задам переменные
let CLOUD_X = 100;
let CLOUD_Y = 10;
let CLOUD_WIDTH = 420;
let CLOUD_HEIGHT = 270;

let barWidth = 40;
let barHeight = 150;
let barGap = 50;
let firstBarX = CLOUD_X + 20;
let barY = CLOUD_Y + CLOUD_HEIGHT - 40; // Координата Y гистограммы 240

// Эта функция будет рисовать тень и облако
let renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

// Эта найдет максимальный элемент, чтобы посчитать пропорции высоты столбцов
let getMaxElement = function (arr) {
  let maxElement = arr[0];

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

// Вот тут буду формировать окно с результатами
window.renderStatistics = function (ctx, players, times) {
  renderCloud(ctx, CLOUD_X + 10, CLOUD_Y + 10, 'rgba(0, 0, 0, 0.7)'); // Рисую тень
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff'); // Рисую облако

  ctx.fillStyle = '#000'; // Вывожу надпись Ура, вы победили
  ctx.fillText('Ура вы победили!', CLOUD_X + 10, CLOUD_Y + 35);
  ctx.fillText('Список результатов:', CLOUD_X + 10, CLOUD_Y + 50);

  let maxTime = getMaxElement(times); // Нашел лучшее время

  for (let i = 0; i < players.length; i++) {
    // Настройки шрифта
    ctx.font = '16px PT Mono';
    ctx.fillStyle = '#000';

    // Вывожу имя игрока
    ctx.fillText(
        players[i],
        (firstBarX + (barWidth + barGap) * i),
        (barY + 20)
    );

    // Вывожу время игрока
    ctx.fillText(
        Math.round(times[i]),
        (firstBarX + (barWidth + barGap) * i),
        (barY - times[i] / maxTime * barHeight - 10)
    );

    // Задаю цвет гистограммы в зависимости от имени игрока
    if (players[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      ctx.fillStyle = 'hsl(240, ' + Math.round(100 * Math.random()) + '%, 50%)';
    }

    // Рисую гистограмму
    ctx.fillRect(
        (firstBarX + (barWidth + barGap) * i),
        barY,
        barWidth,
        -(times[i] / maxTime * barHeight)
    );
  }
};
