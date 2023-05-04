import { USER_REGISTRATION_ERROR, USER_REGISTRATION_SUCCESS } from "../../utils/const";
import { TUserRegisterActions } from "../actions/registerUser";

type TRegisterUserState = {
  status: boolean,
};

const initialState: TRegisterUserState = {
  status: false
};

export const registerUserReducer = (state = initialState, action: TUserRegisterActions): TRegisterUserState => {
  switch (action.type) {
    case USER_REGISTRATION_SUCCESS:
      //переходим на логин
      return {status: true};
    case USER_REGISTRATION_ERROR:
      return initialState;
    default:
      return state;
  }
}

export default registerUserReducer;
