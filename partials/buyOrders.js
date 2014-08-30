app.get('/coinbase', function(req, res) {
	db.coinbaseBuy.find(function(err, coinbaseBuy) {
		var allCoinbaseBuyLength = coinbaseBuy.length;
		res.render('coinbase.html', {
			buyOrders: allCoinbaseBuyLength,
		})
	});
});