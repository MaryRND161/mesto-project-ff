import "../pages/index.css";
//import avatar from "../images/avatar.jpg";
//import card_1 from "../images/card_1.jpg";
//import card_2 from "../images/card_2.jpg";
//import card_3 from "../images/card_3.jpg";
//import { initialCards } from "../scripts/cards.js";
import { createCard, deleteCard, toggleIsLiked } from "../components/card.js";
import {
  openPopup,
  closePopup,
  closeOnClickOutside,
} from "../components/modal.js";

import {
  validationConfig,
  enableValidation,
  clearValidation,
} from "../components/validation.js";

import {
  getUserProfile,
  getInitialCards,
  editedUserProfile,
  editedUserAvatar,
  addInitialCards,
} from "../scripts/api.js";

import { renderLoading } from "../scripts/utils.js";

const content = document.querySelector(".content");
const placesList = content.querySelector(".places__list");
const profileAvatar = content.querySelector(".profile__image");
const profileInfo = content.querySelector(".profile__info");
const profileTitle = profileInfo.querySelector(".profile__title");
const profileDescription = profileInfo.querySelector(".profile__description");
const profileAddButton = content.querySelector(".profile__add-button");
const profileEditButton = profileInfo.querySelector(".profile__edit-button");
const profileImageButton = content.querySelector(".profile__image-button");
const formEditAvatar = document.querySelector('[name="edit-avatar"]');
const avatarLinkInput = formEditAvatar.querySelector('[name="link-avatar"]');
const formEditProfile = document.querySelector('[name="edit-profile"]');
const nameInput = formEditProfile.querySelector('[name="name"]');
const jobInput = formEditProfile.querySelector('[name="description"]');
const formNewPlace = document.querySelector('[name="new-place"]');
const plaseNameInput = formNewPlace.querySelector('[name="place-name"]');
const plaseLinkInput = formNewPlace.querySelector('[name="link"]');
const popups = document.querySelectorAll(".popup");
const popupButton = document.querySelectorAll(".popup__button");
const closePopupButtons = document.querySelectorAll(".popup__close");
const popupTypeEdit = document.querySelector(".popup_type_edit");
const popupAvatarEdit = document.querySelector(".popup_avatar_edit");
const popupTypeNewCard = document.querySelector(".popup_type_new-card");
const popupTypeImage = document.querySelector(".popup_type_image");
const popupCaption = popupTypeImage.querySelector(".popup__caption");
const popupImage = popupTypeImage.querySelector(".popup__image");
let userId = "";
let userAvatar = "";

function viewTheImage(evt) {
  const src = evt.target.getAttribute("src");
  const alt = evt.target.getAttribute("alt");
  popupCaption.textContent = alt;
  popupImage.src = src;
  popupImage.alt = alt;
  openPopup(popupTypeImage);
}

function fillProfileInputs() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
}

function fillAvatarInput() {
  avatarLinkInput.value = userAvatar;
}

profileEditButton.addEventListener("click", (evt) => {
  openPopup(popupTypeEdit);
  clearValidation(formEditProfile, validationConfig);
  fillProfileInputs();
});

profileImageButton.addEventListener("click", (evt) => {
  openPopup(popupAvatarEdit);
  clearValidation(formEditAvatar, validationConfig);
  fillAvatarInput();
});

function clearProfileInputs() {
  formNewPlace.reset();
}

profileAddButton.addEventListener("click", (evt) => {
  openPopup(popupTypeNewCard);
  clearProfileInputs();
  clearValidation(formNewPlace, validationConfig);
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
  renderLoading(evt.target, true);
  editedUserProfile({
    name: nameInput.value,
    about: jobInput.value,
  })
    .then((result) => {
      profileTitle.textContent = result.name;
      profileDescription.textContent = result.about;
      closePopup(popupTypeEdit);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(evt.target, false);
    });
}

function handleAvatarFormSubmit(evt) {
  evt.preventDefault();
  renderLoading(evt.target, true);
  editedUserAvatar({
    avatar: avatarLinkInput.value,
  })
    .then((result) => {
      profileAvatar.style.backgroundImage = `url(${result.avatar})`;
      closePopup(popupAvatarEdit);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(evt.target, false);
    });
}

formEditProfile.addEventListener("submit", handleProfileFormSubmit);

formEditAvatar.addEventListener("submit", handleAvatarFormSubmit);

formNewPlace.addEventListener("submit", function (evt) {
  evt.preventDefault();
  renderLoading(evt.target, true);
  addInitialCards({
    name: plaseNameInput.value,
    link: plaseLinkInput.value,
    likes: [],
  })
    .then((result) => {
      const newPlaseElement = createCard(
        result,
        userId,
        deleteCard,
        toggleIsLiked,
        viewTheImage
      );
      placesList.prepend(newPlaseElement);
      evt.target.reset();
      clearValidation(formNewPlace, validationConfig);
      closePopup(popupTypeNewCard);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(evt.target, false);
    });
});

enableValidation(validationConfig);

Promise.all([getUserProfile(), getInitialCards()])
  .then((result) => {
    userId = result[0]._id;
    userAvatar = result[0].avatar;
    profileTitle.textContent = result[0].name;
    profileDescription.textContent = result[0].about;
    profileAvatar.style.backgroundImage = `url(${userAvatar})`;
    result[1].forEach((card) => {
      placesList.append(
        createCard(card, userId, deleteCard, toggleIsLiked, viewTheImage)
      );
    });
  })
  .catch((err) => {
    console.log(err);
  });
