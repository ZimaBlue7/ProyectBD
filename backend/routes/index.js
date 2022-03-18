var express = require("express");
var router = express.Router();

/* Admin */
const {
  getAdmin,
  crearAdmin,
  //actualizarAdmin,
  //eliminarAdmin,
  //crearStudent,
  //crearStaff
} = require("../controllers/task.controller");

router.get("/admin", getAdmin);
router.get("/adadmin", crearAdmin);

/*router.get("/admin", (req, res) => {
  console.log("admin");
  admin_model
    .getAdmin()
    .then((response) => {
      res.status(200).send(response);
      res.send("admin");
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});*/

module.exports = router;
