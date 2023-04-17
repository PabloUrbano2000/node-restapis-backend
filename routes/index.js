const express = require("express");
const router = express.Router();
const clientesController = require("../controllers/clienteController");
const productosController = require("../controllers/productoController");
const pedidosController = require("../controllers/pedidoController");

module.exports = function () {
  router.post("/clientes", clientesController.nuevoCliente);

  router.get("/clientes", clientesController.mostrarClientes);

  router.get("/clientes/:idCliente", clientesController.mostrarCliente);

  router.put("/clientes/:idCliente", clientesController.actualizarCliente);

  router.delete("/clientes/:idCliente", clientesController.eliminarCliente);

  router.post(
    "/productos",
    productosController.subirArchivo,
    productosController.nuevoProducto
  );

  router.get("/productos", productosController.mostrarProductos);
  router.get("/productos/:idProducto", productosController.mostrarProducto);
  router.put(
    "/productos/:idProducto",
    productosController.subirArchivo,
    productosController.actualizarProducto
  );

  router.delete("/productos/:idProducto", productosController.eliminarProducto);

  router.post("/pedidos", pedidosController.nuevoPedido);

  router.get("/pedidos", pedidosController.mostrarPedidos);
  router.get("/pedidos/:idPedido", pedidosController.mostrarPedido);

  router.put("/pedidos/:idPedido", pedidosController.actualizarPedido);
  router.delete("/pedidos/:idPedido", pedidosController.eliminarPedido);

  return router;
};
