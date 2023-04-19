import { PASSWORD_RESET_ERROR, PASSWORD_RESET_SUCCESS } from "../../utils/const";

const initialState = {
  status: null
};

export const resetPasswordReducer = (state = initialState, action) => {
  switch (action.type) {
    case PASSWORD_RESET_SUCCESS:
      return {status: true};
    case PASSWORD_RESET_ERROR:
      return initialState;
    default:
      return state;
  }
}

export default resetPasswordReducer;
