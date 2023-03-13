import { SET_USER, CLEAR_USER, USER_REQUEST_ERROR } from "../../utils/const";

const initialState = {
    email: null,
    name: null,
};

export const userReducer = (state = initialState, action) => {
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
