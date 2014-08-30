var config = require('../config');

var SentimentAnalyzer = function(sentence) {
	this.sentence = sentence.toLowerCase();
	return this;
}

SentimentAnalyzer.prototype.analyze = function() {
	var sentimentValue = 0;

	config.positiveWords.forEach(function(word) {
		if (this.sentence.indexOf(word) != -1 ) {
			sentimentValue++;
		}
	}.bind(this)); // Way to say, forget what this is, i want it to be equal to this thing (what is outside of this function)

	config.negativeWords.forEach(function(word) {
		if (this.sentence.indexOf(word) != -1 ) {
			sentimentValue--;
		}
	}.bind(this));

	return sentimentValue;
}

module.exports = SentimentAnalyzer;