// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;
const placesItem = cardTemplate.querySelector('.places__item').cloneNode(true);
const cardDescription = cardElement.querySelector('.card__description').cloneNode(true);



// @todo: DOM узлы
const content = document.querySelector('.content');
const placesList = content.querySelector('.places__list');
const addButton = content.querySelector('.profile__add-button');
// @todo: Функция создания карточки
function addCard(linkValue, titleValue) {

  placesItem.querySelector('.card__image').imageContent=linkValue;
  cardDescription.querySelector('.card__title').textContent=titleValue;

  cardDescription.querySelector('.card__like-button').addEventListener('click', function (evt) {
    evt.target.classList.toggle('card__like_active');
  })
  placesList.append(placesItem);
}
// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
'const initialCardsCopy=initialCards.map(item=>item);
addButton.addEventListener('click', function () {
  const iniLink = document.querySelector('./')
  initialCardsCopy[0];

  const title = document.querySelector('.input__text_type_title');

  addCard(iniLink.value, title.value);
 
  artist.value = '';
  title.value = '';
});