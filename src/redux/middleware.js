export default () => {
  return next => {
    return action => {
      return next(action);
    };
  };
};
