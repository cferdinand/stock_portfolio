const topTen = (state = {}, action) => {
  switch (action.type) {
    case "HOME":
      return action.payload;
    default:
      return state;
  }
};

export default topTen;
