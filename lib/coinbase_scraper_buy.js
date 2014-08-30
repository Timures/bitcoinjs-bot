var config = require('../config');
var Util   = require('./util');
var db     = require("mongojs").connect(config.dbInfo.url, config.dbInfo.collections);


var CoinbaseScraperBuy = function() {
  // nothing happens
}

CoinbaseScraperBuy.prototype.start = function() {
  setInterval(function() {
    Util.getHTTP({
      host: 'coinbase.com',
      path: '/api/v1/prices/buy'
    }, function(data) {
      db.coinbaseBuy.save(JSON.parse(data), function(err, saved) {
        if ( err || !saved ) {
          console.log("Buy price not saved");
        } else {
          console.log("Buy price saved");
        }
      });
    });
  }, config.fcap.coinbase);
}

module.exports = new CoinbaseScraperBuy();
