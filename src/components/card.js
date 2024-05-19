const cardTemplate = document.querySelector("#card-template").content;

function createCard(cardData, deleteCard, toggleIsLiked, viewTheImage) {
  const cardItem = cardTemplate.querySelector(".places__item").cloneNode(true);
  const cardImage = cardItem.querySelector(".card__image");
  const deleteButton = cardItem.querySelector(".card__delete-button");
  const likeButton = cardItem.querySelector(".card__like-button");
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardItem.querySelector(".card__title").textContent = cardData.name;
  deleteButton.addEventListener("click", () => deleteCard(cardItem));
  likeButton.addEventListener("click", toggleIsLiked);
  cardImage.addEventListener("click", viewTheImage);
  return cardItem;
}

function deleteCard(cardElement) {
  cardElement.remove();
}

function toggleIsLiked(evt) {
  evt.target.classList.toggle("card__like-button_is-active");
}

export { createCard, deleteCard, toggleIsLiked };
