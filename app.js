// Dependencies
var config          = require('./config');
var TweetScraper    = require('./lib/tweet_scraper');
var CoinbaseScraper = require('./lib/coinbase_scraper');
var db              = require("mongojs").connect(config.dbInfo.url, config.dbInfo.collections);
var express         = require('express');
var app             = express();

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);
app.engine('css', require('ejs').renderFile);
app.set('port', (process.env.PORT || 8000));

// Startup modules for Coinbase and Twitter
TweetScraper.start();
CoinbaseScraper.start({
  buyPrice:   true,
  sellPrice:  true,
  spotRate:   true,
  historical: true
})

app.get('/', function(req, res) {
  res.render('./index');
});

// Renders Twitter http://localhost:8000/tweets JSON API 
app.get('/tweets', function(req, res) {
  db.tweets.find( {}, { limit: 200, sort: { 'timestamp': -1 } }, function(err, tweets) {
    res.json(tweets);
  });
});

// Main Twitter page showing latest tweets
app.get('/twitter', function(req, res) {
  res.render('./twitter.ejs');
});

//  Renders Coinbase http://localhost:8000/coinbaseHistorical JSON API
app.get('/coinbaseHistorical', function(req, res) {
  db.coinbaseHistorical.find( {}, { limit: 200, sort: { 'date': -1 } }, function(err, coinbaseHistorical) {
    res.json(coinbaseHistorical);
  });
});

app.get('/coinbaseBuy', function(req, res) {
  db.coinbaseBuy.find( {}, { limit: 200, sort: { '_id': -1 } }, function(err, coinbaseBuy) {
    res.json(coinbaseBuy);
  });
});

app.get('/coinbaseSell', function(req, res) {
  db.coinbaseSell.find( {}, { limit: 200, sort: { '_id': -1 } }, function(err, coinbaseSell) {
    res.json(coinbaseSell);
  });
});

app.get('/coinbaseSpotRate', function(req, res) {
  db.coinbaseSpotRate.find( {}, { limit: 200, sort: { '_id': -1 } }, function(err, coinbaseSpotRate) {
    res.json(coinbaseSpotRate);
  });
});

// Main Coinbase page showing latest historical prices
app.get('/coinbase', function(req, res) {
  res.render('./coinbase.ejs');
});

app.get('/stylesheet.css', function(req, res) {
  res.render('../views/stylesheet.css');
});

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:", app.get('port'));
});
