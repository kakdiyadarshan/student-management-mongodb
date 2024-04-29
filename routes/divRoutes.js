var express = require('express');
var router = express.Router();
const div = require('../controllers/divController')

/* GET home page. */
router.post('/adddiv',div.insertstd);

module.exports = router;
