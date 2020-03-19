const currencyFormat = num => {
  if (num) {
    return num.toLocaleString("en-US", {
      style: "currency",
      currency: "USD"
    });
  }
  return "N/A";
};

export default currencyFormat;
