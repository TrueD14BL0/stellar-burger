import { PASSWORD_RESET_ERROR, PASSWORD_RESET_SUCCESS } from "../../utils/const";
import { TResetActions } from "../actions/resetPassword";

type TResetState = {
  status: boolean
};

const initialState: TResetState = {
  status: false
};

export const resetPasswordReducer = (state = initialState, action: TResetActions): TResetState => {
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
