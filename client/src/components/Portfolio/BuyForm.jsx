import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";

const BuyAndSellForm = ({ stock, getData, tradeStock }) => {
  const [stockName, setStockName] = useState("Stock Name");
  const [symbol, setSymbol] = useState("");
  const [currentTotal, setTotal] = useState("");

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

    setTimeout(() => {
      setTotal(formattedPrice.toFixed(2));
    });

    return (
      <div className="total-price">
        $ {formattedPrice.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")}
      </div>
    );
  };

  const getStockPrice = e => {
    e.persist();
    let symbol = e.target.value;
    if (symbol.length >= 2) {
      getData(symbol);
      setSymbol(symbol);
    }
  };

  useEffect(() => {
    if (stock[symbol.toUpperCase()]) {
      setStockName(stock[symbol.toUpperCase()].quote.companyName);
    }
  }, [stock]);

  const buyStock = e => {
    e.persist();

    getData(symbol)
      .then(() => {
        let nstock = stock[symbol.toUpperCase()];
        let total =
          parseFloat(nstock.quote.latestPrice) * Number(e.target["2"].value);
        let currentTotal = document
          .getElementsByClassName("total-price")[0]
          .innerText.slice(2);
        let isEqual = parseFloat(currentTotal) - total === 0;

        let transaction = {
          symbol: symbol,
          name: stockName,
          amount: Number(e.target["2"].value),
          price: parseFloat(nstock.quote.latestPrice),
          total: parseFloat(currentTotal),
          type: "buy"
        };
        if (!nstock && !isEqual) {
          let priceChangeConfirm = window.confirm(
            `${stockName} stock price has changed, would you still like to purchase at this new price?`
          );
          if (priceChangeConfirm) {
            tradeStock(transaction);
          } else {
            return;
          }
        } else if (nstock && isEqual) {
          tradeStock(transaction);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <div className="buy-form-container">
      <form
        action=""
        className="buy-form"
        onSubmit={e => {
          e.preventDefault();
          buyStock(e);
        }}
      >
        <TextField
          required
          id="symbol-outlined-required"
          label="Stock Symbol"
          variant="outlined"
          helperText="Enter a valid Stock Symbol"
          className="form-symbol"
          onChange={e => {
            getStockPrice(e);
          }}
        />
        <div className="stock-name-container">
          <div className="stock-name">{stockName}</div>
        </div>
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
        <div className="total-price-container">
          <Buy className="total-price" />
        </div>
        <button type="submit">BUY</button>
      </form>
    </div>
  );
};

export default BuyAndSellForm;
