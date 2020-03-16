import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";

const BuyAndSellForm = ({ stock, getData }) => {
  const [stockName, setStockName] = useState("Choose Your Stock");
  const [symbol, setSymbol] = useState("");

  const Buy = () => {
    let formattedPrice = 0;
    let newStock = {};
    let amount = document.getElementsByClassName("form-amount");
    if (stock[symbol.toUpperCase()]) {
      newStock = stock[symbol.toUpperCase()].quote;
      formattedPrice = newStock.latestPrice;
    }
    if (amount.length > 0) {
      amount = amount.item(0).childNodes[1].firstElementChild.value;
      if (Number(amount) > 0) {
        formattedPrice *= amount;
      }
    }
    return (
      <div>
        $ {formattedPrice.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")}
      </div>
    );
  };

  const getStockPrice = e => {
    e.persist();
    let symbol = e.target.value;
    if (symbol.length >= 2) {
      getData(symbol);
      setSymbol(e.target.value);
    }
  };

  const buyStock = e => {};

  useEffect(() => {
    if (stock[symbol.toUpperCase()]) {
      setStockName(stock[symbol.toUpperCase()].quote.companyName);
    }
  }, [stock]);

  return (
    <div>
      <form
        action=""
        className="buy-form"
        onSubmit={e => {
          buyStock(e);
        }}
      >
        <TextField
          required
          id="symbol-outlined-required"
          label="Stock Symbol"
          variant="outlined"
          helperText="Enter a valid Stock Symbol"
          onChange={e => {
            getStockPrice(e);
          }}
        />
        <div>{stockName}</div>
        <TextField
          required
          id="amount-outlined-required"
          label="Amount"
          variant="outlined"
          helperText="Amount of Stock to Trade"
          type="number"
          pattern="\d+"
          className="form-amount"
          onChange={Buy}
        />
        <Buy />
        <button type="submit">BUY</button>
      </form>
    </div>
  );
};

export default BuyAndSellForm;
