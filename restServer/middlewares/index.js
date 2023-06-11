const validarCampos = require("../middlewares/validacionCampos");
const validarJWT = require("../middlewares/validarJWT.js");
const validaRoles = require("../middlewares/validarRol.js");
const validaArchivo = require("../middlewares/validarArchivo.js");

module.exports = {
  ...validaRoles,
  ...validarJWT,
  ...validarCampos,
  ...validaArchivo

};
