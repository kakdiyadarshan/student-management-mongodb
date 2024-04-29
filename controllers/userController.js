const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const storage = require("node-persist");
storage.init(/* options ... */);
const staff = require("../models/staffModel");
const student = require("../models/studentModel");
const resultmodel = require("../models/resultModel");

// login staff (staff side)

exports.login = async (req, res) => {
  let checklogin = await storage.getItem("login");
  if (checklogin == undefined) {
    const data = await staff.find({ email: req.body.email });
    if (data.length == 1) {
      bcrypt.compare(
        req.body.password,
        data[0].password,
        async (error, result) => {
          if (result == true) {
            await storage.setItem("login", true);
            await storage.setItem("staff", data[0]);
            console.log("eaklfja", data[0]);
            var token = jwt.sign({ id: data[0].id }, "token_key");
            res.status(200).json({
              status: 200,
              message: "Login Successfully..!",
              token,
            });
          } else {
            res.status(201).json({
              status: 201,
              message: "check Email & Password",
            });
          }
        }
      );
    } else {
      res.status(201).json({
        status: 201,
        message: "check Email & Password",
      });
    }
  } else {
    res.status(201).json({
      status: 201,
      message: "Staff Already Login",
    });
  }
};

// logout staff

exports.logout = async (req, res) => {
  await storage.clear();
  res.status(200).json({
    status: "200",
    message: "Logout Successfully..!",
  });
};

// Get studnet list std

exports.getstudentlist = async (req, res) => {
  const check = await storage.getItem("staff");
  if (check != undefined) {
    const data = await student
      .find({ class_id: check.class_id })
      .populate("class_id");
    res.status(200).json({
      status: 200,
      message: "Student list successfully..!",
      data,
    });
  } else {
    res.status(201).json({
      status: 201,
      message: "please login !",
    });
  }
};

// Get all studnet list

exports.getallstudentlist = async (req, res) => {
  const check = await storage.getItem("staff");
  if (check != undefined) {
    const data = await student.find().populate("class_id");
    res.status(200).json({
      status: 200,
      message: "Student All list successfully..!",
      data,
    });
  } else {
    res.status(201).json({
      status: 201,
      message: "please login !",
    });
  }
};

// Add result

exports.addresult = async (req, res) => {
  const check = await storage.getItem("staff");
  console.log(req.body.studnet_id);
  if (check != undefined) {
    let id = req.params.id;
    let resultcheck = await resultmodel.find({ student_id: id });
    if (resultcheck.length == 0) {
      const s1 = Number(req.body.s1);
      const s2 = Number(req.body.s2);
      const s3 = Number(req.body.s3);
      const s4 = Number(req.body.s4);
      const s5 = Number(req.body.s5);
      const total = s1 + s2 + s3 + s4 + s5;
      const per = total / 5;
      const min = Math.min(s1, s2, s3, s4, s5);
      const max = Math.max(s1, s2, s3, s4, s5);
      let result = undefined;
      let grade = undefined;
      let temp = 0;

      if (s1 > 33) {
        temp++;
      }
      if (s2 > 33) {
        temp++;
      }
      if (s3 > 33) {
        temp++;
      }
      if (s4 > 33) {
        temp++;
      }
      if (s5 > 33) {
        temp++;
      }

      if (temp > 2) {
        if (per > 90) {
          grade = "A+";
        } else if (per > 80) {
          grade = "A";
        } else if (per > 70) {
          grade = "B+";
        } else if (per > 60) {
          grade = "B";
        } else if (per > 50) {
          grade = "C";
        } else if (per > 40) {
          grade = "D";
        } else if (per > 33) {
          grade = "E";
        } else {
          grade = "*****";
        }
      } else {
        grade = "*****";
      }

      if (temp == 5) {
        result = "Pass";
      } else if (temp == 3 || temp == 4) {
        result = "Atkt";
      } else {
        result = "Fail";
      }

      let obj = {
        student_id: req.body.studnet_id,
        s1,
        s2,
        s3,
        s4,
        s5,
        total,
        per,
        min,
        max,
        grade,
        result,
      };
      //   console.log("id",student_id);

      const data = await resultmodel.create(obj);
      res.status(200).json({
        status: 200,
        message: "Result Added Successfully..!",
        data,
      });
    } else {
      res.status(201).json({
        status: 201,
        message: "Result Already Exist !",
      });
    }
  } else {
    res.status(201).json({
      status: 201,
      message: "Please Login !",
    });
  }
};

