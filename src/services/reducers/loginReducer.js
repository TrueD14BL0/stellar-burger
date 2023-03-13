import { LOGIN_CLEAR, LOGIN_ERROR, LOGIN_SUCCESS } from "../../utils/const";

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
    case LOGIN_CLEAR:
      return initialState;
    case LOGIN_ERROR:
      console.log(`Cannot login: ${action.err}`);
      return initialState;
    default:
      return state;
  }
}

export default loginReducer;
