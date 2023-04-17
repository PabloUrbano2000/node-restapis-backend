const Pedidos = require("../models/pedidos");

exports.nuevoPedido = async (req, res, next) => {
  try {
    const pedido = new Pedidos(req.body);

    await pedido.save();
    res.json({ mensaje: "Se agregó un nuevo pedido" });
  } catch (error) {
    console.log(error);
    next();
  }
};

exports.mostrarPedidos = async (req, res, next) => {
  try {
    const pedidos = await Pedidos.find({}).populate("cliente").populate({
      path: "pedido.producto",
      model: "Productos",
    });
    res.json(pedidos);
  } catch (error) {
    console.log(error);
    next();
  }
};

exports.mostrarPedido = async (req, res, next) => {
  try {
    const pedido = await Pedidos.findById(req.params.idPedido)
      .populate("cliente")
      .populate({
        path: "pedido.producto",
        model: "Productos",
      });

    if (!pedido) {
      res.json({ mensaje: "Ese pedido no existe" });
      next();
    }
    res.json(pedido);
  } catch (error) {
    console.log(error);
    next();
  }
};

exports.actualizarPedido = async (req, res, next) => {
  try {
    let pedido = await Pedidos.findOneAndUpdate(
      { _id: req.params.idPedido },
      req.body,
      { new: true }
    )
      .populate("cliente")
      .populate({
        path: "pedido.producto",
        model: "Productos",
      });

    res.json(pedido);
  } catch (error) {
    console.log(error);
    next();
  }
};

exports.eliminarPedido = async (req, res, next) => {
  try {
    await Pedidos.findOneAndDelete({ _id: req.params.idPedido });
    res.json({
      mensaje: "El pedido se ha eliminado",
    });
  } catch (error) {
    console.log(error);
    next();
  }
};
