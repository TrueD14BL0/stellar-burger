import { LOGIN_ERROR, LOGIN_SUCCESS } from "../../utils/const";

const initialState = {
  status: null
};

export const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {status: true};
    case LOGIN_ERROR:
      return initialState;
    default:
      return state;
  }
}

export default loginReducer;
