var express = require("express");
var router = express.Router();

const {
  getAdmin,
  getStaff,
  autenticarUsers,
  addAdmin,
  addStaff,
  addCourse,
  addStudents,
  updateAdmin,
  updateCourse,
  getStudents,
  eliminarAdmin,
  eliminarCourse,
  getCourse,
  updateStaff,
  updateStudent,
  eliminarStaff,
  eliminarStudent
} = require("../controllers/task.controller");

router.get("/admin/", getAdmin);
router.get("/course/", getCourse);
router.get("/student/", getStudents);
router.get("/staff/", getStaff);
router.post('/login/', autenticarUsers);
router.post('/administrador/', addAdmin);
router.post('/addcourse/', addCourse);
router.post('/personal/', addStaff);
router.post('/addstudent/', addStudents);
router.put('/admin/:id', updateAdmin);
router.put('/staff/:id', updateStaff);
router.put('/students/:id', updateStudent);
router.put('/course/:id', updateCourse);
router.delete('/admin/:id', eliminarAdmin);
router.delete('/course/:id', eliminarCourse);
router.delete('/personal/:id', eliminarStaff);
router.delete('/student/:code', eliminarStudent);

module.exports = router;
