const express = require("express");
const { cargaArchivos, obtenerImagen, actualizarArchivoCloud} = require("../controllers/uploads.controller");
const { validarArchivo, validarCampos } = require("../middlewares");

const router = express.Router();

router.post("/", [validarArchivo,validarCampos] ,cargaArchivos);
//router.put("/:coleccion/:id",[validarArchivo,validarCampos] ,actualizarArchivo);
router.put("/:coleccion/:id",[validarArchivo,validarCampos] ,actualizarArchivoCloud);
router.get("/:coleccion/:id", obtenerImagen);


module.exports = router;
