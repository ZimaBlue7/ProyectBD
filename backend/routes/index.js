var express = require("express");
var router = express.Router();

/* Admin */
const {
  getAdmin,
  autenticarUsers,
  addAdmin,
  addStaff,
  addCourse,
  addStudents,
  updateAdmin,
  eliminarAdmin
} = require("../controllers/task.controller");

router.get("/admin/", getAdmin);
router.get('/login/', autenticarUsers);
router.post('/administrador/', addAdmin);
router.post('/addcourse/', addCourse);
router.post('/personal/', addStaff);
router.post('/estudiante/', addStudents);
router.put('/admin/:id', updateAdmin);
router.delete('/admin/:id', eliminarAdmin);

module.exports = router;
