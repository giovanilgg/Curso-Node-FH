const { response, request } = require("express");
const Producto = require("../models/productos.js");

const obtenerProductos = async (req = request, res = response) => {
  //Obtener los query params
  const { limit = 5, desde = 0 } = req.query;
  const query = { estado: true };
  const [total, productos] = await Promise.all([
    Producto.countDocuments(query),
    Producto.find({ estado: true })
      .populate("categoria", "nombre")
      .populate("usuario", "nombre")
      .skip(parseInt(desde))
      .limit(parseInt(limit)),
  ]);
  res.status(200).json({
    msj: "peticion get Productos",
    total,
    productos,
  });
};

const obtenerProducto = async (req = request, res = response) => {
  const { id } = req.params;
  const producto = await Producto.findById(id)
    .populate("usuario", "nombre")
    .populate("categoria", "nombre");
  return res.send({
    msj: "obteniendo categoria",
    producto,
  });
};

const agregarProducto = async (req = request, res = response) => {
  const { nombre, precio, descripcion, disponible, categoria } = req.body;
  const existeProducto = await Producto.findOne({ nombre });
  if (existeProducto) {
    return res.status(400).send({
      msj: "El producto ya existe ",
    });
  }
  //generando la nueva categoria
  const data = {
    nombre,
    precio,
    usuario: req.usuario._id,
    descripcion,
    disponible,
    categoria,
  };
  const producto = new Producto(data);
  await producto.save();

  return res.status(401).send({
    msj: "producto guardado correctamente",
    producto,
  });
};

const actualizarProducto = async (req = request, res = response) => {
  const { id } = req.params;
  const { estado, usuario, ...data } = req.body;
  const productoActualizado = await Producto.findByIdAndUpdate(id, data)
    .populate("usuario", "nombre")
    .populate("categoria", "nombre");

  return res.send({
    msj: "Actualizando categoria",
    productoActualizado,
  });
};
const eliminarProducto = async (req = request, res = response) => {
  const { id } = req.params;
  const productoEliminado = await Producto.findByIdAndUpdate(id, {
    estado: false,
  });
  return res.send({
    msj: "Se elimino correctamente",
    productoEliminado,
  });
};
module.exports = {
  obtenerProductos,
  obtenerProducto,
  agregarProducto,
  actualizarProducto,
  eliminarProducto,
};
