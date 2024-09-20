import {
  delInitialCards
} from "../scripts/api.js"



const cardTemplate = document.querySelector("#card-template").content;
let likeCounter;

function createCard(cardData, userId, deleteCard, toggleIsLiked, viewTheImage) {
  const cardItem = cardTemplate.querySelector(".places__item").cloneNode(true);
  const cardImage = cardItem.querySelector(".card__image");
  const deleteButton = cardItem.querySelector(".card__delete-button");
  const likeButton = cardItem.querySelector(".card__like-button");
  const likeCounter=cardItem.querySelector(".like__counter");
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  likeCounter.textContent=cardData.likes.length;
  cardItem.querySelector(".card__title").textContent = cardData.name;
  if(userId===cardData.owner._id){
    deleteButton.addEventListener("click", () => deleteCard(cardData._id));
  }else{
   deleteButton.classList.add("card__delete-button-invisible");
  }
  likeButton.addEventListener("click", toggleIsLiked);
  cardImage.addEventListener("click", viewTheImage);

  return cardItem;
}

function deleteCard(id) {
  delInitialCards(id)
  .then((result) => {
    console.log(result);
  })
  .catch((err) => {
    console.log(err); // выводим ошибку в консоль
  });
}

function toggleIsLiked(evt) {

  let count;

  if(evt.target.classList.contains("card__like-button_is-active")) {
    evt.target.classList.remove("card__like-button_is-active");
    count -= 1;
  } else {
    count += 1;
    evt.target.classList.add("card__like-button_is-active");
  }


}

// function identifyUsers(){

// }

export { createCard, deleteCard, toggleIsLiked };
