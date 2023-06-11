const express = require("express");
const router = express.Router();
const { busqueda } = require("../controllers/busquedas.controller");

router.get("/:coleccion/:termino", busqueda);

module.exports = router;
