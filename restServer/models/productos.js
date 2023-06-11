const { model, Schema } = require("mongoose");

const ProductoSchema = new Schema({
  nombre: {
    type: String,
    required: [true, "El nombre es obligatorio"],
  },
  estado: {
    type: Boolean,
    default: true,
    required: true,
  },
  usuario: {
    type: Schema.Types.ObjectId,
    ref: "Usuarios",
    required: true,
  },
  categoria: {
    type: Schema.Types.ObjectId,
    ref: "Categoria",
    required: true,
  },
  precio: {
    type: Number,
    default: 0,
  },
  descripcion: {
    type: String,
  },
  disponible: {
    type: Boolean,
    required: true,
  },
  img:{
    type:String
  }
});
//presentation of information
ProductoSchema.methods.toJSON = function () {
  const { __v, estado, ...producto } = this.toObject();

  return producto;
};
module.exports = model("Producto", ProductoSchema);
