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

const getStudents = async (req, res) => {
  try {
    const response = await pool.query("SELECT * FROM Users WHERE description = 'Estudiante' OR description = 'estudiante' ");
    const usuario = response.rows;
    res.send(usuario);
  } catch (error) {
    res.status(500).json({
      message: "Ha ocurrido un error al tratar de obtener a los estudiantes",
      data: [],
      accion: "Obtener estudiante",
      error: error,
    });
  }
};

const getCourse = async (req, res) => {
  try {
    const response = await pool.query("SELECT * FROM course");
    const course = response.rows;
    res.send(course);
  } catch (error) {
    res.status(500).json({
      message: "Ha ocurrido un error al tratar de obtener a los cursos",
      data: [],
      accion: "Obtener cursos",

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
    const {usuario, password} = req.body;
    console.log("body ", req.body.usuario);
    const response = await pool.query('SELECT * FROM Users WHERE (name_u = $1 OR email= $1) AND password = $2', [
      usuario,
      password
    ])

    res.send(response.rows);

  } catch (error) {
    res.status(500).json({
      message: "Ha ocurrido un error al tratar de autenticar al usuario",
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

const updateCourse = async (req, res) => {
  try {
    const {id} = req.params;
    const {name} = req.body;
    await pool.query('UPDATE Course SET name_co = $1 WHERE id = $2', [
      name,
      id
    ])

    res.json({
      message: 'El curso se actualizo',
      data: {
        id,
        name
      }
    })
    
  } catch (error) {
    res.status(500).json({
      message: "Ha ocurrido un error al tratar de actualizar al curso",
      data: [],
      accion: "Actualizar curso",
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


const eliminarCourse = async (req, res) => {
  try {

    const {id} = req.params;
    await pool.query('DELETE FROM course WHERE id = $1', [id])
    
  } catch (error) {
    res.status(500).json({
      message: "Ha ocurrido un error al tratar de eliminar al administrador",
      data: [],
      accion: "Eliminar administrador",
      error: error,
    });
  }
}

const addCourse = async (req, res) => {
  try {
    const {id, name_co, id_staff} = req.body;
    await pool.query('INSERT INTO Course (id, name_co, id_staff) VALUES ($1, $2, $3)', [
      id, 
      name_co, 
      id_staff
    ]);

    res.json({
      message: 'El curso se creo',
      data: {
        id, 
        name_co, 
        id_staff
      }
    })
    
  } catch (error) {
    res.status(500).json({
      message: "Ha ocurrido un error al tratar de crear a al curso",
      data: [],
      accion: "Crear curso",
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


module.exports = {
  getAdmin,
  getStudents,
  getStaff,
  getCourse,
  addAdmin,
  addStaff,
  addStudents,
  autenticarUsers,
  addCourse,
  updateAdmin,
  updateCourse,
  eliminarAdmin, 
  eliminarCourse,
  updateStaff,
  eliminarStaff
};
