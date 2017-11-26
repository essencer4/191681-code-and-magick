'use strict';

// Задаем основный массивы, с различными данными о волшебниках и число волшебников

var numberOfWizards = 4;

var WIZARDS_NAMES = [ // имена волшебников
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон'
];

var WIZARDS_SURNAMES = [ // фамилии
  'да Марья',
  'Верон',
  'Мирабелла',
  'Вальц',
  'Онопко',
  'Топольницкая',
  'Нионго',
  'Ирвинг'
];

var WIZARDS_COAT_COLORS = [ // цвета мантий
  'rgb(101, 137, 164)',
  'rgb(241, 43, 107)',
  'rgb(146, 100, 161)',
  'rgb(56, 159, 117)',
  'rgb(215, 210, 55)',
  'rgb(0, 0, 0)'
];

var WIZARDS_EYES_COLORS = [ // цвета глаз
  'black',
  'red',
  'blue',
  'yellow',
  'green'
];

// Функции.
// Функция генерации случайных данных (слямзена у Кантора)

var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Функция генерации полного имени волшебника на основе случайного имени и фамилии

var getFullWizardName = function () {
  return WIZARDS_NAMES[getRandomNumber(0, WIZARDS_NAMES.length - 1)] + ' ' + WIZARDS_SURNAMES[getRandomNumber(0, WIZARDS_SURNAMES.length - 1)];
};

// Функция генерации случайного цвета для мантии

var getRandomCoatColor = function () {
  return WIZARDS_COAT_COLORS[getRandomNumber(0, WIZARDS_COAT_COLORS.length - 1)];
};

// Функция генерации случайного цвета для глаз

var getRandomEyesColor = function () {
  return WIZARDS_EYES_COLORS[getRandomNumber(0, WIZARDS_EYES_COLORS.length - 1)];
};

// Создаем пустой массив, в который будем складывать получившихся волшебников.

var persons = [];

// Создаем цикл для создания этих волшебников в виде объектов для массива persons

for (var i = 0; i < numberOfWizards; i++) {
  var personName = getFullWizardName();
  var personCoatColor = getRandomCoatColor();
  var personEyesColor = getRandomEyesColor();
  persons[i] = {
    name: personName,
    coatColor: personCoatColor,
    eyesColor: personEyesColor
  };
}

// Найдем элемент, в который мы будем вставлять похожих магов

var wizardTemplate = document.getElementById('similar-wizard-template').content;

// Функция по вставке получившихся данных в шаблон

var renderWizard = function (person) {
  var wizard = wizardTemplate.cloneNode(true);
  wizard.querySelector('.setup-similar-label').textContent = person.name;
  wizard.querySelector('.wizard-coat').style.fill = person.coatColor;
  wizard.querySelector('.wizard-eyes').style.fill = person.eyesColor;
  return wizard;
};

// Функция с контейнером по отрисовке получившихся магов

var fillContainer = function (container) {
  for (var j = 0; j < numberOfWizards; j++) {
    container.appendChild(renderWizard(persons[j]));
  }
};

// Найдем шаблон который мы будем копировать

var container = document.querySelector('.setup-similar-list');

// Используем DocumentFragment. Это особенный кросс-браузерный DOM-объект, который похож на обычный DOM-узел, но им не является.

var fragment = document.createDocumentFragment();

fillContainer(fragment);

// Добавление DOM-уздлв через .appendChild

container.appendChild(fragment);

// Убираем у нужных html-блоков css-класс 'hidden' чтобы отобразить данные html-блоки

document.querySelector('.setup').classList.remove('hidden');

document.querySelector('.setup-similar').classList.remove('hidden');
