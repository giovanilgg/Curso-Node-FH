const Producto = require("../models/productos.js");
const Role = require("../models/role.js");
const Usuario = require("../models/usuario.js");
const { response, request } = require("express");
const esRoleValido = async (rol = "") => {
  const existeRole = await Role.findOne({ rol });
  console.log(existeRole);
  if (!existeRole) {
    throw new Error("El rol no esta registrado en la bd");
  }
};
//verificar si el email existe

const emailExiste = async (correo = "") => {
  const existeCorreo = await Usuario.findOne({ correo });
  if (existeCorreo) {
    throw new Error("El correo ya esta registrado en la  bd");
  }
};
const existeUsuarioId = async (id = "") => {
  const existeUsuario = await Usuario.findById(id);
  if (!existeUsuario) {
    throw new Error(`no existe un usuario con este id:${id}`);
  }
};
//categorias
const existeCategoriaId = async (id = "") => {
  const existeCategoria = await Categoria.findById(id);
  if (!existeCategoria) {
    throw new Error(`no existe un usuario con este id:${id}`);
  }
};
//productos
const existeProductoId = async (id = "") => {
  const existeProducto = await Producto.findById(id);
  if (!existeProducto) {
    throw new Error(`no existe un producto con este id:${id}`);
  }
};

module.exports = {
  esRoleValido,
  emailExiste,
  existeUsuarioId,
  existeCategoriaId,
  existeProductoId,
};
