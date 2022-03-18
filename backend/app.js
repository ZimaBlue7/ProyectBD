const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));

// cors
app.use(cors());

// Router
app.use(require("./routes/index"));

// Puerto de salidad servidor
app.set("port", process.env.PORT || 4000);

app.listen(app.get("port"), () => {
  console.log("Servidor en puerto " + app.get("port"));
});
