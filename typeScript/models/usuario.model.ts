import db from "../db/conexion";

import {  DataTypes } from "sequelize";

const Usuario = db.define("usuarios", {
  nombre: {
    type: DataTypes.STRING,
  },
  contraseña: {
    type: DataTypes.STRING,
  },
  estado: {
    type: DataTypes.STRING,
  },
}, { 
    freezeTableName: true,
    timestamps: false
});
 
export default Usuario