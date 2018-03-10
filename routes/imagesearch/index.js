var express = require('express');
var request = require('request');
var url = require('url');
var router = express.Router();


router.get('/:query', function(req, res) {
	url = "https://cryptic-ridge-9197.herokuapp.com/api/imagesearch/"+req.params.query;
	console.log(url);
	request(url, function (error, response, body) {
	if (!error && response.statusCode == 200) {
	    var jsonArr = JSON.parse(body);
	    console.log(jsonArr);
	  }
	})
	res.json(jsonArr);
});

module.exports = router;