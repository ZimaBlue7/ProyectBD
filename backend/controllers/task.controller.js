const pool = require("../db");

const getAdmin = async (req, res) => {
  try {

    const id = req.rows;
    const response = await pool.query("SELECT * FROM Users WHERE description = 'Administrador' OR description = 'administrador' ");
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

const getStaff = async (req, res) => {
  try {

    const id = req.rows;
    const response = await pool.query("SELECT * FROM Users WHERE description = 'Staff' OR description = 'staff' ");
    const usuario = response.rows;
    res.send(usuario);

  } catch (error) {
    res.status(500).json({
      message: "Ha ocurrido un error al tratar de obtener a al usuario",
      data: [],
      accion: "Obtener Staff",
      error: error,
    });
  }
};

const autenticarUsers = async (req, res) => {
  try {
    
    const {email, password} = req.body;

    const usuarios = await pool.query('SELECT * FROM Users WHERE email = $1 and password = $2', [
      email,
      password
    ])

    res.json(usuarios.rows);

  } catch (error) {
    res.status(500).json({
      message: "Ha ocurrido un error al tratar de autenticar a al usuario",
      data: [],
      accion: "Autenticar usuario",
      error: error,
    });
  }
}

const addAdmin = async (req, res) => {
  try {

    const {identificacion, nombre, password, email, description} = req.body;
    await pool.query('INSERT INTO Users (id, name_u, password, description, email) VALUES ($1, $2, $3, $4, $5)', [
      identificacion, 
      nombre, 
      password,
      description, 
      email
    ]);

    res.json({
      message: 'El Admin se creo',
      data: {
        identificacion, 
        nombre, 
        password,
        description, 
        email
      }
    })
    
  } catch (error) {
    res.status(500).json({
      message: "Ha ocurrido un error al tratar de crear a al usuario",
      data: [],
      accion: "Crear usuario",
      error: error,
    });
  }
}

const addStaff = async (req, res) => {
  try {

    const {identificacion, nombre, especialidad, password, email, description} = req.body;
    await pool.query('INSERT INTO Users (id, name_u, password, description, email) VALUES ($1, $2, $3, $4, $5)', [
      identificacion, 
      nombre, 
      password,
      description, 
      email
    ]);

    await pool.query('INSERT INTO Staff (id, speciality) VALUES ($1, $2)', [
      identificacion,
      especialidad
    ])

    res.json({
      message: 'El staff se creo',
      data: {
        identificacion, 
        nombre, 
        especialidad, 
        password, 
        email, 
        description
      }
    })
    
  } catch (error) {
    res.status(500).json({
      message: "Ha ocurrido un error al tratar de crear a al usuario",
      data: [],
      accion: "Crear usuario",
      error: error,
    });
  }
}

const addStudents = async (req, res) => {
  try {

    const {identificacion, nombre, semester, programa, password, email, description} = req.body;
    await pool.query('INSERT INTO Users (id, name_u, password, description, email) VALUES ($1, $2, $3, $4, $5)', [
      identificacion, 
      nombre, 
      password,
      description, 
      email
    ]);

    await pool.query('INSERT INTO Students (id, semester, programa) VALUES ($1, $2, $3)', [
      identificacion,
      semester, 
      programa
    ])

    res.json({
      message: 'El Students se creo',
      data: {
        identificacion, 
        nombre, 
        semester, 
        programa, 
        password, 
        email, 
        description
      }
    })
    
  } catch (error) {
    res.status(500).json({
      message: "Ha ocurrido un error al tratar de crear a al usuario",
      data: [],
      accion: "Crear usuario",
      error: error,
    });
  }
}

const updateAdmin = async (req, res) => {
  try {

    const {id} = req.params;
    const {nombre, password, email} = req.body;

    await pool.query('UPDATE Users SET name_u = $1, password = $2, email = $3 WHERE id = $4', [
      nombre, 
      password, 
      email,
      id
    ])

    res.json({
      message: 'El administrado se actualizo',
      data: {
        id,
        nombre, 
        password, 
        email
      }
    })
    
  } catch (error) {
    res.status(500).json({
      message: "Ha ocurrido un error al tratar de actualizar al administrador",
      data: [],
      accion: "Actualizar administrador",
      error: error,
    });
  }
}

const updateStaff = async (req, res) => {
  try {

    const {id} = req.params;
    const {nombre, password, email} = req.body;

    await pool.query('UPDATE Users SET name_u = $1, password = $2, email = $3 WHERE id = $4', [
      nombre, 
      password, 
      email,
      id
    ])

    res.json({
      message: 'El Staff se actualizo',
      data: {
        id,
        nombre, 
        password, 
        email
      }
    })
    
  } catch (error) {
    res.status(500).json({
      message: "Ha ocurrido un error al tratar de actualizar al Staff",
      data: [],
      accion: "Actualizar Staff",
      error: error,
    });
  }
}

const eliminarAdmin = async (req, res) => {
  try {

    const {id} = req.params;

    await pool.query('DELETE FROM Users WHERE id = $1', [id])
    
  } catch (error) {
    res.status(500).json({
      message: "Ha ocurrido un error al tratar de eliminar al administrador",
      data: [],
      accion: "Eliminar administrador",
      error: error,
    });
  }
}

const eliminarStaff = async (req, res) => {
  try {

    const {id} = req.params;

    await pool.query('DELETE FROM Users WHERE id = $1', [id])
    
  } catch (error) {
    res.status(500).json({
      message: "Ha ocurrido un error al tratar de eliminar al Staff",
      data: [],
      accion: "Eliminar Staff",
      error: error,
    });
  }
}

module.exports = {
  getAdmin,
  getStaff,
  autenticarUsers,
  addAdmin,
  addStaff,
  addStudents,
  updateAdmin,
  eliminarAdmin,
  updateStaff,
  eliminarStaff
};
