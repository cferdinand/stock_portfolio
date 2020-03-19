const tradePrices = (state = {}, action) => {
  switch (action.type) {
    case "TRADE":
      return action.payload;
    case "TRADE_ERROR":
      return action.payload;
    default:
      return state;
  }
};

export default tradePrices;
