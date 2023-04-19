const apiAddress = "https://norma.nomoreparties.space/api";

export default class Api{

  static _request<T>(url: string, options?: any):Promise<T> {
    return fetch(url, options)
      .then((res)=>{return this._testRes(res)});
  }

  static _testRes<T>(res:Response): Promise<T> {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(res.status);
  }

  static getIngredients(){
    return this._request(`${apiAddress}/ingredients`);
  }

  static forgotPassword(email: string){
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

  static postOrders(ingredients, token){
    return this._request(`${apiAddress}/orders`, {
      method: "POST",
      headers: {
        authorization : `${token}`,
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

  static getLogout(refreshToken){
    return this._request(`${apiAddress}/auth/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: refreshToken,
      }),
    });
  }

  static getAccessToken(refreshToken){
    return this._request(`${apiAddress}/auth/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "token": refreshToken,
      }),
    });
  }

  static getUserInfo(token){
    return this._request(`${apiAddress}/auth/user`, {
      method: "GET",
      headers: {
        authorization : `${token}`,
        "Content-Type": "application/json",
      },
    });
  }

  static patchUserInfo(token, userData){
    return this._request(`${apiAddress}/auth/user`, {
      method: "PATCH",
      headers: {
        authorization : `${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
  }

}
