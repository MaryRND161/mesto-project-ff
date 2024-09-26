import { delInitialCards, likeCard, unlikeCard } from "../scripts/api.js";

const cardTemplate = document.querySelector("#card-template").content;

function createCard(cardData, userId, deleteCard, toggleIsLiked, viewTheImage) {
  const cardItem = cardTemplate.querySelector(".places__item").cloneNode(true);
  const cardImage = cardItem.querySelector(".card__image");
  const deleteButton = cardItem.querySelector(".card__delete-button");
  const likeButton = cardItem.querySelector(".card__like-button");
  const likeCounter = cardItem.querySelector(".like__counter");
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  likeCounter.textContent = cardData.likes.length;
  cardItem.querySelector(".card__title").textContent = cardData.name;
  if (userId === cardData.owner._id) {
    deleteButton.addEventListener("click", () => deleteCard(cardData._id));
  } else {
    deleteButton.remove();
  }
  if (cardData.likes.some((like) => like._id === userId)) {
    likeButton.classList.add("card__like-button_is-active");
  }
  likeButton.addEventListener("click", () =>
    toggleIsLiked(likeButton, cardData._id, likeCounter)
  );
  cardImage.addEventListener("click", viewTheImage);
  return cardItem;
}

function deleteCard(id) {
  delInitialCards(id)
    .then((result) => {
      console.log(result);
    })
    .catch((err) => {
      console.log(err);
    });
}

function toggleIsLiked(evt, id, count) {
  const LikeMethod = evt.classList.contains("card__like-button_is-active")
    ? unlikeCard
    : likeCard;
  LikeMethod(id)
    .then((res) => {
      evt.classList.toggle("card__like-button_is-active");
      count.textContent = res.likes.length;
    })
    .catch((err) => {
      console.log(err);
    });
}

export { createCard, deleteCard, toggleIsLiked };
