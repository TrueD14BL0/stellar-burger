import { LOGOUT_SUCCESS, LOGOUT_ERROR } from "../../utils/const";
import { TLogoutActions } from "../actions/logoutActions";

type TLogoutState = {
  status: boolean,
};

const initialState: TLogoutState = {
  status: false,
};

export const logoutReducer = (state = initialState, action: TLogoutActions): TLogoutState => {
  switch (action.type) {
    case LOGOUT_SUCCESS:
      return {
        ...state,
        status: true,
      };
    case LOGOUT_ERROR:
      console.log(`Cannot logout: ${action.err}`);
      return {
        ...state,
        status: false,
      };
    default:
      return state;
  }
}

export default logoutReducer;
