const { requets, response } = require("express");

const validaRol = (req = requets, res = response, next) => {
  const { usuario } = req;
  if (!usuario) {
    return res.status(500).send({
      msj: "Se quiere verificar el rol sin validar el token primero",
    });
  }
  const { role, nombre } = req.usuario;
  console.log(role);
  if (role != "ADMIN_ROLE") {
    return res.status(401).send({
      msj: "Erro el usuario no tiene privilegios de administrador",
    });
  }

  next();
};
const tieneRol = (...roles) => {
  return (req, res, next) => {
    const { usuario } = req;
    if (!usuario) {
      return res.status(500).send({
        msj: "Se quiere verificar el rol sin validar el token primero",
      });
    }
    if (!roles.includes(req.usuario.role)) {
      return res.status(401).send({
        msj: `El servicio requiere uno de estos roles:${roles}`,
      });
    }
    next();
  };
};
module.exports = {
  validaRol,
  tieneRol,
};
