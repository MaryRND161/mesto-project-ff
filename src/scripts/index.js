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

/*const popupElement = document.querySelector(".popup__form");
const popupInput = formElement.querySelector('.popup__input');
const popupError = formElement.querySelector(`.${popupInput.id}-error`);*/

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



//
/*const formElement = document.querySelector('.popup__form');
const formInput = formElement.querySelector('.popup__input');
const formError = formElement.querySelector(`.${formInput.id}-error`);

const showError = (input, errorMessage) => {
  input.classList.add('popup__input_type_error');
  formError.textContent = errorMessage;
  formError.classList.add('popup__error_visible');
};

const hideError = (input) => {
  input.classList.remove('popup__input_type_error');
  // 1. Удалите активный класс ошибки c formError.
  formError.classList.remove('popup__error_visible');
  // 2. Очистите свойство textContent элемента formError.
  formError.textContent='';
};

const checkInputValidity = () => {
  if (!formInput.validity.valid) {
    showError(formInput, formInput.validationMessage);
  } else {
    hideError(formInput);
  }
};

formElement.addEventListener('submit', function (evt) {
  evt.preventDefault();
});

formInput.addEventListener('input', function () {
  checkInputValidity();
});*/

const validationConfig=({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});

const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add('popup__input_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__error_visible');
  console.log(errorMessage);
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('popup__input_type_error');
  errorElement.classList.remove('popup__error_visible');
  errorElement.textContent = "";
};

const checkInputValidity = (formElement, inputElement) => {
  if (inputElement.validity.patternMismatch) {
inputElement.setCustomValidity(inputElement.dataset.errorMessage);
} else {
inputElement.setCustomValidity("");
}
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  const buttonElement = formElement.querySelector('.popup__button');
toggleButtonState(inputList,buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList,buttonElement);
    });
  });
};

const hasInvalidInput = (inputList)=>{
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
  };

  const toggleButtonState = (inputList,buttonElement) => {
    if (hasInvalidInput(inputList)) {
      buttonElement.classList.add('popup__button_disabled');
    } else {
       buttonElement.classList.remove('popup__button_disabled');
    }
  }

const enableValidation = () => {
  const formList=Array.from(document.querySelectorAll('.popup__form'));
  formList.forEach((formElement) => {
  formElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
  });
  setEventListeners(formElement);
});
};

const clearValidation = (formElement, validationConfig) => {
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
  const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);
  inputList.forEach((inputElement) => {
      hideInputError(formElement, inputElement, validationConfig);
  });
  toggleButtonState(inputList, buttonElement, validationConfig);
};


enableValidation();
