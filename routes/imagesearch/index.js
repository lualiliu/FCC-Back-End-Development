var express = require('express');
var request = require('request');
var url = require('url');
var router = express.Router();


app.get('/', function(req, res) {
	qurl = url.parse(req.url, true);
	qurl.query.date = new Date();


	var offset;
	var config = { url : "http://api.pixplorer.co.uk/image",
	    qs : {amount : 10, size: "l" }};
	
	if (qurl.query.hasOwnProperty('amount'))
	    config.qs.amount = qurl.query.amount;

	if (qurl.query.hasOwnProperty('word'))
	    config.qs.word = qurl.query.word;

	request(config, function(error, response, body) {
	    if (error)
		throw error;

	    res.send(JSON.parse(body).images);
	});
});

module.exports = router;