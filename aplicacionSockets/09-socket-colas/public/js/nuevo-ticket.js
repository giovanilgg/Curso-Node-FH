//referencias a elementos html
const btnNuevoTicket=document.querySelector("#nuevoTicket")
const labelNuevoTicket=document.querySelector(".labelNuevoTicket")

const socket = io();

//funciones
const nuevoTicket=()=>{
  

   socket.emit("siguienteTicket",null,(ticket)=>{
   
   })
}


//eventos
btnNuevoTicket.addEventListener('click',nuevoTicket)

//eventos de socket
socket.on("ultimoTicket",(ticket)=>{
    if(ticket==0){
       labelNuevoTicket.textContent="No hay tickets por el momento"
    }else{
        labelNuevoTicket.textContent=`Ticket:${ticket}`
    }
    
})


//ON y OFF de mi socket
socket.on('connect', () => {
   btnNuevoTicket.disabled=false;
});

socket.on('disconnect', () => {
    btnNuevoTicket.disabled=true;
});
