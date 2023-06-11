const { response, request } = require("express");

/*
Obtener categorias,paginado,total y populate
Obtener categoria-populate
Actualizar categorias 
Borrar categoria estado-false




*/
const Categoria = require("../models/categoria");
const obtenerCategorias = async (req = request, res = response) => {
  //Obtener los query params
  const { limit = 5, desde = 0 } = req.query;
  const query = { estado: true };
  const [total, categorias] = await Promise.all([
    Categoria.countDocuments(query),
    Categoria.find({ estado: true })
      .populate("usuario", "nombre")
      .skip(parseInt(desde))
      .limit(parseInt(limit)),
  ]);
  res.status(200).json({
    msj: "peticion get Categorias",
    total,
    categorias,
  });
};

const obtenerCategoria = async (req = request, res = response) => {
  const { id } = req.params;
  const categoria = await Categoria.findById(id).populate("usuario", "nombre");
  return res.send({
    msj: "obteniendo categoria",
    categoria,
  });
};

const agregarCategoria = async (req = request, res = response) => {
  const nombre = req.body.nombre.toUpperCase();
  const existeCategoria = await Categoria.findOne({ nombre });
  if (existeCategoria) {
    return res.status(400).send({
      msj: "La categoria ya existe ",
    });
  }
  //generando la nueva categoria
  const data = {
    nombre,
    usuario: req.usuario._id,
  };
  const categoria = new Categoria(data);
  await categoria.save();

  return res.status(401).send({
    msj: "obteniendo categorias",
    categoria,
  });
};
const actualizarCategoria = async (req = request, res = response) => {
  const { id } = req.params;
  const { estado, usuario, ...data } = req.body;
  data.nombre = data.nombre.toUpperCase();
  const categoriaActualizada = await Categoria.findByIdAndUpdate(
    id,
    data,
    {}
  ).populate("usuario", "nombre");

  return res.send({
    msj: "Actualizando categoria",
    categoriaActualizada,
  });
};
const eliminarCategoria = async (req = request, res = response) => {
  const { id } = req.params;
  const categoriaEliminada = await Categoria.findByIdAndUpdate(id, {
    estado: false,
  });
  return res.send({
    msj: "Se elimino correctamente",
    categoriaEliminada,
  });
};
module.exports = {
  obtenerCategorias,
  obtenerCategoria,
  agregarCategoria,
  actualizarCategoria,
  eliminarCategoria,
};
