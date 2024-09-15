import "../pages/index.css";
import avatar from "../images/avatar.jpg";
import card_1 from "../images/card_1.jpg";
import card_2 from "../images/card_2.jpg";
import card_3 from "../images/card_3.jpg";
import { initialCards } from "../scripts/cards.js";
import { createCard, deleteCard, toggleIsLiked } from "../components/card.js";
import {
  openPopup,
  closePopup,
  closeOnClickOutside,
} from "../components/modal.js";

import {
  validationConfig,
  enableValidation,
  clearValidation
} from "../components/validation.js"

const content = document.querySelector(".content");
const placesList = content.querySelector(".places__list");
const profileInfo = content.querySelector(".profile__info");
const profileTitle = profileInfo.querySelector(".profile__title");
const profileDescription = profileInfo.querySelector(".profile__description");
const profileAddButton = content.querySelector(".profile__add-button");
const profileEditButton = profileInfo.querySelector(".profile__edit-button");
const formEditProfile = document.querySelector('[name="edit-profile"]');
const nameInput = formEditProfile.querySelector('[name="name"]');
const jobInput = formEditProfile.querySelector('[name="description"]');
const formNewPlace = document.querySelector('[name="new-place"]');
const plaseNameInput = formNewPlace.querySelector('[name="place-name"]');
const plaseLinkInput = formNewPlace.querySelector('[name="link"]');
const popups = document.querySelectorAll(".popup");
const closePopupButtons = document.querySelectorAll(".popup__close");
const popupTypeEdit = document.querySelector(".popup_type_edit");
const popupTypeNewCard = document.querySelector(".popup_type_new-card");
const popupTypeImage = document.querySelector(".popup_type_image");
const popupCaption = popupTypeImage.querySelector(".popup__caption");
const popupImage = popupTypeImage.querySelector(".popup__image");

function viewTheImage(evt) {
  const src = evt.target.getAttribute("src");
  const alt = evt.target.getAttribute("alt");
  popupCaption.textContent = alt;
  popupImage.src = src;
  popupImage.alt = alt;
  openPopup(popupTypeImage);
}

initialCards.forEach(function (card) {
  placesList.append(createCard(card, deleteCard, toggleIsLiked, viewTheImage));
});

function fillProfileInputs() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
}

profileEditButton.addEventListener("click", (evt) => {
  openPopup(popupTypeEdit);
  clearValidation(formEditProfile, validationConfig);//очистить ошибки валидации при заполнении формы профиля во время её открытия
  fillProfileInputs();
});

function clearProfileInputs() {
  plaseNameInput.value = "";
  plaseLinkInput.value = "";
  clearValidation(formNewPlace, validationConfig);//очистить ошибки валидации при очистке формы добавления карточки
}

profileAddButton.addEventListener("click", (evt) => {
  openPopup(popupTypeNewCard);
  clearProfileInputs();
});

closePopupButtons.forEach(function (item) {
  item.addEventListener("click", function (evt) {
    closePopup(item.closest(".popup"));
  });
});

popups.forEach(function (item) {
  item.addEventListener("click", closeOnClickOutside);
});

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  const profileTitleValue = nameInput.value;
  const profileDescriptionValue = jobInput.value;
  profileTitle.textContent = profileTitleValue;
  profileDescription.textContent = profileDescriptionValue;
  closePopup(popupTypeEdit);
}

formEditProfile.addEventListener("submit", handleProfileFormSubmit);

function addPlace(nameValue, linkValue) {
  const newPlaseElement = { name: nameValue, link: linkValue };
  const newPlase = initialCards;
  placesList.prepend(
    createCard(newPlaseElement, deleteCard, toggleIsLiked, viewTheImage)
  );
}

formNewPlace.addEventListener("submit", function (evt) {
  evt.preventDefault();
  addPlace(plaseNameInput.value, plaseLinkInput.value);
  evt.target.reset();
  closePopup(popupTypeNewCard);
});

enableValidation(validationConfig);
