const express = require("express");
const cors = require("cors");
const path = require("path");
const { dbConnection } = require("../database/config.db");
const fileUpload = require("express-fileupload");
const { engine } = require("express-handlebars");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.usuariosPath = "/api/usuarios";
    this.authPath = "/api/auth";
    this.categoriasPath = "/api/categorias";
    this.productosPath = "/api/productos";
    this.busquedaPath = "/api/busqueda";
    this.uploadsPath = "/api/uploads";
    this.stripePath = "/api/pago";
    this.configuracionVista();
    this.conexionDb();
    this.middlewares();
    this.routes();
  }
  async conexionDb() {
    await dbConnection();
  }
  middlewares() {
    //Cors
    this.app.use(cors());
    //Lectura y parseo del body
    this.app.use(express.json());
    //Servir el contenido estatico
    this.app.use(express.static("public"));
    //Carga de archivos
    this.app.use(
      fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp/",
        createParentPath: true,
      })
    );
    //Analizador de formulario
    this.app.use(express.urlencoded({ extended: false }));
  }
  routes() {
    this.app.use(this.usuariosPath, require("../routes/user.routes"));
    this.app.use(this.authPath, require("../routes/auth.routes"));
    this.app.use(this.categoriasPath, require("../routes/categorias.routes"));
    this.app.use(this.productosPath, require("../routes/productos.routes"));
    this.app.use(this.busquedaPath, require("../routes/busqueda.routes"));
    this.app.use(this.uploadsPath, require("../routes/uploads.routes"));
    this.app.use(this.stripePath , require("../routes/stripe.routes"));
  }
  configuracionVista() {
    this.app.set("views", path.join(__dirname, "../views"));

    //Asignacion directorios views
    this.app.engine(
      ".hbs",
      engine({
        defaultLayout: "main",
        layoutsDir: path.join(this.app.get("views"), "Layout"),
        partialsDir: path.join(this.app.get("views"), "Partials"),
        extname: ".hbs",
      })
    );
    this.app.set('view engine', '.hbs');
  }
  listen() {
    this.app.listen(this.port, () => {
      console.log(`Api corriendo en el puerto ${this.port}`);
    });
  }
}

module.exports = Server;
