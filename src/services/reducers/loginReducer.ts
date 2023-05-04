import { LOGIN_CLEAR, LOGIN_ERROR, LOGIN_SUCCESS } from "../../utils/const";
import { TLoginActions } from "../actions/loginActions";

type TLoginState = {
  status: boolean,
  token: string|null,
  refreshToken: string|null,
};

const initialState: TLoginState = {
  status: false,
  token: null,
  refreshToken: null,
};

export const loginReducer = (state = initialState, action: TLoginActions): TLoginState => {
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
