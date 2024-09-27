# Проектная работа Mesto

## 7 спринт 🔥

1. Валидация форм
2. Интеграция с ``API``
3. Деплой на ``GitHub Pages``

Был использован набор инструментов и знаний, предоставленных ![**YANDEX-PRAKTIKUM**](https://user-images.githubusercontent.com/99074177/235997371-83c300d3-a976-47f7-b927-3b1381963c3a.png)

>Функция _**enableValidation**_ - ответственна за включение валидации всех форм:

```javascript
enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});
```

При подключении проекта Mesto к серверу, была реализована:

✅ Загрузка информации о пользователе с сервера
✅ Загрузка карточек с сервера
    методом ``GET``:

```javascript
GET https://nomoreparties.co/v1/:cohortId/users/me
GET https://nomoreparties.co/v1/cohortId/cards
```

✅ Редактирование профиля
✅ Обновление аватара пользователя
    методом ``PATCH``:

```javascript
PATCH https://nomoreparties.co/v1/cohortId/users/me
PATCH https://nomoreparties.co/v1/cohortId/users/me/avatar
```

✅ Добавление новой карточки
    методом ``POST``:

```javascript
POST https://nomoreparties.co/v1/cohortId/cards
```

✅ Удаление карточки
    методом ``DELETE``:

```javascript
DELETE https://nomoreparties.co/v1/cohortId/cards/cardId
```

✅ Постановка лайка
  методом ``PUT``:

```javascript
PUT https://nomoreparties.co/v1/cohortId/cards/likes/cardId
```

### Вот что получилось:

* Ссылка на [репозиторий](<https://github.com/MaryRND161/mesto-project-ff.git>)
* Здесь моё [Mesto](<https://maryrnd161.github.io/mesto-project-ff/> "Прошу строго не судить!")

  Можно ставить лайки! ❤️
