export function renderLoading(form, isLoading) {
  const submit = form.querySelector(".popup__button");
  if (isLoading) {
    submit.textContent = "Сохранение...";
  } else {
    submit.textContent = "Сохранить";
  }
}
