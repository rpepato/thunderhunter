var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Pepato' });
});

router.get('/thunderstorm', function (req, res) {
  global.io.sockets.emit('thunderstorm_data', "234");
  res.end('')
});

module.exports = router;
