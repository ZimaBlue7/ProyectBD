var express = require("express");
var router = express.Router();

/* Admin */
const {
  getAdmin,
  autenticarUsers,
  addAdmin,
  addStaff,
  addStudents,
  updateAdmin,
  eliminarAdmin,
  updateStaff,
  eliminarStaff
} = require("../controllers/task.controller");

router.get("/admin/", getAdmin);
router.get("/personal/", getStaff);
router.post('/admin/', autenticarUsers);
router.post('/administrador/', addAdmin);
router.post('/personal/', addStaff);
router.post('/estudiante/', addStudents);
router.put('/admin/:id', updateAdmin);
router.delete('/admin/:id', eliminarAdmin);
router.put('/personal/:id', updateStaff);
router.delete('/personal/:id', eliminarStaff);

module.exports = router;
