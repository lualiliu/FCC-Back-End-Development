var express= require("express");
var multer = require("multer");
var fs     = require("fs");
var path   = require("path");
var upload = multer({dest:(path.join(__dirname,"/uploads"))});         // file destination
var router = express.Router();

var undone = "<p>Need to upload<p>"   //redirect home-page 

router.get("/",function(req,res){
	res.sendFile( __dirname + "/" + "index.html" );                                  // render homepage
});
router.post('/upload', upload.single('ssfile'), function (req, res, next) {
    //console.log(req);
    //console.log(req.files['0'].size);
    
	if (req.files['0']===undefined){
		res.send(undone);                                              // if file did not select
	}
	
	res.json({name:req.files['0'].originalFilename,size: req.files['0'].size});        // return json 
	
	fs.unlink(req.files['0'].path,function(err){						       // delete uploaded file
		if (err){return console.log(err)}
		console.log("Removed!")});
	
});

router.get("/upload",function(req,res){                                   // catch get call to "/upload"
	res.send(undone);                                                  // redirect home-page
});

module.exports = router;