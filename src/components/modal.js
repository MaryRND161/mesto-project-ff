function openPopup(myPopup) {
  myPopup.classList.add("popup_is-opened");
  document.addEventListener("keydown", keyHandlerEsc);
}

function closePopup(myPopup) {
  myPopup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", keyHandlerEsc);
}

function keyHandlerEsc(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    closePopup(openedPopup);
  }
}

function closeOnClickOutside({ currentTarget, target }) {
  const popup = currentTarget;
  const isClickedOutside = target === popup;
  if (isClickedOutside) {
    closePopup(popup);
  }
}

export { openPopup, closePopup, closeOnClickOutside };
