var config = require('../config');
var Util   = require('./util');
var db     = require("mongojs").connect(config.dbInfo.url, config.dbInfo.collections);


var CoinbaseScraperHist = function() {
	// nothing happens
}

CoinbaseScraperHist.prototype.start = function() {
	setInterval(function() {
		Util.getHTTP({
			host: 'coinbase.com',
			path: '/api/v1/prices/historical'
		}, function(data) {
			db.coinbaseHist.save(JSON.parse(data), function(err, saved) {
				if ( err || !saved ) {
					console.log("Hist price not saved");
				} else {
					console.log("Hist rate price saved");
				}
			});
		});
	}, config.fcap.coinbase);
}

module.exports = new CoinbaseScraperHist();