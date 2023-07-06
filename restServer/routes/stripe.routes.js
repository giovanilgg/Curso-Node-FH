
const express = require("express");
const { loginPayment, paymentSubscription,paymentComplete } = require("../controllers/paymentController");
const {  getSubscriptions,getCursos}=require("../controllers/profileController");
const router = express.Router();


router.post("/login",loginPayment);
//Pago o suscripccion 
router.post("/accion/:tipo",paymentSubscription);
//Completar pago
router.post("/webhook",express.raw({type: 'application/json'}),paymentComplete)
//Obtener Suscriptciones 
router.get('/users/:costumer_id/subscriptions',getSubscriptions)
//Obtener Cusrsos
router.get('/users/:costumer_id/cursos',getCursos)


module.exports=router;