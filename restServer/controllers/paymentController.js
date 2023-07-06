const express = require("express");
const { response, request } = require("express");

const stripe = require("stripe")(process.env.PRIVATE_STRIPE_KEY);

const loginPayment = async (req = request, res = response) => {
  const {email} = req.body;
  //Creacion de nuestro cliente
  try {
    console.log(email)
    const cliente = await stripe.customers.create({
      email,
    });
    if (!cliente) {
      return res.status(500).json({
        msj: "No se pudo crear el cliente",
      });
    }
    res.status(200).json({
      msj: "Todo okey,ingresando",
      costumer:cliente
    });
  } catch (error) {
    console.log("este es el error", error);
  }
};

const paymentSubscription = async (req = request, res = response) => {
  const { tipo } = req.params;

  const clienteid = req.body.customer_id;

  if (!clienteid) {
    res.status(400).json({
      msj: "No hay un clienteid asociado al pago o suscripcion por favor ingrese uno.",
    });
  }

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
        info: paymentIntent.client_secret,
      });

      break;
    case "suscripcion":
      //crear producto en dashboard de stripe
      const idMembresia = "price_1NBpn7BlkBr3oyGNPpysjfLM";
      //Crear suscripcion e ingresar cliente,arreglo de precios
      //expand obtener clientSecret

      const suscripcion = await stripe.subscriptions.create({
        customer: clienteid,
        items: [
          {
            price: idMembresia,
          },
        ],
        payment_behavior: "default_incomplete",
        expand: ["latest_invoice.payment_intent"],
      });
      if (!suscripcion || !suscripcion.latest_invoice) {
        console.log(suscripcion);
        return res.status(500).json({
          msj: "No se pudo concretar el intento de pago hacia la membresia",
        });
      }
      return res.status(201).json({
        msj: "ok",
        data: suscripcion.latest_invoice.payment_intent.client_secret,
      });

      break;
    default:
      return res.status(400).json({
        msj: "No se puede procesar esa solicitud de pago",
      });

      break;
  }
};

const paymentComplete = async (req = request, res = response) => {
  const STRIPE_WEBHOOK_KEY = process.env.FIRMA_WEBH;
  let evento;
  try {
    evento = stripe.webhooks.constructEvent(
      req.body, //Body en formato plano
      req.header("Stripe-Signature"), //Lectura de stripe
      STRIPE_WEBHOOK_KEY //key
    );
    //Escuchar por los eventos de la suscripcion y del pago del curso
    const data = evento.data.object;
    switch (evento.type) {
      case "invoice_payment.succeeded":
        if (data["invoice"] == "subscription_create") {
          const subscriptionId = data["subscription"];
          const paymentIntentId = data["payment_intent"];
          const paymentIntent = await stripe.paymentIntents.retrieve(
            paymentIntentId
          );

          try {
            const subscription = await stripe.subscriptions.update(
              subscriptionId,
              {
                default_payment_method: paymentIntent.payment_method,
              }
            );
            res.status(200).json({
              msj: "subscription complete",
            });
          } catch (error) {
            res.status(405).json({
              msj: error,
            });
          }
        }
        break;
      case "payment_intent.succeeded":
        //generar el producto el la base de datos y base a una consulta devolver el contenido
        res.status(200).json({
          msj: "Acceso al curso completo",
        });
        break;
      default:
        break;
    }
  } catch (e) {
    res.status(405).json({
      error: e.message,
    });
  }

  console.log(data);
  res.json({
    msj: "pago completo",
  });
};
module.exports = {
  loginPayment,
  paymentSubscription,
  paymentComplete,
};
