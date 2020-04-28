import { UNDO, REDO } from './action-types';

export const undo = ({ table }) => {
  return { type: UNDO, table };
};

export const redo = ({ table }) => {
  return { type: REDO, table };
};
