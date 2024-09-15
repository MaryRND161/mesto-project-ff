// включение валидации вызовом enableValidation
// все настройки передаются при вызове
/*
cardLike.addEventListener('click', () => {
        const likeMethod = cardLike.classList.contains('card__like-button_is-active') ? unlikeCard : likeCard;
        likeMethod(cardInfo._id)
                .then((res) => {
                   toggleLike(cardLike);
                   likeCounter.textContent = res.likes.length;
                })
        .catch(err => console.log(err));
    });
    */

    const validationConfig=({
      formSelector: '.popup__form',
      inputSelector: '.popup__input',
      submitButtonSelector: '.popup__button',
      inactiveButtonClass: 'popup__button_disabled',
      inputErrorClass: 'popup__input_type_error',
      errorClass: 'popup__error_visible'
    });

    const showInputError = (formElement, inputElement, errorMessage, validationConfig) => {
      const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
      inputElement.classList.add(validationConfig.inputErrorClass);
      errorElement.textContent = errorMessage;
      errorElement.classList.add(validationConfig.errorClass);
    };

    const hideInputError = (formElement, inputElement, validationConfig) => {
      const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
      inputElement.classList.remove(validationConfig.inputErrorClass);
      errorElement.classList.remove(validationConfig.errorClass);
      errorElement.textContent = "";
    };

    const checkInputValidity = (formElement, inputElement, validationConfig) => {
      const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
      if (inputElement.validity.valid) {
          hideInputError(formElement, inputElement, validationConfig);
          if (inputElement.validity.patternMismatch) {
            inputElement.setCustomValidity(inputElement.dataset.errorMessage);
            } else {
            inputElement.setCustomValidity("");
          }
      } else {
        showInputError(formElement, inputElement, inputElement.validationMessage, validationConfig);
      }
    };

    const setEventListeners = (formElement,validationConfig) => {
      const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
      const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);
    toggleButtonState(inputList,buttonElement,validationConfig);
      inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function () {
          checkInputValidity(formElement, inputElement, validationConfig);
          toggleButtonState(inputList,buttonElement,validationConfig);
        });
      });
    };

    const hasInvalidInput = (inputList)=>{
      return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
      });
      };

      const toggleButtonState = (inputList,buttonElement,validationConfig) => {
        if (hasInvalidInput(inputList)) {
          buttonElement.classList.add(validationConfig.inactiveButtonClass);
        } else {
           buttonElement.classList.remove(validationConfig.inactiveButtonClass);
        }
      }

    const enableValidation = (validationConfig) => {
      const formList=Array.from(document.querySelectorAll(validationConfig.formSelector));
      formList.forEach((formElement) => {
      formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
      });
      setEventListeners(formElement,validationConfig);
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

    export { validationConfig, enableValidation, clearValidation };
