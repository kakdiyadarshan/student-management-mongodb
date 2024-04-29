const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const student = require('../models/studentModel')
const resultmodel = require('../models/resultModel')

// add studnet (admin)

exports.insertstudent = async (req, res) => {
    const checkrollno = await student.find({rollno:req.body.rollno})
    if(checkrollno == 0)
    {
        const data = await student.create(req.body);
        res.status(200).json({
            status: 200,
            message: "student Registered Successfully..!",
            data
        })
    }
   else{
    res.status(201).json({
        status: 201,
        message: "student Already Provide RollNo..!",
    })
   }
}

// get student

exports.getstudent = async (req, res) => {
    const data = await student.find().populate('class_id');
    res.status(200).json({
        status: 200,
        message: "Student view Successfully..!",
        data
    })
}

// get single studnet 

exports.getonestudent = async (req, res) => {
    var id = req.params.id
    const data = await student.findById(id);
    res.status(200).json({
        status: 200,
        message: "student one view Successfully..!",
        data
    })
}

// update studnet

exports.updatestudent = async (req, res) => {
    var id = req.params.id
    const data = await student.findByIdAndUpdate(id,req.body);
    res.status(200).json({
        status: 200,
        message: "student update Successfully..!",
    })
}

// delete studnet

exports.deletestudent = async (req, res) => {
    var id = req.params.id
    const data = await student.findByIdAndDelete(id);
    res.status(200).json({
        status: 200,
        message: "student delete Successfully..!",
    })
}

exports.adminviewtop3 = async(req,res) => {
    const check = await storage.getItem("admin");
  if (check) {
    let data = await resultmodel.find().populate("student_id").sort({per:-1}).limit(3);
    data = data.filter((detail) => {
      if (detail.studen232t_id.class_id == check.class_id) {
        return 1;
      } else {
        return 0;
      }
    });
    res.status(200).json({
      status: 200,
      message: "Top 3 student",
      data,
    });
  } else {
    res.status(401).json({
      status: 401,
      message: "Please login !",
    });
  }
}

