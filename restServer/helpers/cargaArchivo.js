
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const subirArchivo = (
  files,
  extensionesValidas = ["jpg", "png"],
  carpeta = ""
) => {
  return new Promise((resolve, reject) => {
    //Validacion
    console.log(files)
    const { archivo } = files;
    const nombreCorto = archivo.name.split(".");
    const extension = nombreCorto[nombreCorto.length - 1];

    if (!extensionesValidas.includes(extension)) {
      return reject(
        `Extension no valida,por favor incluya una de la siguiente lista ${extensionesValidas}`
      );
    }

    //Cambio de nombre
    const nombreFinal = uuidv4() + "." + extension;

    const directorioCargaArchivo = path.join(
      __dirname,
      `../uploads/`,
      carpeta,
      nombreFinal
    );
    
    

    archivo.mv(directorioCargaArchivo, (err) => {
      if (err) {
        reject(err);
      }
     
      resolve(nombreFinal)
    });
  });
};

module.exports = { subirArchivo };
