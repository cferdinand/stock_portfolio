const base = { portfolioData: [], balance: null };
const portfolio = (state = base, action) => {
  switch (action.type) {
    case "PORTFOLIO":
      return action.payload;
    default:
      return state;
  }
};

export default portfolio;
