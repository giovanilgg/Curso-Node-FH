const socketController = (socket) => {
  socket.on("mensaje", (paylod, call) => {

    //envio a multiples usuarios
    //socket.broadcast.emit("mensajeServer" ,paylod)
    const id = "gio";
    call(id);
  });
};
module.exports = {
  socketController,
};
