const { response, request } = require("express");
const Usuario = require("../models/usuario.js");
const bcrypt = require("bcryptjs");
const { emailExiste } = require("../helpers/dbValidacion.js");

const usuariosGet = async (req = request, res = response) => {
  //Obtener los query params
  const { limit = 5, desde = 0 } = req.query;
  if (isNaN(limit)) {
    console.log("bno es un numero");
  }

  const [total, usuarios] = await Promise.all([
    Usuario.countDocuments({ estado: true }),
    Usuario.find({ estado: true }).skip(parseInt(desde)).limit(parseInt(limit)),
  ]);
  res.status(200).json({
    msj: "peticion get",
    total,
    usuarios,
  });
};
const usuariosPost = async (req, res = response) => {
  const { nombre, correo, password, role } = req.body;
  const usuario = new Usuario({ nombre, correo, password, role });
  //encriptando la contraseña
  const salt = bcrypt.genSaltSync();
  usuario.password = bcrypt.hashSync(password, salt);

  await usuario.save();
  res.status(403).json({
    msj: "peticion post",
  });
};
const usuariosPut = async (req, res = response) => {
  const { id } = req.params;
  const { _id, password, google, correo, ...resto } = req.body;
  //encriptando la contraseña
  if (password) {
    const salt = bcrypt.genSaltSync();
    resto.password = bcrypt.hashSync(password, salt);
  }
  const usuario = await Usuario.findByIdAndUpdate(id, resto);

  res.status(403).json({
    msj: "peticion put",
    ID: id,
    resto,
  });
};
const usuariosDelete = async (req, res = response) => {
  const { id } = req.params;
  const { usuario } = req;
  const usuarioAutenticado = usuario;
  //borrar

  //const usuario=await Usuario.findByIdAndDelete(id)
  /*borrar y conservar el objeto,conservar integridad referencial*/
  await Usuario.findByIdAndUpdate(id, { estado: false });
  res.status(200).json({
    msj: "peticion delete",
    id,
    usuarioAutenticado,
  });
};
module.exports = {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosDelete,
};
