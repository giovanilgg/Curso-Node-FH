const buscarParametro= new URLSearchParams(window.location.search)
//referencias a elementos html
const labelEscritorio=document.querySelector("#labelEscritorio")
const btnSiguienteTicket=document.querySelector("#btnSiguienteTicket")
const ultimoTicket=document.querySelector("#ultimoTicket")
const alertTickets=document.querySelector("#alertTickets")
const lblPendientes= document.querySelector("#lblPendientes")

const socket = io();
//escritorio 
if(!buscarParametro.has("escritorio")){
    window.location='index.html'
    throw new Error("El escritorio de obligatorio")
}

const Escritorio= buscarParametro.get('escritorio')

labelEscritorio.textContent=Escritorio

//funciones
const atenderTicket=()=>{

    socket.emit('atenderTicket',{Escritorio},({ok,ticket,msj})=>{
        if(!ok){
            return alertTickets.style.display=""
        }
        console.log(ok,ticket,msj)
        ultimoTicket.textContent="Ticket: "+ ticket.ultimo
   
    })
}

//eventos
btnSiguienteTicket.addEventListener('click',atenderTicket)

//eventos de socket
socket.on("ticketsPendientes",(pendientes)=>{
  lblPendientes.textContent=pendientes
    
})


//ON y OFF de mi socket
socket.on('connect', () => {
  btnSiguienteTicket.disable=false
});

socket.on('disconnect', () => { 
    btnSiguienteTicket.disable=true
});

//otros
alertTickets.style.display="none"
