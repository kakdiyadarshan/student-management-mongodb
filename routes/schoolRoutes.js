var express = require('express');
var router = express.Router();
const school = require('../controllers/schoolController');

/* GET home page. */

router.post('/',school.insertschool);
router.post('/login',school.login);
router.get('/admin_logout',school.adminlogout);

module.exports = router;
