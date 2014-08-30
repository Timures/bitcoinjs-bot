var config = require('../config');
var Util   = require('./util');
var db     = require("mongojs").connect(config.dbInfo.url, config.dbInfo.collections);


var CoinbaseScraperSpotRate = function() {
  // nothing happens
}

CoinbaseScraperSpotRate.prototype.start = function() {
  setInterval(function() {
    Util.getHTTP({
      host: 'coinbase.com',
      path: '/api/v1/prices/spot_rate'
    }, function(data) {
      db.coinbaseSpotRate.save(JSON.parse(data), function(err, saved) {
        if ( err || !saved ) {
          console.log("Spot rate price not saved");
        } else {
          console.log("Spot rate price saved");
        }
      });
    });
  }, config.fcap.coinbase);
}

module.exports = new CoinbaseScraperSpotRate();
