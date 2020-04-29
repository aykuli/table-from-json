/* eslint-disable no-param-reassign */
import update from 'react-addons-update';

export const cellsMapping = table => {
  const levels = new Map();

  const leveling = (arr, levelNumber = 0) => {
    let i = levelNumber;
    arr.forEach(level => {
      if (!levels.get(level.Color)) {
        levels.set(level.Color, i);
      }

      if (level.Children.length > 0) {
        const nexLevel = i + 1;
        leveling(level.Children, nexLevel);
      }
    });
    i += 1;
  };

  leveling(table.Children);
  return levels;
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

export const tableChecking = table => {
  const newTable = update(table, { Children: { $splice: [[1, table.length]] } });
  const warningMessages = [];
  const sameColorChecking = [];
  let n = 0;

  // check if one level cells is the same
  const levelCells = (arr, levelNumber = 0) => {
    let i = levelNumber;
    const isSameColor = arr.every(el => el.Color === arr[0].Color);
    sameColorChecking.push(isSameColor);

    arr.forEach(level => {
      level.numberOfCell = n;
      n += 1;

      if (level.Children.length > 0) {
        const nexLevel = i + 1;
        levelCells(level.Children, nexLevel);
      }
    });

    i += 1;
  };

  levelCells(newTable.Children);

  // checking the same Color on one level
  if (!sameColorChecking.every(el => el === true)) {
    const index = sameColorChecking.findIndex(el => el === false);
    warningMessages.push('Table is incorrect. Check Colors in level: ', index);
  }

  // checking vertical span
  // there we suppose, that Colors is ok
  const colorMap = cellsMapping(newTable);
  console.log('cellsMapping: ', cellsMapping(newTable));

  const cellVerticalSpans = (arr, levelNumber = 0) => {
    let i = levelNumber;

    const isSameColor = arr.every(el => el.Color === arr[0].Color);
    sameColorChecking.push(isSameColor);

    arr.forEach(level => {
      const { VerticalSpan, Color } = level;
      const colorLevel = colorMap.get(Color);
      console.log('colorLevel: ', colorLevel, 'VerticalSpan: ', VerticalSpan);
      // VerticalSpan;
      level.numberOfCell = n;
      n += 1;

      if (level.Children.length > 0) {
        const nexLevel = i + 1;
        cellVerticalSpans(level.Children, nexLevel);
      }
    });

    i += 1;
  };

  cellVerticalSpans(newTable.Children);

  return warningMessages.length === 0 ? 'Table is valid' : warningMessages;
};
