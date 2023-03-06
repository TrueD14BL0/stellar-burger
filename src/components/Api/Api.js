const apiAddress = "https://norma.nomoreparties.space/api";

export default class Api{

  static _request(url, options) {
    return fetch(url, options).then(this._testRes)
  }

  static _testRes(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  static getIngredients(){
    return this._request(`${apiAddress}/ingredients`);
  }

  static forgotPassword(email){
    return this._request(`${apiAddress}/password-reset`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
      }),
    });
  }

  static registerUser(registrObj){
    return this._request(`${apiAddress}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(registrObj),
    });
  }

  static resetPassword(resetData){
    return this._request(`${apiAddress}/password-reset/reset`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(resetData),
    });
  }

  static postOrders(ingredients){
    return this._request(`${apiAddress}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ingredients: ingredients,
      }),
    });
  }

  static getAuthLogin(loginData){
    return this._request(`${apiAddress}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    });
  }

  static getAuthRegistration(ingredients){
    return this._request(`${apiAddress}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ingredients: ingredients,
      }),
    });
  }

  static getAuthLogout(ingredients){
    return this._request(`${apiAddress}/auth/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ingredients: ingredients,
      }),
    });
  }

  static getAuthToken(ingredients){
    return this._request(`${apiAddress}/auth/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ingredients: ingredients,
      }),
    });
  }



}
