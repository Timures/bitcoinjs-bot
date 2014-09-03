var config          = require('./config');
var TweetScraper    = require('./lib/tweet_scraper');
var CoinbaseScraper = require('./lib/coinbase_scraper');

var db = require("mongojs").connect(config.dbInfo.url, config.dbInfo.collections);
var express = require('express');
var app = express();

app.set('front', __dirname + '/front');
app.engine('html', require('ejs').renderFile);
app.engine('css', require('ejs').renderFile);
app.set('port', (process.env.PORT || 8000));

TweetScraper.start();
CoinbaseScraper.start({
  buyPrice:   true,
  sellPrice:  true,
  spotRate:   true,
  historical: true
})

app.get('/tweets', function(req, res) {
  db.tweets.find( {}, { limit : 1000 }, function(err, tweets) {
    res.json(tweets);
  });
});

app.get('/', function(req, res) {
  res.render('../front/twitter.html');
});

app.get('/stylesheet.css', function(req, res) {
  res.render('../front/stylesheet.css');
});


app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:", app.get('port'));
});
