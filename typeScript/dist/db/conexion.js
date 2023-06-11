"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db = new sequelize_1.Sequelize('usuarios', 'root', '123', {
    host: "localhost",
    dialect: "mariadb"
});
exports.default = db;
//# sourceMappingURL=conexion.js.map