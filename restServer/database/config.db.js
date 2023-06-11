const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    //objeto de configuracion
    await mongoose.connect(process.env.MONGODB);
    console.log("se conecto");
  } catch (error) {
    console.log(error);
    throw new Error("Error al iniciar la base de datos");
  }
};
module.exports = {
  dbConnection,
};
