import { LOGOUT_SUCCESS, LOGOUT_ERROR } from "../../utils/const";

const initialState = {
  status: null,
};

export const logoutReducer = (state = initialState, action) => {
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
