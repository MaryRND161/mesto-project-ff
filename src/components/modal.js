// Открытие и закрытие модального окна
function openPopup(myPopup) {
  myPopup.classList.add('popup_is-opened');
  document.addEventListener('keydown', evt => keyHandlerEsc(evt, myPopup));
};

function closePopup(myPopup) {
  myPopup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', evt => keyHandlerEsc(evt, myPopup));
};

//закрытие по ESC
function keyHandlerEsc(evt, popup) {
  if (evt.key === 'Escape')  {
    closePopup(popup);
  };
}

// При клике ВНЕ окна - закрываем его
function closeOnClickOutside({currentTarget, target}) {
  const popup = currentTarget
  const isClickedOutside = target === popup
  if (isClickedOutside) {
    closePopup(popup);
  }
  };

export {openPopup, closePopup, closeOnClickOutside};
