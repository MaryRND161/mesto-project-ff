// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;
const cardContent=initialCards.map(function(item) {
  return{
    name: item.name,
    link: item.link
  };
});



// @todo: DOM узлы
const content = document.querySelector('.content');
const addButton = content.querySelector('.profile__add-button');

// @todo: Функция создания карточки
function createCard(cardData,deleteCalback) {
const cardItem = cardTemplate.querySelector('.places__item').cloneNode(true);
  cardItem.querySelector('.card__image').src=cardData.link;
  cardItem.querySelector('.card__title').textContent=cardData.name;
  cardItem.querySelector('.card__delete-button').addEventListener('click',function(){
   deleteCalback(cardData);
  });
  cardItem.querySelector('.card__like-button').addEventListener('click', function (evt) {
 evt.target.classList.toggle('card__like_active');
});
 return cardItem;
}

// @todo: Функция удаления карточки



// @todo: Вывести карточки на страницу
function addCard (cardArray){
  const placesList = content.querySelector('.places__list');
  cardArray.forEach(function(card){
    const cardElement=createCard(card,function(cardData){
      cardElement.remove();
    });
  placesList.appendChild(cardElement);
  });
};
addCard(cardContent);
