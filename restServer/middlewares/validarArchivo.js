const { requets, response } = require("express");

const validarArchivo = (req = requets, res = response, next) => {

    
  if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
    return res.status(400).json({
      msj: "No hay archivos en la peticion",
    });
  }
  next();
};

module.exports={validarArchivo}