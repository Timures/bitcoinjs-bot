var config = require('../config');
var Util   = require('./util');
var db     = require("mongojs").connect(config.dbInfo.url, config.dbInfo.collections);


var CoinbaseScraperSell = function() {
  // nothing happens
}

CoinbaseScraperSell.prototype.start = function() {
  setInterval(function() {
    Util.getHTTP({
      host: 'coinbase.com',
      path: '/api/v1/prices/sell'
    }, function(data) {
      db.coinbaseSell.save(JSON.parse(data), function(err, saved) {
        if ( err || !saved ) {
          console.log("Sell price not saved");
        } else {
          console.log("Sell price saved");
        }
      });
    });
  }, config.fcap.coinbase);
}

module.exports = new CoinbaseScraperSell();
