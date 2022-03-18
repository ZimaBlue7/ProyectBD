const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();
const db = require("./db");

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));

// cors
app.use(cors());

// Router
app.use(require("./routes/index"));

// Inicializacion de la base de datos
(async () => {
  try {
    await db.authenticate();
    await db.sync();
    console.log("Base de datos conectada ");
  } catch (error) {}
})();

// Puerto de salidad servidor
app.set("port", process.env.PORT || 4000);

app.listen(app.get("port"), () => {
  console.log("Servidor en puerto " + app.get("port"));
});
