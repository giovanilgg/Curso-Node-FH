import React from "react";
import Link from "next/link";
//paginas
import Tienda from "../tienda/page";
import Panel from "../panel/page";

import '../styles/header.css'

const Encabezado = ({children}) => {
  return (

    <div>
    <div className="encabezado">
      <Link className="links" href="/tienda" >Tienda</Link>
      <Link className="links" href="/panel">Panel</Link>
    </div>
    {children}</div>
  );
};

export default Encabezado;
