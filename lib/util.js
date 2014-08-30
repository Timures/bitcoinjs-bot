var http = require('https');

var utilities = {
	getHTTP: function(urlOptions, callback) {
		var request = http.request(urlOptions, function (res) {

		    var data = '';
		    res.on('data', function (chunk) {
		        data += chunk;
		    });
		    res.on('end', function () {
		        callback(data);
		    });
		});

		request.on('error', function (e) {
		    console.log(e.message);
		});

		request.end();
	}
}

module.exports = utilities;