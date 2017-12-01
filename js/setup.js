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

var WIZARDS_FIREBALL_COLORS = [ // цвета файрболлов
  '#ee4830',
  '#30a8ee',
  '#5ce6c0',
  '#e848d5',
  '#e6e848'
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

// document.querySelector('.setup').classList.remove('hidden');

// document.querySelector('.setup-similar').classList.remove('hidden');

// ////////////////////////////////////////////////////////////////////////////////////

// Задание 4. Сценарии взаимодействия пользователя с сайтом.

// Нажатие на элемент .setup-open приводит
// к появлению диалогового окна .setup.
// Окно спрятано с помощью CSS-класса hidden,
// поэтому, чтобы показать, нужно удалить
// соответствующий класс

// Нажатие на элемент .setup-open удаляет класс hidden
// у блока setup

// Создадим переменные, которые хранят элементы, которыми мы будем оперировать

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var setupOpen = document.querySelector('.setup-open');
var setup = document.querySelector('.setup');
var setupClose = setup.querySelector('.setup-close');
var setupUserName = document.querySelector('.setup-user-name');

// Теперь, опишем реакцию блока .setup-open и .setup-close на нажатие.
// Зададим функции для закрытия и открытия попапа.

var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
    if (setupUserName === document.activeElement) {
      evt.stopPropagation();
    }
  }
};

var openPopup = function () {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = function () {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

setupOpen.addEventListener('click', function () {
  openPopup();
});

setupOpen.addEventListener('keydown', function (evt) { // открытие попапа по нажатию enter
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
});

setupClose.addEventListener('click', function () {
  closePopup();
});

setupClose.addEventListener('keydown', function (evt) { // закрытие попапа по нажатию enter
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
});

// Переводим ошибки на русский язык

var userNameInput = setup.querySelector('.setup-user-name');

userNameInput.addEventListener('invalid', function (evt) {
  if (userNameInput.validity.tooShort) {
    userNameInput.setCustomValidity('Имя должно состоять минимум из 2-х символов');
  } else if (userNameInput.validity.tooLong) {
    userNameInput.setCustomValidity('Имя не должно превышать 25-ти символов');
  } else if (userNameInput.validity.valueMissing) {
    userNameInput.setCustomValidity('Обязательное поле');
  } else {
    userNameInput.setCustomValidity('');
  }
});

userNameInput.addEventListener('input', function (evt) {
  var target = evt.target;
  if (target.value.length < 2) {
    target.setCustomValidity('Имя должно состоять минимум из 2-х символов');
  } else {
    target.setCustomValidity('');
  }
});

// 3. Изменение цвета мантии персонажа по нажатию

var colorRobe = document.querySelector('.wizard-coat');

colorRobe.addEventListener('click', function () {
  colorRobe.style.fill = pickRandomNotUniqueItem(WIZARDS_COAT_COLORS);
});

// Функция для выбора случайного НЕ уникального элемента массива

var pickRandomNotUniqueItem = function (array) {
  var currentIndex = getRandomNumber(0, array.length); // обращаемся к рандомайзеру
  return array[currentIndex];
};


// 4. Изменение цвета глаз персонажа по нажатию.

var colorEye = document.querySelector('.wizard-eyes');

colorEye.addEventListener('click', function () {
  colorEye.style.fill = pickRandomNotUniqueItem(WIZARDS_EYES_COLORS);
});

// 5. Изменение цвета файрболла персонажа по нажатию.

var colorFireball = document.querySelector('.setup-fireball-wrap');

colorFireball.addEventListener('click', function () {
  colorFireball.style.background = pickRandomNotUniqueItem(WIZARDS_FIREBALL_COLORS);
});
