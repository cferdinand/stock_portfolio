import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";

const SellForm = ({ stockData, stocksList, getData, tradeStock }) => {
  const [stockName, setStockName] = useState("Stock Name");
  const [symbol, setSymbol] = useState("");
  const [currentTotal, setTotal] = useState(0);

  const StockList = () => {
    return stocksList.map((stock, idx) => {
      return (
        <option
          id={idx}
          key={idx}
          value={stock.stock_symbol}
          className="sell-option"
        >
          {`${stock.stock_symbol.toUpperCase()} - ${stock.stock_name}`}
        </option>
      );
    });
  };

  const Sell = () => {
    let formattedPrice = 0;
    let newStock = {};
    let amount = document.getElementsByClassName("form-amount");
    if (stockData[symbol.toUpperCase()]) {
      newStock = stockData[symbol.toUpperCase()].quote;
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
      <div>
        $ {formattedPrice.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")}
      </div>
    );
  };

  const getStockPrice = e => {
    e.persist();
    e.preventDefault();
    let symbol = e.target.value;
    getData(symbol);
    setSymbol(symbol);
  };

  useEffect(() => {
    if (stockData[symbol.toUpperCase()]) {
      setStockName(stockData[symbol.toUpperCase()].quote.companyName);
    }
  }, [stockData]);

  const sellStock = e => {
    e.persist();

    getData(symbol)
      .then(() => {
        let nstock = stockData[symbol.toUpperCase()];
        let total =
          parseFloat(nstock.quote.latestPrice) * e.target["1"].valueAsNumber;
        let isEqual = parseFloat(currentTotal) - total === 0;
        let transaction = {
          symbol: symbol,
          name: stockName,
          amount: e.target["1"].valueAsNumber,
          price: parseFloat(nstock.quote.latestPrice),
          total: parseFloat(currentTotal),
          type: "sell"
        };
        if (!nstock && !isEqual) {
          let priceChangeConfirm = window.confirm(
            `${stockName} stock price has changed, would you still like to sell at this new price?`
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
    <div className="sell-form-container">
      <form
        action=""
        className="buy-form"
        onSubmit={e => {
          e.preventDefault();
          sellStock(e);
        }}
      >
        <div className="sell-form-symbol">
          <select
            required
            className="sell-select sell-form"
            onChange={e => {
              getStockPrice(e);
            }}
            value={symbol}
          >
            <option value="" disabled className="sell-option">
              Pick A Stock
            </option>
            <StockList />
          </select>
        </div>
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
          onChange={Sell}
        />
        <div className="total-price-container">
          <Sell />
        </div>
        <button type="submit">SELL</button>
      </form>
    </div>
  );
};

export default SellForm;
