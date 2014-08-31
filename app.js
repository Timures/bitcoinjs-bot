var config          = require('./config');
var TweetScraper    = require('./lib/tweet_scraper');
var CoinbaseScraper = require('./lib/coinbase_scraper');

var db = require("mongojs").connect(config.dbInfo.url, config.dbInfo.collections);
var express = require('express');
var app = express();

app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);
app.set('port', (process.env.PORT || 8000));

TweetScraper.start();
CoinbaseScraper.start({
  buyPrice:   true,
  sellPrice:  true,
  spotRate:   true,
  historical: true
})

app.get('/tweets', function(req, res) {
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

    res.render('tweets.html', {
      tweetsGotten: allTweetsLength,
      negative: negative,
      positive: positive,
      neutral: neutral,
    });
  });
});

app.get('/coinbaseBuy', function(req, res) {
	db.coinbaseBuy.find(function(err, coinbaseBuy) {
		var allCoinbaseBuyLength = coinbaseBuy.length

    var last10Buy = db.coinbaseBuy.find().sort('amount').limit(10).skip(0);

		res.render('coinbaseBuy.html', {
			buyOrders: allCoinbaseBuyLength,
      last10: last10Buy
		})
	});
});

app.get('/coinbaseSell', function(req, res) {
  db.coinbaseSell.find(function(err, coinbaseSell) {
    var allCoinbaseSellLength = coinbaseSell.length;

    res.render('coinbaseSell.html', {
      sellOrders: allCoinbaseSellLength
    })
  });
});

app.get('/coinbaseSpotRate', function(req, res) {
  db.coinbaseSpotRate.find(function(err, coinbaseSpotRate) {
    var allCoinbaseSpotRateLength = coinbaseSpotRate.length
    res.render('coinbaseSpotRate.html', {
      spotRateOrders: allCoinbaseSpotRateLength
    })
  });
});

app.get('/coinbaseHistorical', function(req, res) {
  db.coinbaseHistorical.find(function(err, coinbaseHistorical) {
    var allCoinbaseHistoricalLength = coinbaseHistorical.length
    res.render('coinbaseHistorical.html', {
      historicalOrders: allCoinbaseHistoricalLength
    })
  });
});

app.get('/', function(req, res) {
	db.tweets.find(function(err, tweets) {
		res.render('index.html');
	});
});

app.get('/coinbase', function(req, res) {
	db.coinbaseBuy.find(function(err, coinbaseBuy) {
		var allCoinbaseBuyLength = coinbaseBuy.length
		res.render('coinbase.html', {
			buyOrders: allCoinbaseBuyLength
		})
	});
});

app.get('/tweets', function(req, res) {
	db.tweets.find(function(err, tweets) {
		res.render('tweets.html', {

		});
	});
});

app.get('/about', function(req, res) {
	res.render('about.html', {

	});
});

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:", app.get('port'));
});
