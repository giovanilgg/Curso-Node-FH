const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const {
  obtenerCategorias,
  agregarCategoria,
  obtenerCategoria,
  actualizarCategoria,
  eliminarCategoria,
} = require("../controllers/categorias.controller");
const { validarJWT, validarCampos, validaRol } = require("../middlewares");
const { existeCategoriaId } = require("../helpers/dbValidacion");

//Obtener todas las categorias
router.get("/", obtenerCategorias);
//Obtener solo una categoria
router.get(
  "/:id",
  [
    check("id", "No es un id  valido").isMongoId(),
    check("id").custom(existeCategoriaId),
    validarCampos,
  ],
  obtenerCategoria
);
//Registrar una categoria-privado u  token valido
router.post(
  "/",
  [
    validarJWT,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  agregarCategoria
);
//Actualizar una categoria-privado u  token valido
router.put(
  "/:id",
  [
    validarJWT,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("id", "No es un id  valido").isMongoId(),
    check("id").custom(existeCategoriaId),
    validarCampos,
  ],
  actualizarCategoria
);
//Borrar una categoria-privado u  token valido solo admin
router.delete(
  "/:id",
  [validarJWT, validaRol, validarCampos],
  eliminarCategoria
);

module.exports = router;
