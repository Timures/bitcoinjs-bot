var config    = require('../config');
var sentiment = require('sentiment');
var Twitter   = require('node-tweet-stream');
var db = require("mongojs").connect(config.dbInfo.url, config.dbInfo.collections);

// Calls tweeter and scraper
var TweetScraper = function() {
  this.API = new Twitter(config.apiInfo);

  this.API.on('tweet', function(tweet) {
    this.saveToDB(tweet);
    this.log(tweet);
  }.bind(this));
}

// Saves tweets to db
TweetScraper.prototype.saveToDB = function(tweet) {
  data = {
    timestamp: Date.now(),
    apiData: tweet,
    sentiment: sentiment(tweet.text).score
  }

  db.tweets.save(data, function(err, saved) {
    if ( err || !saved ) {
      console.log("Tweet not saved");
    } else {
      console.log("Tweet saved");
    }
  });
}

TweetScraper.prototype.log = function(tweet) {
  console.log("Tweet Found: ", tweet.text);
}

TweetScraper.prototype.start = function() {
  this.API.track(config.btcKeywords);
}

TweetScraper.prototype.stop = function() {
  API.untrack(config.btcKeywords);
}

module.exports = new TweetScraper();
