const express = require("express");
const routes = require("./routes");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

require("dotenv").config({ path: ".env" });

// conectar mongo
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
});

const app = express();

const whiteList = [process.env.FRONTEND_URL];
const corsOptions = {
  origin: (origin, callback) => {
    // Revisar si la peticiion viene de un servidor
    const existe = whiteList.some((dom) => dom === origin);
    if (existe) {
      callback(null, true);
    } else {
      callback(new Error("No permitido por CORS"));
    }
  },
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors(corsOptions));

// Rutas de la app
app.use("/", routes());

// carpeta pública
app.use(express.static("uploads"));

const host = process.env.HOST || "0.0.0.0";
const port = process.env.PORT || 5000;
app.listen(port, host, () => {
  console.log("El servidor está corriendo");
});
