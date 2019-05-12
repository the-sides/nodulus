var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home', { title: 'Nodulus Games' });
});

router.get('/comet',function(req, res, next){
  res.render('comet', { title: 'Comet' });
});

router.get('/test',function(req, res, next){
  res.render('testEnv', { title: 'Testing Env' });
});

module.exports = router;
