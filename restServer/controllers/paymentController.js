const express = require("express");
const { response, request } = require("express");

const stripe = require("stripe")(process.env.PRIVATE_STRIPE_KEY);

const loginPayment = async (req = request, res = response) => {
  const email = req.body;
  //Creacion de nuestro cliente
  const cliente = await stripe.customers.create({
    email,
  });
  if (!cliente) {
    return res.status(500).json({
      msj: "No se pudo crear el cliente",
    });
  }

  res.status(200).json({
    msj: "todo okey",
  });
};

const paymentSubscription = async (req = request, res = response) => {
  const { tipo } = req.params;

  const clienteid = req.body.customer_id;
  console.log(req.body);

  switch (tipo) {
    case "curso":
      //Crear pago con tipo de moneda y monto
      const paymentIntent = await stripe.paymentIntents.create({
        amount: 10 * 100,
        currency: "USD",
        description:
          "Curso de algoritmos,estructura de datos y patrones de diseño",
        customer: clienteid,
      });
      if (!paymentIntent) {
        return res.status(500).json({
          msj: "No se pudo concretar el intento de pago",
        });
      }

      res.status(200).json({
        msj: "Todo OK",
        data: paymentIntent.client_secret,
      });

      break;
    case "suscripcion":
      //crear producto en dashboard de stripe
      const idMembresia = "price_1NBpn7BlkBr3oyGNPpysjfLM";
      //Crear suscripcion e ingresar cliente,arreglo de precios
      //expand obtener clientSecret
      const suscripcion = await stripe.suscriptions.create({
        customer: clienteid,
        items: [
          {
            price: idMembresia,
          },
        ],
        payment_behavior: "default_incomplete",
        expand: ["latest_invoice.payment_intent"],
      });
      if (!suscripcion || suscripcion.latest_invoice) {
        return res.status(500).json({
          msj: "No se pudo concretar el intento de pago hacia la membresia",
        });
      }

      break;
    default:
      res.status(400).json({
        msj: "No se puede procesar esa solicitud de pago",
      });

      break;
  }
};
module.exports = {
  loginPayment,
  paymentSubscription,
};
