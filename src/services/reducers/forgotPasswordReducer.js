import { PASSWORD_FORGOT_ERROR, PASSWORD_FORGOT_SUCCESS } from "../../utils/const";

const initialState = {
  status: null
};

export const forgotPasswordReducer = (state = initialState, action) => {
  switch (action.type) {
    case PASSWORD_FORGOT_SUCCESS:
      return {status: true};
    case PASSWORD_FORGOT_ERROR:
      return initialState;
    default:
      return state;
  }
}

export default forgotPasswordReducer;
