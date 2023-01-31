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

}
