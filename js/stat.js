'use strict';

// Задам переменные
const CLOUD_X = 100;
const CLOUD_Y = 10;
const CLOUD_WIDTH = 420;
const CLOUD_HEIGHT = 270;
const BAR_WIDTH = 40;
const BAR_HEIGHT = 150;
const BAR_GAP = 50;
const FIRST_BAR_X = CLOUD_X + 20;
const BAR_Y = CLOUD_Y + CLOUD_HEIGHT - 40; // Координата Y гистограммы 240

// Эта функция будет рисовать тень и облако
const renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

// Эта найдет максимальный элемент, чтобы посчитать пропорции высоты столбцов
const getMaxElement = function (arr) {
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
        (FIRST_BAR_X + (BAR_WIDTH + BAR_GAP) * i),
        (BAR_Y + 20)
    );

    // Вывожу время игрока
    ctx.fillText(
        Math.round(times[i]),
        (FIRST_BAR_X + (BAR_WIDTH + BAR_GAP) * i),
        (BAR_Y - times[i] / maxTime * BAR_HEIGHT - 10)
    );

    // Задаю цвет гистограммы в зависимости от имени игрока
    if (players[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      ctx.fillStyle = 'hsl(240, ' + Math.round(100 * Math.random()) + '%, 50%)';
    }

    // Рисую гистограмму
    ctx.fillRect(
        (FIRST_BAR_X + (BAR_WIDTH + BAR_GAP) * i),
        BAR_Y,
        BAR_WIDTH,
        -(times[i] / maxTime * BAR_HEIGHT)
    );
  }
};
