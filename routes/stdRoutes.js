var express = require('express');
var router = express.Router();
const std = require('../controllers/stdController')

/* GET home page. */
router.post('/addstd',std.insertstd);

module.exports = router;
