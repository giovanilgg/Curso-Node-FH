"use client";
import Encabezado from "./layout/Encabezado";
import './styles/formulario.css'
import { loginUsuario } from "./services/consultaApi";
import { useState } from "react";
import { useRouter } from 'next/navigation'
export default function Home() {
   const router = useRouter()
  const [email,setEmail]=useState('')
  const ingresarCuenta = async(e) => {
   
   

    e.preventDefault()
    if(email===""){
      alert('Por favor digite un correo')
      return
    }
    //Llamando a la api
    try {
       const respuesta= await loginUsuario({email})
       if(respuesta){
        alert('igresando')
       }
       localStorage.setItem('stripe_payment',JSON.stringify({
        costumer:respuesta.data.costumer.id
       }))
       setTimeout(() => {
        router.push('/tienda')
       }, 1000);
     
    } catch (error) {
      alert('error')
    }


  };
  return (
    <main>
      <Encabezado>
        <form className="formulario">
          <label>Correo</label>
          <input onChange={(value)=>{setEmail(value.target.value)}} value={email} type="text" placeholder="Introduce un correo por favor" />
          <button onClick={(e) => ingresarCuenta(e)}>Ingresar</button>
        </form>
      </Encabezado>
    </main>
  );
}
