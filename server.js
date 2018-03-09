'use strict';

var express = require('express');
const queryString = require('query-string');

var app = express();

app.get('*', function (req, res) {
	var query = req.path.substring(1);
	var queryS = queryString.parse('date=' + query);
	var queryDate = new Date(query * 1000);
	if (!isValidDate(queryDate)) {
		queryDate = new Date(queryS.date);
	}

	if (!isValidDate(queryDate) || query == '') {
		res.statusCode = 422;

		let response = {
			'unix': null,
			'natural': null
		}
		res.send(response);
		res.end();
		return;
	}

	if (!isNaN(query)) {
		let ts = queryDate;
		let unixTime = ts.getTime()/1000;
		let natural = dateToNaturalTime(ts);
		let response = {
			'unix': unixTime,
			'natural': natural
		}
		res.send(response);
		res.end();
	} else {
		let ts = queryDate;
		let unixTime = ts.getTime()/1000;
		let natural = dateToNaturalTime(ts);
		let response = {
			'unix': unixTime,
			'natural': natural
		}
		res.send(response);
		res.end();
	}
});

function dateToNaturalTime(ts) {
	const moLookUp = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

	let m = ts.getMonth();
	let d = ts.getDate();
	let y = ts.getFullYear();

	m = moLookUp[m];

	return `${m} ${d}, ${y}`;
}

function isValidDate(d) {
  if ( Object.prototype.toString.call(d) !== "[object Date]" )
    return false;
  return !isNaN(d.getTime());
}

var port = process.env.PORT || 8080;
app.listen(port,  function () {
	console.log('Node.js listening on port ' + port + '...');
});