// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const content = document.querySelector('.content');
const placesList = content.querySelector('.places__list');

// @todo: Функция создания карточки
function createCard(cardData,deleteCard) {
const cardItem = cardTemplate.querySelector('.places__item').cloneNode(true);
const cardImage = cardItem.querySelector('.card__image');
const deleteButton=cardItem.querySelector('.card__delete-button');
  cardImage.src = cardData.link; 
  cardImage.alt = cardData.name;
  cardItem.querySelector('.card__title').textContent=cardData.name;
  deleteButton.addEventListener('click', () => deleteCard(cardItem));
 return cardItem;
}

// @todo: Функция удаления карточки
function deleteCard(cardElement) {  
  cardElement.remove(); 
};  

// @todo: Вывести карточки на страницу
initialCards.forEach(function(card){
  placesList.append(createCard(card,deleteCard));
});
