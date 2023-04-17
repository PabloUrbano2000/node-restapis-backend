const express = require("express");
const routes = require("./routes");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

// conectar mongo
mongoose.Promise = global.Promise;
mongoose.connect(
  "mongodb+srv://PabloUrbano2000:ElFutre23@cluster0.691e6ve.mongodb.net/restapis",
  {
    useNewUrlParser: true,
  }
);

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Rutas de la app
app.use("/", routes());

app.listen(5000);
