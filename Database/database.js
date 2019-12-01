const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/test', { useNewUrlParser: true, useUnifiedTopology: true});

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
  historicPrice1D: [{
    type: Number,
	}],
  historicPrice1W: [{
    type: Number,
	}],
  historicPrice1M: [{
    type: Number,
	}],
  historicPrice3M: [{
    type: Number,
	}],
  historicPrice1Y: [{
    type: Number,
	}],
  historicPrice5Y: [{
    type: Number,
	}],
});

const Stock = mongoose.model('Stock', stockSchema);

const save = (data) => {
  data.map((stock) => {
		const newStock = new Stock(stock);
    newStock.save((err, newStock) => {
      if (err) throw err;
    });
	});
};

const find = (id, endCallback) => {
  Stock.find({id: id}, (err, stock) => {
    if (err) {throw err; }
    endCallback(stock);
  })
}


module.exports.save = save;
module.exports.find = find;
