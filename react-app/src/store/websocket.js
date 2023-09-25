const Alpaca = require("@alpacahq/alpaca-trade-api")
const API_KEY = "PKLT4FTNVNQRX5EJ5ZCW";
const API_SECRET = "EHrQxsSLWfqzfH5CP54WRk0Re1PZ42i2LITptDLh";

class DataStream {
  constructor({ apiKey, secretKey, feed }) {
    this.alpaca = new Alpaca({
      keyId: apiKey,
      secretKey,
      feed,
    });

    const socket = this.alpaca.data_stream_v2;

    socket.onConnect(function () {
      console.log("Connected");
      socket.subscribeForBars(["AAPL"]);
    //   socket.subscribeForBars(["AMZN"]);
    //   socket.subscribeForBars(["BABA"]);
    //   socket.subscribeForBars(["BAD"]);
    //   socket.subscribeForBars(["DIS"]);
    //   socket.subscribeForBars(["F"]);
    //   socket.subscribeForBars(["GOOGL"]);
    //   socket.subscribeForBars(["LUCID"]);
    //   socket.subscribeForBars(["META"]);
    //   socket.subscribeForBars(["MSFT"]);
    //   socket.subscribeForBars(["NFLX"]);
    //   socket.subscribeForBars(["NVDA"]);
    //   socket.subscribeForBars(["PYPL"]);
    //   socket.subscribeForBars(["RIVN"]);
    //   socket.subscribeForBars(["SNAP"]);
    //   socket.subscribeForBars(["TSLA"]);
    //   socket.subscribeForBars(["UBER"]);

      socket.subscribeForStatuses(["*"]);
    });

    socket.onError((err) => {
      console.log(err);
    });

    socket.onStockTrade((trade) => {
      console.log(trade);
    });

    socket.onStockQuote((quote) => {
      console.log(quote);
    });

    socket.onStockBar((bar) => {
      console.log(bar);
    });

    socket.onStatuses((s) => {
      console.log(s);
    });

    socket.onStateChange((state) => {
      console.log(state);
    });

    socket.onDisconnect(() => {
      console.log("Disconnected");
    });

    socket.connect();

    // unsubscribe from FB after a second
    setTimeout(() => {
      socket.unsubscribeFromTrades(["FB"]);
    }, 1000);
  }
}

let stream = new DataStream({
  apiKey: API_KEY,
  secretKey: API_SECRET,
  feed: "sip",
  paper: true,
});