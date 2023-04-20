const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.get("Authorization");

  if (!authHeader) {
    const error = new Error("No autenticado");
    error.statusCode = 401;
    throw error;
  }

  const token = authHeader.split(" ")[1];
  let checkToken = false;
  try {
    checkToken = jwt.verify(token, "LLAVESECRETA");
  } catch (error) {
    console.log(error);
    error.statusCode = 500;
    throw error;
  }

  if (!checkToken) {
    const error = new Error("No autenticado");
    error.statusCode = 401;
    throw error;
  }

  next();
};
