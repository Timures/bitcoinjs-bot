var config       = require('./config');
var TweetScraper = require('./lib/tweet_scraper');
var CoinbaseScraperBuy = require('./lib/coinbase_scraper_buy');
var CoinbaseScraperSell = require('./lib/coinbase_scraper_sell');
var CoinbaseScraperSpotRate = require('./lib/coinbase_scraper_spotrate');

var express = require('express');
var app = express();
var db = require("mongojs").connect(config.dbInfo.url, config.dbInfo.collections);

app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);
app.set('port', (process.env.PORT || 8000));

TweetScraper.start();
CoinbaseScraperBuy.start();
CoinbaseScraperSell.start();
CoinbaseScraperSpotRate.start();


app.get('/', function(req, res) {
	db.tweets.find(function(err, tweets) {
		var allTweetsLength = tweets.length;

		var positive = tweets.filter(function(tweet) {
			return tweet.sentiment > 0;
		}).length

		var negative = tweets.filter(function(tweet) {
			return tweet.sentiment < 0;
		}).length

		var neutral = tweets.filter(function(tweet) {
			return tweet.sentiment === 0;
		}).length
		res.render('index.html', {
			tweetsGotten: allTweetsLength,
			negative: negative,
			positive: positive,
			neutral: neutral,
		});
	});
});

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:", app.get('port'));
});