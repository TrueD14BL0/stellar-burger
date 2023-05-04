import { SET_USER, CLEAR_USER, USER_REQUEST_ERROR } from "../../utils/const";
import { TUserInfosActions } from "../actions/userActions";

type TUserState = {
  email: string,
  name: string,
};

const initialState: TUserState = {
    email: '',
    name: '',
};

export const userReducer = (state = initialState, action: TUserInfosActions): TUserState => {
  switch (action.type) {
    case SET_USER:
      return {
        email: action.user.email,
        name: action.user.name,
      };
    case CLEAR_USER:
      return initialState;
    case USER_REQUEST_ERROR:
      console.log(`Cannot get user info: ${action.err}`);
      return initialState;
    default:
      return state;
  }
}

export default userReducer;
