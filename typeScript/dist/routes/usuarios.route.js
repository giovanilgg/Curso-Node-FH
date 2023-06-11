"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuarios_controller_1 = require("../controller/usuarios.controller");
const route = (0, express_1.Router)();
route.get("/:id", usuarios_controller_1.getUsuario);
route.get("/", usuarios_controller_1.getUsuarios);
route.post("/", usuarios_controller_1.postUsuario);
route.put("/:id", usuarios_controller_1.putUsuario);
route.delete("/:id", usuarios_controller_1.deleteUsuario);
exports.default = route;
//# sourceMappingURL=usuarios.route.js.map