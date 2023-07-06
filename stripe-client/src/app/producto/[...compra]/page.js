"use client";
import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { PaymentElement } from "@stripe/react-stripe-js";
const stripePromise = loadStripe('pk_live_51NB1ucBlkBr3oyGNOWBoTpZVqY4PyNejObr6wV8UiFODjoHYWEdMQdj0F4dT0NDbDHPxPjR23KLKVYJiW1oxU1z200m39QOZAB');

const Compra = ({ params }) => {
  const [titulo, clientSecret] = params.compra;
  console.log(clientSecret);
  const options = {
    // passing the client secret obtained from the server
    clientSecret,
  };

  console.log("asas", params.compra);
  return (
    <div>
      <h1>{titulo}</h1>
      <Elements stripe={stripePromise} options={options}>
        <form>
          <PaymentElement />
          <button>Submit</button>
        </form>
      </Elements>
    </div>
  );
};

export default Compra;
