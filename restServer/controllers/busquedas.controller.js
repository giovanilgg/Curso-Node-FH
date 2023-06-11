const { requets, response, json } = require("express");
const { isValidObjectId } = require("mongoose");
const Usuario = require("../models/usuario.js");
const Categoria = require("../models/categoria.js");
const Producto = require("../models/productos.js");
//colecciones permitidas

const coleccionesPermitidas = ["categorias", "productos", "roles", "usuarios"];
//buscar Usuarios
const buscarUsuarios = async (termino, res = response) => {
  const esUnIdValido = isValidObjectId(termino);

  if (esUnIdValido) {
    const usuario = await Usuario.findById(termino);
    res.json({
      results: usuario ? [usuario] : [],
    });
  }

  const regex = new RegExp(termino, "i");
  console.log(regex);
  const usuarios = await Usuario.find({
    $or: [{ nombre: regex }, { correo: regex }],
    $and: [{ estado: true }],
  });

  res.json({
    results: usuarios,
  });
};
//buscar Categorias
const buscarCategorias = async (termino, res = response) => {
  const esUnIdValido = isValidObjectId(termino);

  if (esUnIdValido) {
    const categoria = await Categoria.findById(termino);
    res.json({
      results: categoria ? [categoria] : [],
    });
  }

  const regex = new RegExp(termino, "i");

  const categorias = await Categoria.find({ nombre: regex });

  res.json({
    results: categorias,
  });
};

//buscar Usuarios
const buscarProductos = async (termino, res = response) => {
  const esUnIdValido = isValidObjectId(termino);

  if (esUnIdValido) {
    const usuario = await Usuario.findById(termino);
    res.json({
      results: usuario ? [usuario] : [],
    });
  }

  const regex = new RegExp(termino, "i");
  console.log(regex);
  const usuarios = await Usuario.find({
    $or: [{ nombre: regex }, { correo: regex }],
    $and: [{ estado: true }],
  });

  res.json({
    results: usuarios,
  });
};

const busqueda = (req = requets, res = response) => {
  const { coleccion, termino } = req.params;

  if (!coleccionesPermitidas.includes(coleccion)) {
    return res.status(400).json({
      msj: `Esa no es una coleccion permitida ,prueba con alguna de estas ${coleccionesPermitidas}`,
    });
  }
  switch (coleccion) {
    case "categorias":
      buscarCategorias(termino, res);
      break;
    case "productos":
     buscarProductos(termino, res);
      break;
    case "usuarios":
     buscarUsuarios(termino, res);
      break;
    default:
      res.status(500).json({
        msj: "Aun sigo trabajando con esta seccion",
      });
  }
};

module.exports = {
  busqueda,
};
