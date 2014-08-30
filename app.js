var config       = require('./config');
var TweetScraper = require('./lib/tweet_scraper');
var CoinbaseScraper = require('./lib/coinbase_scraper');

TweetScraper.start();
CoinbaseScraper.start();