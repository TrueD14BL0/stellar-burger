import { PASSWORD_FORGOT_ERROR, PASSWORD_FORGOT_REQUEST, PASSWORD_FORGOT_SUCCESS } from "../../utils/const";

const initialState = {
  loading: null,
  status: null,
};

export const forgotPasswordReducer = (state = initialState, action) => {
  switch (action.type) {
    case PASSWORD_FORGOT_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case PASSWORD_FORGOT_SUCCESS:
      return {
        ...state,
        status: true,
        loading: false,
      };
    case PASSWORD_FORGOT_ERROR:
      console.log(`Cannot reset password: ${action.err}`);
      return initialState;
    default:
      return state;
  }
}

export default forgotPasswordReducer;
