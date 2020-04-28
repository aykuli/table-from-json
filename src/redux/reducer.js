import { UNDO, REDO } from './action-types';

const initialState = {
  history: []
};

const reducer = (state = initialState, action) => {
  console.log('action: ', action.type);
  switch (action.type) {
    case UNDO:
      return { ...state, table: action.table };
    case REDO:
      return { ...state, table: action.table };
    default:
      return state;
  }
};

export default reducer;
