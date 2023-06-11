const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const { inicioSesion, loginGoogle } = require("../controllers/auth.controller");

router.post(
  "/login",
  [
    check("correo", "El correo es obligatorio").isEmail(),
    check("contraseña", "La contraseña es obligatoria").not().isEmpty(),
  ],
  inicioSesion
);
//google
router.post(
  "/google",
  [check("id_token", "El id_token de google es obligatorio").not().isEmpty()],
  loginGoogle
);
module.exports = router;
