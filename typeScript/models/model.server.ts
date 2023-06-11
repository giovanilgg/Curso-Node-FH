import express from "express";
import userRouter from "../routes/usuarios.route";
import cors from "cors";
import  db  from "../db/conexion";

class Server {
  private app: express.Application;
  private port: string;
  private pathUsuario: string;

  constructor() {
    this.app = express();
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
    
    this.app.use(express.json());
    this.app.use(this.pathUsuario, userRouter);
    this.app.use(express.static("public"));
  }
  midlewares() {
    this.app.use(cors());
  }
  async  conexiondb(){
    try {
        await db.authenticate();
        console.log("Se conecto a la base de datos")

        
    } catch (error) {
        throw new Error()
    }

  }
}
export default Server;
