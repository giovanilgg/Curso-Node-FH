//referncias
const lblTicket1 = document.querySelector("#lblTicket1");
const lblEscritorio1 = document.querySelector("#lblEscritorio1");
const lblTicket2 = document.querySelector("#lblTicket2");
const lblEscritorio2 = document.querySelector("#lblEscritorio2");
const lblTicket3 = document.querySelector("#lblTicket3");
const lblEscritorio3 = document.querySelector("#lblEscritorio3");
const lblTicket4 = document.querySelector("#lblTicket4");
const lblEscritorio4 = document.querySelector("#lblEscritorio4");

//Instancia de socket io
const socket = io();

//eventos
socket.on("ultimosCuatro", (tickets) => {
  const audio= new Audio('../audio/new-ticket.mp3')
  audio.play()

  const [ticket1, ticket2, ticket3, ticket4] = tickets;

  if (ticket1) {
    lblTicket1.textContent = "Ticket " + ticket1.numero;
    lblEscritorio1.textContent = "Atendido por" + ticket1.escritorio;
  }
  if (ticket2) {
    lblTicket2.textContent = "Ticket " + ticket2.numero;
    lblEscritorio2.textContent = "Atendido por" + ticket2.escritorio;
  }
  if (ticket3) {
    lblTicket3.textContent = "Ticket " + ticket3.numero;
    lblEscritorio3.textContent = "Atendido por" + ticket3.escritorio;
  }
  if (ticket4) {
    lblTicket4.textContent = "Ticket " + ticket4.numero;
    lblEscritorio4.textContent = "Atendido por" + ticket4.escritorio;
  }

  console.log(tickets);
});
