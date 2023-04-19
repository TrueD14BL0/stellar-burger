import { FEED_PAGE, ORDERS_PAGE, ORDER_REDUCER, PROFILE_PAGE, USER_ORDER_REDUCER } from "./const";

export function setCookie(name, value, options = {}) {

  options = {
    path: '/',
    ...options
  };

  if (options.expires instanceof Date) {
    options.expires = options.expires.toUTCString();
  }

  let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

  for (let optionKey in options) {
    updatedCookie += "; " + optionKey;
    let optionValue = options[optionKey];
    if (optionValue !== true) {
      updatedCookie += "=" + optionValue;
    }
  }

  document.cookie = updatedCookie;
}

export function getCookie(name) {
  let matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([.$?*|{}()[]\/+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function deleteCookie(name) {
  setCookie(name, "", {
    'max-age': -1
  })
}

export function setTokenCookies(token, refreshToken){
  setCookie('token', token, {
    'max-age': 1200
  });
  setCookie('refreshToken', refreshToken);
}

export function diffDateInDays(first, second) {
  return Math.round((second - first) / (1000 * 60 * 60 * 24));
}

export function diffToString(diff){
  switch (diff) {
    case 0:
      return 'Сегодня';
    case 1:
      return 'Вчера';
    default:
      return `${diff} дня назад`; //в идеале написать обработку склонений
  }
}

export function chooseOrderReducer(location){
  if(location.pathname.startsWith(`${PROFILE_PAGE}/${ORDERS_PAGE}`)){
    return USER_ORDER_REDUCER;
  }else if(location.pathname.startsWith(`${FEED_PAGE}`)){
    return ORDER_REDUCER;
  }
  return null;
}
