"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const usuarios_route_1 = __importDefault(require("../routes/usuarios.route"));
const cors_1 = __importDefault(require("cors"));
const conexion_1 = __importDefault(require("../db/conexion"));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || "7000";
        this.pathUsuario = "/usuario";
        this.conexiondb();
        this.midlewares();
        this.rutas();
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`El servidor esta corriendo en el puerto:${this.port}`);
        });
    }
    rutas() {
        this.app.use(express_1.default.json());
        this.app.use(this.pathUsuario, usuarios_route_1.default);
        this.app.use(express_1.default.static("public"));
    }
    midlewares() {
        this.app.use((0, cors_1.default)());
    }
    conexiondb() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield conexion_1.default.authenticate();
                console.log("Se conecto a la base de datos");
            }
            catch (error) {
                throw new Error();
            }
        });
    }
}
exports.default = Server;
//# sourceMappingURL=model.server.js.map