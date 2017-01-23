var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next){
  res.status(200).render('index.html');
});

router.post('/', function(req, res){
  res.status(200).send('POST request on the todos route');
});

module.exports = router;
