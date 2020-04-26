export default table => {
  const levels = new Map();
  const unMatching = [];

  const leveling = (arr, levelNumber = 0) => {
    let i = levelNumber;
    arr.forEach((level, index) => {
      if (!index && !levels.get(i)) {
        levels.set(i, level.Color);
      } else if (levels.get(i) !== level.Color) {
        unMatching.push(`in level = ${i} in span = ${index} color doesn't match to ${levels.get(i)}`);
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
