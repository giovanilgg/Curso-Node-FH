
const express = require("express");
const { loginPayment, paymentSubscription } = require("../controllers/paymentController");
const router = express.Router();


router.post("/login",loginPayment);
//Pago o suscripccion 
router.post("/accion/:tipo",paymentSubscription);







module.exports=router;