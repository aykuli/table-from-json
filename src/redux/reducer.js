import { UNDO, REDO, ADD_NEW_RECORD_TO_HISTORY, GET_PREV_HISTORY } from './action-types';

import table from '../mock-json-tables/table-1.json';
import { tableWithIds } from '../utils/table-cells-map';

const initialState = {
  history: [],
  tableJSON: tableWithIds(table)
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case UNDO:
      return { ...state, table: action.table };
    case REDO:
      return { ...state, table: action.table };
    case ADD_NEW_RECORD_TO_HISTORY:
      return { ...state };
    case GET_PREV_HISTORY:
      return { ...state };
    default:
      return state;
  }
};

export default reducer;
