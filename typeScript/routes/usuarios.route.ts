import { Router } from "express";
import { deleteUsuario, getUsuario, getUsuarios, postUsuario, putUsuario } from "../controller/usuarios.controller";

const route= Router()

route.get("/:id",getUsuario);
route.get("/",getUsuarios);
route.post("/",postUsuario);
route.put("/:id",putUsuario);
route.delete("/:id",deleteUsuario)
export default route
