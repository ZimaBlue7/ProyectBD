var express = require("express");
var router = express.Router();

const {
  getAdmin,
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
  getCourse
} = require("../controllers/task.controller");

router.get("/admin/", getAdmin);
router.get("/course/", getCourse);
router.get("/students/", getStudents);
router.post('/login/', autenticarUsers);
router.post('/administrador/', addAdmin);
router.post('/addcourse/', addCourse);
router.post('/personal/', addStaff);
router.post('/estudiante/', addStudents);
router.put('/admin/:id', updateAdmin);
router.put('/course/:id', updateCourse);
router.delete('/admin/:id', eliminarAdmin);
router.delete('/course/:id', eliminarCourse);

module.exports = router;
