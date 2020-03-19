const pricingData = (state = {}, action) => {
  switch (action.type) {
    case "PRICING_DATA":
      return action.payload;
    default:
      return state;
  }
};

export default pricingData;
