"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const conexion_1 = __importDefault(require("../db/conexion"));
const sequelize_1 = require("sequelize");
const Usuario = conexion_1.default.define("usuarios", {
    nombre: {
        type: sequelize_1.DataTypes.STRING,
    },
    contraseña: {
        type: sequelize_1.DataTypes.STRING,
    },
    estado: {
        type: sequelize_1.DataTypes.STRING,
    },
}, {
    freezeTableName: true,
    timestamps: false
});
exports.default = Usuario;
//# sourceMappingURL=usuario.model.js.map