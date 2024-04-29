var express = require('express');
var router = express.Router();
var staff = require('../controllers/staffController')

/* GET home page. */

// router.post('/staff_login',staff.login);
router.post('/add_staff',staff.insertstaff);
router.get('/view_staff',staff.getstaff);
router.get('/staff/:id',staff.getonestaff);
router.put('/upadte_staff/:id',staff.updatestaff);
router.delete('/delete_staff/:id',staff.deletestaff);

module.exports = router;
