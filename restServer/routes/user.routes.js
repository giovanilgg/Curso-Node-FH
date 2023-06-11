//express
const express = require("express");
const { check } = require("express-validator");
//modelo
const Role = require("../models/role.js");
//router
const router = express.Router();
//controladores
const {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosDelete,
} = require("../controllers/user.controller");
//middlewares
const {
  validaRol,
  tieneRol,
  validarCampos,
  validarJWT,
} = require("../middlewares");
//heplpers
const {
  esRoleValido,
  emailExiste,
  existeUsuarioId,
} = require("../helpers/dbValidacion.js");
//Rutas para usuarios
router.get("/", usuariosGet);

router.post(
  "/",
  [
    check("correo", "El correo no es valido").custom(emailExiste),
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check(
      "password",
      "La contraseña es obligatoria y debe contener al menos 6 elementos"
    ).isLength({ min: 6 }),
    // check('role',"No es un rol valido").isIn(['ADMIN_ROLE','USER_ROLE']),
    check("role").custom(esRoleValido),
    validarCampos,
  ],
  usuariosPost
);

router.put(
  "/:id",
  [
    check("id", "No es un id  valido").isMongoId(),
    check("id").custom(existeUsuarioId),
    validarCampos,
  ],
  usuariosPut
);

router.delete(
  "/:id",
  [
    validarJWT,
    //validaRol en caso de validar un userAdmin
    tieneRol("ADMIN_ROLE", "VENTAS_ROLE"),
    check("id", "No es un id  valido").isMongoId(),
    check("id").custom(existeUsuarioId),
    validarCampos,
  ],
  usuariosDelete
);

module.exports = router;
//check prepara los datos para el request
