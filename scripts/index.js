// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const content = document.querySelector('.content');
const placesList = content.querySelector('.places__list');

// @todo: Функция создания карточки
function createCard(cardData,deleteCard) {
const cardItem = cardTemplate.querySelector('.places__item').cloneNode(true);
  cardItem.querySelector('.card__image').src=cardData.link;
  cardItem.querySelector('.card__image').alt=cardData.name;
  cardItem.querySelector('.card__title').textContent=cardData.name;
  cardItem.querySelector('.card__delete-button').addEventListener('click', (evt)=>deleteCard(evt));
 return cardItem;
}

// @todo: Функция удаления карточки
function deleteCard(evt) {
  let itemCard = evt.target.closest('.card');
      itemCard.remove();
}

// @todo: Вывести карточки на страницу
function addCard(cardArray) {
  cardArray.forEach(function(card){
    const cardElement=createCard(card,deleteCard);
    placesList.append(cardElement);
  });
};

addCard(initialCards);
