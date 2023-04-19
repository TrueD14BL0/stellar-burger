import { PAGES, ORDER_REDUCERS } from "./const";

export function setCookie(name: string, value: string | number | boolean, options: { [key: string]: Date | string | number | boolean } = {}):void {

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

export function getCookie(name: string) {
  let matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([.$?*|{}()[]\/+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function deleteCookie(name:string):void {
  setCookie(name, "", {
    'max-age': -1
  })
}

export function setTokenCookies(token: string, refreshToken: string){
  setCookie('token', token, {
    'max-age': 1200
  });
  setCookie('refreshToken', refreshToken);
}

export function diffDateInDays(first:number, second:number): number {
  return Math.round((second - first) / (1000 * 60 * 60 * 24));
}

export function diffToString(diff:number): string{
  switch (diff) {
    case 0:
      return 'Сегодня';
    case 1:
      return 'Вчера';
    default:
      return `${diff} дня назад`; //в идеале написать обработку склонений
  }
}

export function chooseOrderReducer(location: Location){
  if(location.pathname.startsWith(`${PAGES.PROFILE_PAGE}/${PAGES.ORDERS_PAGE}`)){
    return ORDER_REDUCERS.USER_ORDER_REDUCER;
  }else if(location.pathname.startsWith(`${PAGES.FEED_PAGE}`)){
    return ORDER_REDUCERS.ORDER_REDUCER;
  }
  return null;
}
