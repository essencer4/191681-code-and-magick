'use strict';

window.renderStatistics = function (ctx, names, times) {

  // Начало написания функций

  var calcBlueColorWithRandomOpacity = function () {
    return 'rgba(0, 0, 255, ' + Math.random() + ')';
  };

  var createColumnOfHistogram = function () {
    for (var j = 0; j < times.length; j++) {
      if (names[j] === 'Вы') {
        ctx.fillStyle = 'rgba(255, 0, 0, 1)';
      } else {
        ctx.fillStyle = calcBlueColorWithRandomOpacity();
      }
      ctx.fillRect(initialX + (indent + barWidth) * j, initialY + (initialY - times[j] * step), barWidth, times[j] * step);
    }
  };

  var createLegendForColumnOfHistogram = function () {
    for (var e = 0; e < times.length; e++) {
      ctx.fillStyle = '#000';
      ctx.fillText(names[e], initialX + (indent + barWidth) * e, initialY + lineHeightForNames);
      ctx.fillText(Math.round(times[e]), initialX + (indent + barWidth) * e, initialY + (initialY - times[e] * step - lineHeightForTimes));
    }
  };

  var findMaxTimeValue = function (arr) {
    var max = -1;
    for (var i = 0; i < arr.length; i++) {
      var time = Math.floor(arr[i]);
      if (time > max) {
        max = time;
      }
    }
    return max;
  };

  // Конец написания функций

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

  var max = findMaxTimeValue(times);

  var histogramHeight = 150; // величина из ТЗ (статичная переменная), которая обозначает высоту в px;
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

  // Вызов функций

  createColumnOfHistogram();
  createLegendForColumnOfHistogram();

};
