const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/test', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  // we're connected!
});

const stockSchema = new mongoose.Schema({
  id: Number,
  name: String,
  symbol: String,
  analystHold: Number,
  robinhoodOwners: Number,
  price: Number,
  tags: [{ type: String }],
  historicPrice1D: [{ type: Number }],
  historicPrice1W: [{ type: Number }],
  historicPrice1M: [{ type: Number }],
  historicPrice3M: [{ type: Number }],
  historicPrice1Y: [{ type: Number }],
  historicPrice5Y: [{ type: Number }],
});

const Stock = mongoose.model('Stock', stockSchema);

module.exports.save = (stocksArray) => {
  Stock.deleteMany({}, (err) => {
    if (err) { throw err; }
    stocksArray.map((singleStock) => {
      const newStock = new Stock(singleStock);
      console.log(`Creating Data Entry Company ${singleStock.id}/100`);
      newStock.save((err, stock) => {
        if (err) throw err;
        if (stock.id === 100) {
          mongoose.disconnect();
        }
      });
    });
  })
};

module.exports.find = (id, endCallback) => {
  Stock.find({ id }, (err, stock) => {
    if (err) { throw err; }
    endCallback(stock);
  });
};
