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
  res.render('testEnv', { title: 'testing env' });
});

router.get('/brawlbots',function(req, res, next){
  res.render('brawlbots', { title: 'Brawl Bots' });
});

module.exports = router;
