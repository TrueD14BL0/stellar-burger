const apiAddress = "https://norma.nomoreparties.space/api";

export default class Api{

  static _testRes(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  static getIngredients(){
    return fetch(`${apiAddress}/ingredients`)
    .then(this._testRes);
  }

  static postOrders(ingredients){
    return fetch(`${apiAddress}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ingredients: ingredients,
      }),
    })
    .then(this._testRes);
  }

}
