/* eslint-disable no-param-reassign */
import update from 'react-addons-update';

export const cellsMapping = table => {
  const numberOfCellMap = new Map();
  let n = 0;

  const leveling = (arr, levelNumber = 0) => {
    let i = levelNumber;
    arr.forEach(level => {
      numberOfCellMap.set(n, level.Value);
      n += 1;

      if (level.Children.length > 0) {
        const nexLevel = i + 1;
        leveling(level.Children, nexLevel);
      }
    });
    i += 1;
  };

  leveling(table.Children);
  return numberOfCellMap;
};

export const tableWithIds = table => {
  const newTable = update(table, { Children: { $splice: [[1, table.length]] } });
  let n = 0;

  const leveling = (arr, levelNumber = 0) => {
    let i = levelNumber;
    arr.forEach(level => {
      level.numberOfCell = n;
      n += 1;

      if (level.Children.length > 0) {
        const nexLevel = i + 1;
        leveling(level.Children, nexLevel);
      }
    });
    i += 1;
  };

  leveling(newTable.Children);
  return newTable;
};
