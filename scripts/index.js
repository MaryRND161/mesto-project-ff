// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;
const cardItem = cardTemplate.querySelector('.places__item').cloneNode(true);
const cardDescription = cardItem.querySelector('.card__description').cloneNode(true);
const cardContent=initialCards.map(function(item) {
  return{
    name: item.name,
    link: item.link
  };
});



// @todo: DOM узлы
const content = document.querySelector('.content');
const placesList = content.querySelector('.places__list');
const addButton = content.querySelector('.profile__add-button');

// @todo: Функция создания карточки
function createCard({name, link}) {
  cardItem.querySelector('.card__image').src=link;

  cardDescription.querySelector('.card__title').textContent=name;

  cardDescription.querySelector('.card__like-button').addEventListener('click', function (evt) {
 evt.target.classList.toggle('card__like_active');
});
 
  //for (let i = 0; i < initialCards.length; i++) {
  placesList.appendChild(cardItem);
 // }
}
// @todo: Функция удаления карточки



// @todo: Вывести карточки на страницу
function addCard (){
  cardContent.forEach(createCard);
}

addCard();


addButton.addEventListener('click', function () {

});