exports.updateresult = async (req, res) => {
  const check = await storage.getItem("staff");
  if (check != undefined) {
    var id = req.params.id;
    const getdata = await resultmodel.findById(id);
    if (req.body.s1 == undefined) {
      req.body.s1 = getdata.s1;
    } else if (req.body.s2 == undefined) {
      req.body.s2 = getdata.s2;
    } else if (req.body.s3 == undefined) {
      req.body.s3 = getdata.s3;
    } else if (req.body.s4 == undefined) {
      req.body.s4 = getdata.s4;
    } else if (req.body.s5 == undefined) {
      req.body.s5 = getdata.s5;
    }
    const s1 = Number(req.body.s1);
    const s2 = Number(req.body.s2);
    const s3 = Number(req.body.s3);
    const s4 = Number(req.body.s4);
    const s5 = Number(req.body.s5);
    const total = s1 + s2 + s3 + s4 + s5;
    const per = total / 5;
    const min = Math.min(s1, s2, s3, s4, s5);
    const max = Math.max(s1, s2, s3, s4, s5);
    let result = undefined;
    let grade = undefined;
    let temp = 0;

    if (s1 > 33) {
      temp++;
    }
    if (s2 > 33) {
      temp++;
    }
    if (s3 > 33) {
      temp++;
    }
    if (s4 > 33) {
      temp++;
    }
    if (s5 > 33) {
      temp++;
    }

    if (temp > 2) {
      if (per > 90) {
        grade = "A+";
      } else if (per > 80) {
        grade = "A";
      } else if (per > 70) {
        grade = "B+";
      } else if (per > 60) {
        grade = "B";
      } else if (per > 50) {
        grade = "C";
      } else if (per > 40) {
        grade = "D";
      } else if (per > 33) {
        grade = "E";
      } else {
        grade = "*****";
      }
    } else {
      grade = "*****";
    }

    if (temp == 5) {
      result = "Pass";
    } else if (temp == 3 || temp == 4) {
      result = "Atkt";
    } else {
      result = "Fail";
    }

    let obj = {
      student_id: req.body.studnet_id,
      s1,
      s2,
      s3,
      s4,
      s5,
      total,
      per,
      min,
      max,
      grade,
      result,
    };
    const data = await resultmodel.findByIdAndUpdate(id, obj);
    res.status(200).json({
      status: 200,
      message: "Update Result",
    });
  } else {
    res.status(201).json({
      status: 201,
      message: "please login !",
    });
  }
};

exports.getresult = async (req, res) => {
  const check = await storage.getItem("staff");
  if (check != undefined) {
    const data = await resultmodel.find({ staff_id }).populate("student_id");
    res.status(200).json({
      status: 200,
      message: "Find All result",
      data,
    });
  } else {
    res.status(201).json({
      status: 201,
      message: "please login !",
    });
  }
};

exports.getsingleresult = async (req, res) => {
  const check = await storage.getItem("staff");
  if (check != undefined) {
    var id = req.params.id;
    const data = await resultmodel
      .find({ student_id: id })
      .populate("student_id");
    res.status(200).json({
      status: 200,
      message: "Find Single result",
      data,
    });
  } else {
    res.status(201).json({
      status: 201,
      message: "please login !",
    });
  }
};

exports.findclassresult = async (req, res) => {
  const check = await storage.getItem("staff");
  console.log(check);
  if (check) {
    let data = await resultmodel.find().populate("student_id");
    data = data.filter((detail) => {
      if (detail.student_id.class_id == check.class_id) {
        return 1;
      } else {
        return 0;
      }
    });
    res.status(200).json({
      status: 200,
      message: "Class list result",
      data,
    });
  } else {
    res.status(401).json({
      status: 401,
      message: "Please login !",
    });
  }
};

exports.classwisetop = async (req, res) => {
  const check = await storage.getItem("staff");
  console.log(check);
  if (check) {
    // let sort  = sort()
    let data = await resultmodel
      .find()
      .populate({
        path: "student_id",
        populate: {
          path: "class_id",
        },
      })
      .sort({ per: -1 });
    // data = data.filter((detail) => {
    //   if (detail.student_id.class_id == check.class_id) {
    //     return 1;
    //   } else {
    //     return 0;
    //   }
    // });
    res.status(200).json({
      status: 200,
      message: "Top 3 student",
      data,
    });
  } else {
    res.status(401).json({
      status: 401,
      message: "Please Staff login !",
    });
  }
};

// student show result

exports.studentlogin = async (req, res) => {
  const data = await student.find({ name: req.body.name });
  if (data.length == 1) {
    await storage.setItem("stu", data[0].id);
    var token = jwt.sign({ id: data[0].id }, "token_key");
    res.status(200).json({
      status: 200,
      message: "Login Successfully..!",
      token,
    });
  } else {
    res.status(201).json({
      status: 201,
      message: "check Email & Password",
    });
  }
};

exports.studentlogout = async (req, res) => {
  await storage.clear();
  res.status(200).json({
    status: 200,
    message: "Logout Successfully..!",
  });
};

exports.showresult = async (req, res) => {
  const test = await storage.getItem("stu");
  if (test != undefined) {
    var id = req.params.id;
    const data = await resultmodel.find({ student_id: id });
    res.status(200).json({
      status: 200,
      message: "Show the result ",
      data,
    });
  } else {
    res.status(201).json({
      status: 201,
      message: "please login !",
    });
  }
};
