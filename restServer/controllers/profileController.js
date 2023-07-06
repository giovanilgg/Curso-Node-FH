const { request, response } = require("express");
const stripe = require("stripe")(process.env.PRIVATE_STRIPE_KEY);
const getSubscriptions = async (req = request, res = response) => {
  const costumerId = req.params.costumer_id;
  const suscripciones = await stripe.subscriptions.list({
    costumer: costumerId,
    status: "active",
    expand: ["data.default_payment_method"],
  });

  if (suscripciones && suscripciones.data.length) {
    return res.status(200).json({
      msj: "ok",
      suscripciones: suscripciones.data,
    });
  }
  res.json({
    msj: "no hay",
  });
};
const getCursos = async (req = request, res = response) => {
  //acceder a la base de datos para retornar el prodcuto,filtrar
  const costumerId = req.params.costumer_id;
 
  res.json({
    msj: "ahi esta el curso",
  });
};
module.exports = {
  getSubscriptions,
  getCursos,
};
