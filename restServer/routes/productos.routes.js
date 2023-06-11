const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const { validarJWT, validarCampos, validaRol } = require("../middlewares");
const { existeProductoId } = require("../helpers/dbValidacion");
const {
  obtenerProducto,
  agregarProducto,
  actualizarProducto,
  eliminarProducto,
  obtenerProductos,
} = require("../controllers/productos.controller");

//Obtener todas las categorias
router.get("/", obtenerProductos);
//Obtener solo una categoria
router.get(
  "/:id",
  [
    check("id", "No es un id  valido").isMongoId(),
    check("id").custom(existeProductoId),
    validarCampos,
  ],
  obtenerProducto
);
//Registrar una categoria-privado u  token valido
router.post(
  "/",
  [
    validarJWT,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  agregarProducto
);
//Actualizar una categoria-privado u  token valido
router.put(
  "/:id",
  [
    validarJWT,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("id", "No es un id  valido").isMongoId(),
    check("id").custom(existeProductoId),
    validarCampos,
  ],
  actualizarProducto
);
//Borrar una categoria-privado u  token valido solo admin
router.delete("/:id", [validarJWT, validaRol, validarCampos], eliminarProducto);

module.exports = router;
