var config = require('../config');
var Util   = require('./util');
var db     = require("mongojs").connect(config.dbInfo.url, config.dbInfo.collections);


var CoinbaseScraper = function() {
  // nothing happens
}

CoinbaseScraper.prototype.start = function(options) {
  if (options == undefined) {
    throw "Parameter 'options' is required.";
  } else {
    this.options = options;
  }

  setInterval(function() {
    if (this.options.buyPrice) {
      this.getAndSaveBuyPrice();
    }

    if (this.options.sellPrice) {
      this.getAndSaveSellPrice();
    }

    if (this.options.spotRate) {
      this.getAndSaveSpotRate();
    }
  }.bind(this), config.fcap.coinbase);
}

CoinbaseScraper.prototype.getAndSaveBuyPrice = function() {
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
}

CoinbaseScraper.prototype.getAndSaveSellPrice = function() {
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
}

CoinbaseScraper.prototype.getAndSaveSpotRate = function() {
  Util.getHTTP({
    host: 'coinbase.com',
    path: '/api/v1/prices/spot_rate'
  }, function(data) {
    db.coinbaseSpotRate.save(JSON.parse(data), function(err, saved) {
      if ( err || !saved ) {
        console.log("Spot Rate not saved");
      } else {
        console.log("Spot Rate saved");
      }
    });
  });
}

module.exports = new CoinbaseScraper();
