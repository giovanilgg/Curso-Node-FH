const {ticketControl}  = require("../models/ticket");
const ticket = new ticketControl();

const socketController = (socket) => {
  socket.emit("ultimoTicket", ticket.ultimo);
  socket.emit("ultimosCuatro", ticket.ultimosCuatro);
  socket.emit("ticketsPendientes", ticket.tickets.length);
  socket.on("siguienteTicket", (payload, callback) => {
    const siguiente = ticket.siguiente();
    socket.broadcast.emit("ticketsPendientes", ticket.tickets.length);
    callback(siguiente);
  });

  socket.on("atenderTicket", ({ Escritorio }, callback) => {
    if (!Escritorio) {
      return callback({
        ok: false,
        msj: "El escritorio es obligatorio",
      });
    }
    const ticketA= ticket.atenderTicket(Escritorio)
    console.log(ticketA)
    //enviar ultimos cuatro
    socket.broadcast.emit("ultimosCuatro", ticket.ultimosCuatro);
    socket.broadcast.emit("ticketsPendientes", ticket.tickets.length);

    if(!ticketA){

     return callback({
      ok:false,
      msj:"Ya no hay tickets pendientes "
     })

    }else{
      callback({
        ok:true,
        ticket
      })
    }



  });
};

module.exports = {
  socketController,
};
