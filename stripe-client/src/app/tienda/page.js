"use client";
import React from "react";
import Encabezado from "../layout/Encabezado";
import "../styles/tienda.css";
import { crearOrden } from "../services/consultaApi";
import { useRouter } from "next/navigation";
const Tienda = () => {
  const router = useRouter()
  const ordenCompra = async (tipo) => {
    try {
      const data = await crearOrden(tipo);
      setTimeout(() => {
            router.push(`/producto/${tipo}/${data.data.info}`)
      }, 1000);
  
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Encabezado>
      <h1 className="titulo">Tienda</h1>
      <div className="producto">
        <p>Curso de Estructuras de datos y algortimos</p>
        <button onClick={() => ordenCompra("curso")} className="btn">
          Comprar
        </button>
      </div>

      <div className="producto">
        <p>Producto de edicion genially.Subscripcion por solo 200 MX</p>
        <button onClick={() => ordenCompra("suscripcion")} className="btn">
          Suscribirse
        </button>
      </div>
    </Encabezado>
  );
};

export default Tienda;
