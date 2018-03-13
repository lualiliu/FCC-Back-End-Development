var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Stock Market' });
});

router.get('/names', function(req, res){
	res.json({names: global.names});
})

module.exports = router;
