import table1 from '../mock-json-tables/table-1.json';
// import table0 from '../mock-json-tables/table-0.json';

const levels = new Map();
const unMatching = [];
let j = 0;
const leveling = (arr, levelNumber) => {
  let i = levelNumber;
  arr.forEach((level, index) => {
    if (!index) {
      levels.set(i, level.Color);
    } else if (levels.get(i) !== level.Color) {
      unMatching.push(`in level = ${i} in span = ${index} color doesn't match to ${levels.get(i)}`);
    }
    console.log(j);
    j += 1;
    if (level.Children.length > 0) {
      console.log(`this ${level.Color} has childrens`);
      const nexLevel = i + 1;
      leveling(level.Children, nexLevel);
    }
  });
  i += 1;
};

leveling(table1.Children, 0);
console.log(levels);

const treeMap = new Map([
  ['orange', 1],
  ['green', 2],
  ['purple', 3]
]);

export default treeMap;
