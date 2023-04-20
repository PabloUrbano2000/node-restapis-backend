const express = require("express");
const router = express.Router();
const clientesController = require("../controllers/clienteController");
const productosController = require("../controllers/productoController");
const pedidosController = require("../controllers/pedidoController");
const usuariosController = require("../controllers/usuarioController");
const auth = require("../middlewares/auth");

module.exports = function () {
  router.post("/clientes", auth, clientesController.nuevoCliente);

  router.get("/clientes", auth, clientesController.mostrarClientes);

  router.get("/clientes/:idCliente", auth, clientesController.mostrarCliente);

  router.put(
    "/clientes/:idCliente",
    auth,
    clientesController.actualizarCliente
  );

  router.delete(
    "/clientes/:idCliente",
    auth,
    clientesController.eliminarCliente
  );

  router.post(
    "/productos",
    auth,
    productosController.subirArchivo,
    productosController.nuevoProducto
  );

  router.get("/productos", auth, productosController.mostrarProductos);
  router.get(
    "/productos/:idProducto",
    auth,
    productosController.mostrarProducto
  );
  router.put(
    "/productos/:idProducto",
    auth,
    productosController.subirArchivo,
    productosController.actualizarProducto
  );

  router.delete(
    "/productos/:idProducto",
    auth,
    productosController.eliminarProducto
  );

  router.post(
    "/productos/busqueda/:query",
    auth,
    productosController.buscarProducto
  );

  router.post("/pedidos/nuevo/:idUsuario", auth, pedidosController.nuevoPedido);

  router.get("/pedidos", auth, pedidosController.mostrarPedidos);
  router.get("/pedidos/:idPedido", auth, pedidosController.mostrarPedido);

  router.put("/pedidos/:idPedido", auth, pedidosController.actualizarPedido);
  router.delete("/pedidos/:idPedido", auth, pedidosController.eliminarPedido);

  router.post("/crear-cuenta", auth, usuariosController.registrarUsuario);

  router.post("/iniciar-sesion", usuariosController.autenticarUsuario);

  return router;
};
