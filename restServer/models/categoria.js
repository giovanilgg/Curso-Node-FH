const { model, Schema } = require("mongoose");

const CategoriaSchema = new Schema({
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
});
//presentation of information
CategoriaSchema.methods.toJSON = function () {
  const { __v, estado, ...categoria } = this.toObject();

  return categoria;
};
module.exports = model("Categoria", CategoriaSchema);
