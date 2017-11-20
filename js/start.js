'use strict';

window.renderStatistics = function (ctx, names, times) {

  // Здесь создается прямоугольник-тень
  ctx.fillStyle = 'rgba(0, 0, 0, 0.7)'; // translucent black|полупрозрачный черный;
  ctx.strokeRect(110, 20, 420, 270);
  ctx.fillRect(110, 20, 420, 270);

  // Здесь создается основной прямоугольник, на котором все и происходит
  ctx.fillStyle = 'rgba(256, 256, 256, 1.0)'; // white;
  ctx.strokeRect(100, 10, 420, 270);
  ctx.fillRect(100, 10, 420, 270);


  // Две надписи, 40 и 60 - отступы сверху.
  ctx.fillStyle = '#000'; // black;
  ctx.font = '16px PT Mono';

  ctx.fillText('Ура вы победили!', 120, 40);
  ctx.fillText('Список результатов:', 120, 60);

  var max = -1;

  for (var i = 0; i < times.length; i++) {
    var time = times[i];
    if (time > max) {
      max = time;
    }
  }

  var histogramHeight = 150; // величина из ТЗ (статичная переменная) в px;
  var step = histogramHeight / (max - 0); // расчет высоты отдельной колонки в px;

  // Создание гистограмм
  // отступ слева, отступ сверху, ширина объекта, высоту объекта для фигуры
  // текст, отступ слева, отступ сверху

  var barWidth = 40; // ширина отдельного стобика из ТЗ (статичная переменная) в px;
  var indent = 50; // отступ между колонками из ТЗ (статичная переменная) в px;
  var initialX = 150; // отступ начальный слева от границы канваса (от левой границы 1 столбика) px;
  var initialY = 125; // отступ сверху канваса (от нижнец границы столбика) в px;
  var lineHeightForNames = 145; // отступ от столбиков для надписи с именами в px;
  var lineHeightForTimes = 10; // отступ от столбиков для надписи с числами (которое время прохождения для отдельного игрока) в px;

  for (var j = 0; j < times.length; j++) {
    if (names[j] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      ctx.fillStyle = 'rgba(0, 0, 255, ' + Math.random() + ')';
    }
    ctx.fillRect(initialX + (indent + barWidth) * j, initialY + (initialY - times[j] * step), barWidth, times[j] * step);
    ctx.fillStyle = '#000';
    ctx.fillText(names[j], initialX + (indent + barWidth) * j, initialY + lineHeightForNames);
    ctx.fillText(Math.round(times[j]), initialX + (indent + barWidth) * j, initialY + (initialY - times[j] * step - lineHeightForTimes));
  }
};
