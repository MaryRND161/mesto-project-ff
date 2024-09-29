(()=>{"use strict";var e={baseUrl:"https://nomoreparties.co/v1/wff-cohort-23",headers:{authorization:"bc2ce78d-34d2-4241-b368-48a3d909e567","Content-Type":"application/json"}};function t(t){return fetch("".concat(e.baseUrl,"/cards/likes/").concat(t),{method:"PUT",headers:e.headers,body:JSON.stringify({_id:t})}).then((function(e){return r(e)}))}function n(t){return fetch("".concat(e.baseUrl,"/cards/likes/").concat(t),{method:"DELETE",headers:e.headers}).then((function(e){return r(e)}))}function r(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}var o=document.querySelector("#card-template").content;function c(e,t,n,r,c){var u=a(o),i=u.querySelector(".card__image"),l=u.querySelector(".card__delete-button"),s=u.querySelector(".card__like-button"),d=u.querySelector(".like__counter");return i.src=e.link,i.alt=e.name,d.textContent=e.likes.length,u.querySelector(".card__title").textContent=e.name,t===e.owner._id?l.addEventListener("click",(function(t){n(t.target.parentElement,e._id)})):l.remove(),e.likes.some((function(e){return e._id===t}))&&s.classList.add("card__like-button_is-active"),s.addEventListener("click",(function(){return r(s,e._id,d)})),i.addEventListener("click",c),u}var a=function(e){return e.querySelector(".places__item").cloneNode(!0)};function u(t,n){var o;(o=n,fetch("".concat(e.baseUrl,"/cards/").concat(o),{method:"DELETE",headers:e.headers}).then((function(e){return r(e)}))).then((function(e){console.log(e),t.remove()})).catch((function(e){console.log(e)}))}function i(e,r,o){(e.classList.contains("card__like-button_is-active")?n:t)(r).then((function(t){e.classList.toggle("card__like-button_is-active"),o.textContent=t.likes.length})).catch((function(e){console.log(e)}))}function l(e){e.classList.add("popup_is-opened"),document.addEventListener("keydown",d)}function s(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",d)}function d(e){"Escape"===e.key&&s(document.querySelector(".popup_is-opened"))}function p(e){var t=e.currentTarget;e.target===t&&s(t)}var f={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"},m=function(e,t,n){var r=e.querySelector(".".concat(t.id,"-error"));t.setCustomValidity(""),t.classList.remove(n.inputErrorClass),r.classList.remove(n.errorClass),r.textContent=""},_=function(e,t,n){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?t.classList.remove(n.inactiveButtonClass):t.classList.add(n.inactiveButtonClass)},v=function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),r=e.querySelector(t.submitButtonSelector);n.forEach((function(n){m(e,n,t)})),_(n,r,t)};function y(e,t){e.querySelector(".popup__button").textContent=t?"Сохранение...":"Сохранить"}var h=document.querySelector(".content"),S=h.querySelector(".places__list"),b=h.querySelector(".profile__image"),q=h.querySelector(".profile__info"),g=q.querySelector(".profile__title"),E=q.querySelector(".profile__description"),k=h.querySelector(".profile__add-button"),C=q.querySelector(".profile__edit-button"),L=h.querySelector(".profile__image-button"),A=document.querySelector('[name="edit-avatar"]'),x=A.querySelector('[name="link-avatar"]'),U=document.querySelector('[name="edit-profile"]'),T=U.querySelector('[name="name"]'),w=U.querySelector('[name="description"]'),B=document.querySelector('[name="new-place"]'),D=B.querySelector('[name="place-name"]'),P=B.querySelector('[name="link"]'),N=document.querySelectorAll(".popup"),O=(document.querySelectorAll(".popup__button"),document.querySelectorAll(".popup__close")),J=document.querySelector(".popup_type_edit"),j=document.querySelector(".popup_avatar_edit"),M=document.querySelector(".popup_type_new-card"),V=document.querySelector(".popup_type_image"),H=V.querySelector(".popup__caption"),I=V.querySelector(".popup__image"),z="",F="";function G(e){var t=e.target.getAttribute("src"),n=e.target.getAttribute("alt");H.textContent=n,I.src=t,I.alt=n,l(V)}C.addEventListener("click",(function(e){l(J),v(U,f),T.value=g.textContent,w.value=E.textContent})),L.addEventListener("click",(function(e){l(j),v(A,f),x.value=F})),k.addEventListener("click",(function(e){l(M),B.reset(),v(B,f)})),O.forEach((function(e){e.addEventListener("click",(function(t){s(e.closest(".popup"))}))})),N.forEach((function(e){e.addEventListener("click",p)})),U.addEventListener("submit",(function(t){var n;t.preventDefault(),y(t.target,!0),(n={name:T.value,about:w.value},fetch("".concat(e.baseUrl,"/users/me"),{method:"PATCH",headers:e.headers,body:JSON.stringify({name:n.name,about:n.about})}).then((function(e){return r(e)}))).then((function(e){g.textContent=e.name,E.textContent=e.about,s(J)})).catch((function(e){console.log(e)})).finally((function(){y(t.target,!1)}))})),A.addEventListener("submit",(function(t){var n;t.preventDefault(),y(t.target,!0),(n={avatar:x.value},fetch("".concat(e.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:e.headers,body:JSON.stringify({avatar:n.avatar})}).then((function(e){return r(e)}))).then((function(e){b.style.backgroundImage="url(".concat(e.avatar,")"),s(j)})).catch((function(e){console.log(e)})).finally((function(){y(t.target,!1)}))})),B.addEventListener("submit",(function(t){var n;t.preventDefault(),y(t.target,!0),(n={name:D.value,link:P.value,likes:[]},fetch("".concat(e.baseUrl,"/cards"),{method:"POST",headers:e.headers,body:JSON.stringify({name:n.name,link:n.link})}).then((function(e){return r(e)}))).then((function(e){var n=c(e,z,u,i,G);S.prepend(n),t.target.reset(),v(B,f),s(M)})).catch((function(e){console.log(e)})).finally((function(){y(t.target,!1)}))})),function(e){Array.from(document.querySelectorAll(e.formSelector)).forEach((function(t){t.addEventListener("submit",(function(e){e.preventDefault()})),function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),r=e.querySelector(t.submitButtonSelector);_(n,r,t),n.forEach((function(o){o.addEventListener("input",(function(){!function(e,t,n){Array.from(e.querySelectorAll(n.inputSelector)),t.validity.valid?(m(e,t,n),t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage):t.setCustomValidity("")):function(e,t,n,r){var o=e.querySelector(".".concat(t.id,"-error"));t.classList.add(r.inputErrorClass),o.textContent=n,o.classList.add(r.errorClass)}(e,t,t.validationMessage,n)}(e,o,t),_(n,r,t)}))}))}(t,e)}))}(f),Promise.all([fetch("".concat(e.baseUrl,"/users/me"),{headers:e.headers}).then((function(e){return r(e)})),fetch("".concat(e.baseUrl,"/cards"),{headers:e.headers}).then((function(e){return r(e)}))]).then((function(e){z=e[0]._id,F=e[0].avatar,g.textContent=e[0].name,E.textContent=e[0].about,b.style.backgroundImage="url(".concat(F,")"),e[1].forEach((function(e){S.append(c(e,z,u,i,G))}))})).catch((function(e){console.log(e)}))})();