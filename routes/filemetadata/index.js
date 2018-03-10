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
router.post("/upload",upload.single('user-file'),function(req,res){
    //console.log(req.file);
    res.writeHead(200, {'content-type':'application/json'});
    var op = {
        'Name':req.file.originalname,
        'Size':req.file.size
    };
    res.send(JSON.stringify(op));
});  	
router.get("/upload",function(req,res){                                   // catch get call to "/upload"
	res.send(undone);                                                  // redirect home-page
});

module.exports = router;