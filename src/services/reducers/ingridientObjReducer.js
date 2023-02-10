import { CLOSE_INGRIDIENT, OPEN_INGRIDIENT } from "../../utils/const";

const initialState = {
  ingridient: null
};

export const ingridientObjReducer = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_INGRIDIENT:
      return {ingridient: action.ingridient};
    case CLOSE_INGRIDIENT:
      return initialState;
    default:
      return state;
  }
}

export default ingridientObjReducer;
