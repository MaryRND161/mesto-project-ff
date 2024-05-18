import '../pages/index.css'; // добавьте импорт главного файла стилей
// теперь картинки можно импортировать,
// вебпак добавит в переменные правильные пути
import avatar from '../images/avatar.jpg';
import card_1 from '../images/card_1.jpg';
import card_2 from '../images/card_2.jpg';
import card_3 from '../images/card_3.jpg';
import {initialCards} from '../scripts/cards.js';
import {createCard, deleteCard, toggleIsLiked} from '../components/card.js';
import {openPopup, closePopup, closeOnClickOutside} from '../components/modal.js';

// @todo: DOM узлы
const content = document.querySelector('.content');
const placesList = content.querySelector('.places__list');
const popups = document.querySelectorAll('.popup');

//Функцию, которая обрабатывает клик по изображению, нужно,
//как и лайк, передать аргументом в функцию создания карточки.
function viewTheImage() {
  const formTypeImage = document.querySelector('.popup_type_image');
  const src = this.getAttribute('src');
  const alt = this.getAttribute('alt')
  formTypeImage.querySelector('.popup__caption').textContent = alt;
  formTypeImage.querySelector('.popup__image').src = src;
  formTypeImage.querySelector('.popup__image').alt = alt;
  openPopup(formTypeImage);
 }

// @todo: Вывести карточки на страницу
initialCards.forEach(function(card){
  placesList.append(createCard(card,deleteCard,toggleIsLiked,viewTheImage));
});

// Находим все элементы, которые понадобятся для работы с попапом
const profileImage = content.querySelector('.profile__image');
const profileInfo = content.querySelector('.profile__info');
const profileAddButton = content.querySelector('.profile__add-button');
const profileEditButton = profileInfo.querySelector('.profile__edit-button');
const closePopupButtons= document.querySelectorAll('.popup__close'); // Кнопка для скрытия окна
const popupTypeEdit = document.querySelector('.popup_type_edit'); // Само окно
const popupTypeNewCard = document.querySelector('.popup_type_new-card'); // Само окно

    // Изменение страницы через попап
// Находим форму в DOM
// Воспользуйтесь методом querySelector()
const formEditProfile = document.querySelector('[name="edit-profile"]');
const formNewPlace = document.querySelector('[name="new-place"]');

// Находим поля формы в DOM
// Воспользуйтесь методом querySelector()
const nameInput = formEditProfile.querySelector('[name="name"]');
const jobInput = formEditProfile.querySelector('[name="description"]');
const plaseNameInput = formNewPlace.querySelector('[name="place-name"]');
const plaseLinkInput = formNewPlace.querySelector('[name="link"]');

// Выберите элементы, куда должны быть вставлены значения полей
const profileTitle = profileInfo.querySelector('.profile__title');
const profileDescription = profileInfo.querySelector('.profile__description');

function readProfile() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
}

// Навесим соответствующие обработчики событий на наши кнопки
profileEditButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  openPopup(popupTypeEdit);
  readProfile();
});

profileAddButton.addEventListener('click', (evt) => { // вешаем обработчик событий на клик
  evt.preventDefault(); // Предотвращаем дефолтное поведение браузера
  openPopup(popupTypeNewCard); // Добавляем класс 'popup_is-opened' для окна
});

closePopupButtons.forEach(function(item){
  item.addEventListener('click', function(evt) {
    closePopup(this.closest('.popup'));
  });
});

popups.forEach(function(item){
  item.addEventListener('click', closeOnClickOutside);
});

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormSubmit(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

    // Получите значение полей jobInput и nameInput из свойства value
    const profileTitleValue = nameInput.value;
    const profileDescriptionValue = jobInput.value;

    // Вставьте новые значения с помощью textContent
    profileTitle.textContent = profileTitleValue;
    profileDescription.textContent = profileDescriptionValue;
    closePopup(this.closest('.popup'));
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formEditProfile.addEventListener('submit', handleFormSubmit);

//Сделайте так, чтобы при клике на «Сохранить» новая карточка попадала в начало контейнера с ними.
function addPlace(nameValue, linkValue) {
  const newPlaseElement =
        {name: nameValue,
        link: linkValue};
  const newPlase = initialCards;
  newPlase.unshift(newPlaseElement);
  placesList.prepend(createCard(newPlaseElement,deleteCard,toggleIsLiked,viewTheImage));
  }

//А диалоговое окно после добавления автоматически закрывалось и очищалась форма.
formNewPlace.addEventListener('submit', function (evt) {
  evt.preventDefault();
  addPlace(plaseNameInput.value, plaseLinkInput.value);
  formNewPlace.reset();
  closePopup(this.closest('.popup'));
});
