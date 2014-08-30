var config          = require('./config');
var TweetScraper    = require('./lib/tweet_scraper');
var CoinbaseScraper = require('./lib/coinbase_scraper');

var express = require('express');
var app = express();

app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);
app.set('port', (process.env.PORT || 8000));

TweetScraper.start();
CoinbaseScraper.start({
  buyPrice: true,
  sellPrice: true,
  spotRate: false
})

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
		res.render('tweets.html');
	});
});

app.get('/about', function(req, res) {
	res.render('about.html');
});

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:", app.get('port'));
});
