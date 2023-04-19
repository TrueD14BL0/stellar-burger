import { USER_REGISTRATION_ERROR, USER_REGISTRATION_SUCCESS } from "../../utils/const";

const initialState = {
  status: null
};

export const registerUserReducer = (state = initialState, action) => {
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
