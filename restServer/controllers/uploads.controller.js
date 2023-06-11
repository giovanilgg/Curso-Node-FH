const { requets, response } = require("express");
const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const { subirArchivo } = require("../helpers/cargaArchivo");
//modelos
const Usuario = require("../models/usuario.js");
const Producto = require("../models/productos");
//cloudinary
const cloudinary = require("cloudinary").v2;
cloudinary.config(process.env.CLOUDINARY_URL);
const cargaArchivos = (req = requets, res = response) => {
  //cargar archivo
  subirArchivo(req.files, ["jpg", "png", "svg", "webpg", "txt", "md"], "texto")
    .then((result) => {
      res.status(200).json({
        msj: result,
      });
    })
    .catch((e) => {
      res.status(400).json({
        msj: e,
      });
    });
};

/*
const actualizarArchivo = async (req = requets, res = response) => {
  let modelo;
  const { coleccion, id } = req.params;

  switch (coleccion) {
    case "usuarios":
      modelo = await Usuario.findById(id);
      if (!modelo) {
        return res.status(400).json({
          msj: "no se encontro un usuario con ese id ",
        });
      }
      break;
    case "productos":
      modelo = await Producto.findById(id);
      if (!modelo) {
        return res.status(400).json({
          msj: "no se encontro un producto con ese id ",
        });
      }
      break;

    default:
      return res.status(500).json({
        msj: "Se sigue trabajandando con las demas coleciones :)",
      });
  }

  const nombreArchivo = await subirArchivo(
    req.files,
    ["jpg", "png", "svg", "webpg", "txt", "md"],
    coleccion
  );

  //limpiar imagenes del servidor
  if (modelo.img) {
    const pathImagen = path.join(
      __dirname,
      "../uploads",
      coleccion,
      modelo.img
    );
    if (fs.existsSync(pathImagen)) {
      fs.unlinkSync(pathImagen);
    }
    console.log(pathImagen);
  }

  modelo.img = nombreArchivo;
  await modelo.save();

  return res.status(201).json({
    coleccion,
    id,
    modelo,
  });
};*/

//actualizar imagen de cloudinary

const actualizarArchivoCloud = async (req = requets, res = response) => {
  let modelo;
  const { coleccion, id } = req.params;

  switch (coleccion) {
    case "usuarios":
      modelo = await Usuario.findById(id);
      if (!modelo) {
        return res.status(400).json({
          msj: "no se encontro un usuario con ese id ",
        });
      }
      break;
    case "productos":
      modelo = await Producto.findById(id);
      if (!modelo) {
        return res.status(400).json({
          msj: "no se encontro un producto con ese id ",
        });
      }
      break;

    default:
      return res.status(500).json({
        msj: "Se sigue trabajandando con las demas coleciones :)",
      });
  }
  const {tempFilePath}=req.files.archivo
  const {secure_url}= await cloudinary.uploader.upload(tempFilePath);

  //limpiar imagenes del servidor
  if (modelo.img) {
    const arrNom= modelo.img.split("/")
    const nombreArchivo= arrNom[arrNom.length-1]
    const [public_id]=nombreArchivo.split(".")
     cloudinary.uploader.destroy(public_id)

  }
  
  modelo.img = secure_url;
  await modelo.save();
  

  return res.status(201).json({
    msj:"se actualizo correctamente la imagen ",
    user:modelo
  });
};

const obtenerImagen = async (req = requets, res = response) => {
  let modelo;
  const { coleccion, id } = req.params;

  switch (coleccion) {
    case "usuarios":
      modelo = await Usuario.findById(id);
      if (!modelo) {
        return res.status(400).json({
          msj: "no se encontro un usuario con ese id ",
        });
      }
      break;
    case "productos":
      modelo = await Producto.findById(id);
      if (!modelo) {
        return res.status(400).json({
          msj: "no se encontro un producto con ese id ",
        });
      }
      break;

    default:
      return res.status(500).json({
        msj: "Se sigue trabajandando con las demas coleciones :)",
      });
  }

  //limpiar imagenes del servidor
  if (modelo.img) {
    const pathImagen = path.join(
      __dirname,
      "../uploads",
      coleccion,
      modelo.img
    );
    if (fs.existsSync(pathImagen)) {
      return res.sendFile(pathImagen);
    }
  }
  //Cargar imagen por defecto en caso de que no exista la img
  if (!modelo.img || modelo.img === "") {
    const pathImagenDefecto = path.join(__dirname, "../assets/no-image.jpg");
    return res.sendFile(pathImagenDefecto);
  }
};

module.exports = {
  cargaArchivos,
  actualizarArchivoCloud,
  obtenerImagen,

};
