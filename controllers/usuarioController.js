const Usuarios = require("../models/usuarios");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.registrarUsuario = async (req, res) => {
  const usuario = new Usuarios(req.body);
  usuario.password = await bcrypt.hash(req.body.password, 12);
  try {
    await usuario.save();
    res.json({ code: 0, mensaje: "Usuario creado correctamente" });
  } catch (error) {
    console.log(error);
    res.json({ mensaje: "Hubo un error" });
  }
};

exports.autenticarUsuario = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const usuario = await Usuarios.findOne({ email });
    if (!usuario) {
      return res.status(401).json({ mensaje: "Ese usuario no existe" });
    }

    if (!bcrypt.compareSync(password, usuario.password)) {
      return res.status(401).json({
        mensaje: "Password Incorrecto",
      });
    }

    // crear token
    const token = jwt.sign(
      {
        email: usuario.email,
        nombre: usuario.nombre,
        id: usuario._id,
      },
      "LLAVESECRETA",
      {
        expiresIn: "1h",
      }
    );

    res.json({ code: 0, token });
  } catch (error) {
    console.log(error);
    res.status(401).json({
      mensaje: "Ocurrió un error inesperado",
    });
  }
};
