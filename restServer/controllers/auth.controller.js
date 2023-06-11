const { response, request } = require("express");
const Usuario = require("../models/usuario");
const bcrypt = require("bcryptjs");
const { generarJWT } = require("../helpers/generarToken");
const { googleVerify } = require("../helpers/google-verify");

const inicioSesion = async (req, res = response) => {
  const { correo, password } = req.body;

  try {
    //verificar si el email existe
    const usuario = await Usuario.findOne({ correo });
    if (!usuario) {
      return res.status(400).send({
        msg: "El usuario o la contraseña no son validos-usuario",
      });
    }
    //Si el usuario esta activo
    if (!usuario.estado) {
      return res.status(400).send({
        msg: "El usuario o la contraseña no son validos-status",
      });
    }
    //Verificar la contraseña
    const validaContraseña = bcrypt.compareSync(password, usuario.password);
    if (!validaContraseña) {
      return res.status(400).send({
        msg: "El usuario o la contraseña no son validos-contraseña",
      });
    }

    //Generar el JWT
    const token = await generarJWT(usuario.id);

    res.send({
      msg: "autenticado ",
      token: token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      msg: "Hable con el administrador",
      er: error,
    });
  }
};
const loginGoogle = async (req = request, res = response) => {
  const { id_token } = req.body;

  try {
    //verificar si el correo ya esta registrado
    const { nombre, img, correo } = await googleVerify(id_token);
    let usuario = await Usuario.findOne({ correo });
    if (!usuario) {
      const data = {
        nombre,
        img,
        correo,
        password: ":)",
        google: true,
        role: "ADMIN_USER",
      };
      usuario = new Usuario(data);
      console.log(usuario);
      await usuario.save();
    }
    console.log(usuario);
    //validar que el usuario en bd este activo
    if (!usuario.estado) {
      return res.status(401).send({
        msg: "El usuario no esta activ,verifique con el administrador",
      });
    }
    //generando el jwt
    const token = await generarJWT(usuario.id);

    res.json({
      msg: "todo okay",
      token,
      usuario,
    });
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  inicioSesion,
  loginGoogle,
};
