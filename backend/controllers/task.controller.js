const pool = require("../db");

const getAdmin = async (req, res) => {
  const response = await pool.query("SELECT * FROM admin");
  try {
    const id = response.rows;
    const usuario = response.rows;
    res.send(usuario);
  } catch (error) {
    res.status(500).json({
      message: "Ha ocurrido un error al tratar de obtener a al usuario",
      data: [],
      accion: "Obtener admin",
      error: error,
    });
  }
};

const crearAdmin = async (req, res) => {
  const { id, name_ad } = req.body;
  await pool.query("INSERT into admin (id, name_ad) VALUES ($1,$2)");
  try {
    console.log("try ");
  } catch (error) {
    res.status(500).json({
      message: "Ha ocurrido un error al tratar de insertar a al usuario",
      data: [],
      accion: "Insertar admin",
      error: error,
    });
  }
};

module.exports = {
  getAdmin,
  crearAdmin,
  //actualizarAdmin,
  //eliminarAdmin,
  //crearStudent,
  //crearStaff
};
