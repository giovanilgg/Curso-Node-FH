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
exports.deleteUsuario = exports.putUsuario = exports.postUsuario = exports.getUsuario = exports.getUsuarios = void 0;
const usuario_model_1 = __importDefault(require("../models/usuario.model"));
const getUsuarios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const usuarios = yield usuario_model_1.default.findAll();
    res.status(200).json({
        msj: "get usuarios",
        usuarios,
    });
});
exports.getUsuarios = getUsuarios;
const getUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const usuario = yield usuario_model_1.default.findAll({
        where: {
            id,
            estado: "true",
        },
    });
    if (!usuario) {
        return res.status(500).json({
            msj: "El usuario co el id no existe",
        });
    }
    res.status(200).json({
        msj: "get usuario",
        usuario,
    });
});
exports.getUsuario = getUsuario;
const postUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    //Combinacion de built y save
    try {
        const usuario = yield usuario_model_1.default.create(body);
        res.status(200).json({
            msj: "post usuarios",
            usuario,
        });
    }
    catch (error) {
        res.status(500).json({
            msj: 'no se pudo registrar en la base de datos',
            error
        });
    }
});
exports.postUsuario = postUsuario;
const putUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { id } = req.params;
    try {
        //verificar si existe el usuario
        const usuario = yield usuario_model_1.default.findByPk(id);
        if (!usuario) {
            return res.status(404).json({
                msj: "El usuario no se encontro"
            });
        }
        const nuevoUsuario = yield usuario.update(body);
        res.status(200).json({
            msj: "put usuarios",
            nuevoUsuario
        });
    }
    catch (error) {
        res.status(500).json({
            msj: 'no se pudo registrar en la base de datos',
            error
        });
    }
});
exports.putUsuario = putUsuario;
const deleteUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        //verificar si existe el usuario
        const usuario = yield usuario_model_1.default.findByPk(id);
        if (!usuario) {
            return res.status(404).json({
                msj: "El usuario no se encontro"
            });
        }
        //borrado fisico
        yield usuario.destroy();
        //borrado logico
        //await usuario.update({estado:"false"})
        res.status(200).json({
            msj: "delete usuario",
            usuario,
        });
    }
    catch (error) {
        res.status(500).json({
            msj: 'no se pudo borrar en la base de datos',
            error
        });
    }
});
exports.deleteUsuario = deleteUsuario;
//# sourceMappingURL=usuarios.controller.js.map