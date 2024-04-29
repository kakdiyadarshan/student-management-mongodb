var express = require('express');
var router = express.Router();
var student = require('../controllers/studentController')

/* GET home page. */
router.post('/add_student',student.insertstudent);
router.get('/view_student',student.getstudent);
router.get('/studnet/:id',student.getonestudent);
router.put('/update_student/:id',student.updatestudent);
router.delete('/delete_student/:id',student.deletestudent);


module.exports = router;
