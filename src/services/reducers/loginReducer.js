import { LOGIN_ERROR, LOGIN_SUCCESS } from "../../utils/const";

const initialState = {
  status: null,
  token: null,
  refreshToken: null,
};

export const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        status: true,
        token: action.token,
        refreshToken: action.refreshToken,
      };
    case LOGIN_ERROR:
      return initialState;
    default:
      return state;
  }
}

export default loginReducer;
