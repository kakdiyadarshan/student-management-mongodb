var express = require('express');
var router = express.Router();
var user = require('../controllers/userController')

/* GET users listing. */

router.post('/login',user.login);
router.get('/view_student',user.getstudentlist);
router.get('/all_student',user.getallstudentlist);
router.post('/add_result',user.addresult);
router.get('/view_result',user.getresult);  
router.get('/view_result/:id',user.getsingleresult);
router.put('/update_result/:id',user.updateresult);
router.get('/class_result',user.findclassresult);
router.get('/class_top3',user.classwisetop);
router.get('/logout',user.logout);

// student

router.post('/student',user.studentlogin);
router.get('/showresult/:id',user.showresult);
router.get('/studentlogout',user.studentlogout);


module.exports = router;
