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
  eliminarAdmin
} = require("../controllers/task.controller");

router.get("/admin/", getAdmin);
router.post('/admin/', autenticarUsers);
router.post('/administrador/', addAdmin);
router.post('/personal/', addStaff);
router.post('/estudiante/', addStudents);
router.put('/admin/:id', updateAdmin);
router.delete('/admin/:id', eliminarAdmin);

module.exports = router;
