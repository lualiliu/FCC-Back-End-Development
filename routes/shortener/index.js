"use strict"
var express = require('express');
var router = express.Router();

let count = 0;
let urls = {};

router.get('/new/:id', (req,res)=>{
  let obj = shorten('http://', req.params.id, req.hostname);
  res.send(JSON.stringify(obj));
  res.end();
});

router.get('/new/http://:id', (req,res)=>{
  let obj = shorten('http://', req.params.id, req.hostname);
  res.send(JSON.stringify(obj));
  res.end();
});

router.get('/new/https://:id', (req,res)=>{
  let obj = shorten('https://', req.params.id, req.hostname);
  res.send(JSON.stringify(obj));
  res.end();
});

const shorten = function(proto, url, hostname){
  count++;
  urls[count] = proto+url;
  return {
    'original_url': urls[count],
    'short_url': `${hostname}/`+'api/shortener/'+`${count}`
  }
}

router.get('/:id', (req, res)=>{
  res.redirect(urls[req.params.id]);
  res.end();
});

module.exports = router;