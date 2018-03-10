var express= require("express");
var multer = require("multer");
var fs     = require("fs");
var path   = require("path");
var upload = multer({dest:(path.join(__dirname,"/uploads"))});         // file destination
var router = express.Router();

var undone = "<p>Need to upload <a href='https://mgjean-meta.glitch.me/'>back</a><p>"   //redirect home-page 

router.get("/",function(req,res){
	res.sendFile( __dirname + "/" + "index.html" );                                  // render homepage
});
router.post("/upload",upload.single("image"),function(req,res){
	if (req.file===undefined){
		res.send(undone);                                              // if file did not select
	}
	res.json({name:req.file.originalname,size: req.file.size});        // return json 
	fs.unlink(req.file.path,function(err){						       // delete uploaded file
		if (err){return console.log(err)}
		console.log("Removed!")});	
});
  
router.get("/upload",function(req,res){                                   // catch get call to "/upload"
	res.send(undone);                                                  // redirect home-page
});

module.exports = router;