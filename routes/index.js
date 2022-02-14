var express = require('express');
var router = express.Router();
var controller = require('../controllers/index_controller');

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Auto Generate Tool' });
// });
router.get('/', controller.loadIndexView);

module.exports = router;
