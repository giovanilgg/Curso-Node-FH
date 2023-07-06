import axios from "axios";
//url api
const url = "http://localhost:8080/api/pago";
//objeto de configuracion
const configuracion = {
  method: "Post",
  headers: {
    "Content-Type": "application/json",
  },
};

const loginUsuario = async (body) => {
    console.log(body)
  return  axios.post(`${url}/login`, body,configuracion);
};

const crearOrden=async (tipoProducto)=>{
   const {costumer}=JSON.parse(localStorage.getItem('stripe_payment'))
   return  axios.post(`${url}/accion/${tipoProducto}`,{customer_id:costumer},configuracion);
}

export { loginUsuario,crearOrden};
