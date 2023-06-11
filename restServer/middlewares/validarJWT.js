const jwt = require("jsonwebtoken");
const { response, requets } = require("express");
const Usuario = require("../models/usuario");

const validarJWT = async (req = requets, res = response, next) => {
  //leer los headers
  const token = req.header("token_key");
  if (!token) {
    return res.status(401).send({
      msg: "No hay token en la peticion",
    });
  }

  try {
    const { uid } = jwt.verify(token, process.env.SECRETKEY);
    const usuarioExtraido = await Usuario.findOne({ _id: uid });
    //verificar si el usuario existe
    if (!usuarioExtraido) {
      res.status(401).send({
        msj: "El usuario no esta disponible",
      });
    }
    //verificar si el usuario autenticado no es en estado:false
    if (!usuarioExtraido.estado) {
      res.status(401).send({
        msj: "El usuario no esta disponible",
      });
    }

    req.usuario = usuarioExtraido;
    next();
  } catch (error) {
    res.status(401).send({
      msj: "El json web token no es valido",
    });
  }
};
module.exports = {
  validarJWT,
};
