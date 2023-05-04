import { TApiGetIngredients, TFetchOptions, TForgotPassword, TLoginData, TLoginResponse, TLogoutResponse, TOrderResponse, TPatchUserData, TRefresh, TRegUserData, TResetData, TResetResponse, TUserSuccess } from "../../services/types/types";

const apiAddress = "https://norma.nomoreparties.space/api";

export default class Api{

  static _request<T>(url: string, options?: TFetchOptions):Promise<T> {
    return fetch(url, options)
      .then((res)=>{return this._testRes(res)});
  }

  static _testRes<T>(res:Response): Promise<T> {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(res.status.toString);
  }

  static getIngredients(): Promise<TApiGetIngredients>{
    return this._request(`${apiAddress}/ingredients`);
  }

  static forgotPassword(email: string): Promise<TForgotPassword> {
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

  static registerUser(registrObj: TRegUserData): Promise<TLoginResponse>{
    return this._request(`${apiAddress}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(registrObj),
    });
  }

  static resetPassword(resetData: TResetData): Promise<TResetResponse>{
    return this._request(`${apiAddress}/password-reset/reset`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(resetData),
    });
  }

  static postOrders(ingredients: string[], token: string): Promise<TOrderResponse>{
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

  static getAuthLogin(loginData: TLoginData): Promise<TLoginResponse>{
    return this._request(`${apiAddress}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    });
  }

  static getLogout(refreshToken: string): Promise<TLogoutResponse>{
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

  static getAccessToken(refreshToken: string): Promise<TRefresh>{
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

  static getUserInfo(token: string): Promise<TUserSuccess>{
    return this._request(`${apiAddress}/auth/user`, {
      method: "GET",
      headers: {
        authorization : `${token}`,
        "Content-Type": "application/json",
      },
    });
  }

  static patchUserInfo(token: string, userData: TPatchUserData): Promise<TUserSuccess>{
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
