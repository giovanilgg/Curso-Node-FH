const path = require("path");
const fs = require("fs");

class Ticket {
  constructor(numero, escritorio) {
    this.numero = numero;
    this.escritorio = escritorio;
  }
}

class ticketControl {
  constructor() {
    this.ultimo = 0;
    this.hoy = new Date().getDate();
    this.tickets = [];
    this.ultimosCuatro = [];
    this.init();
  }

  get toJson() {
    return {
      ultimo: this.ultimo,
      hoy: this.hoy,
      tickets: this.tickets,
      ultimosCuatro: this.ultimosCuatro,
    };
  }
  init() {
    const { ultimo, hoy, tickets, ultimosCuatro } = require("../db/data.json");
    if (hoy === this.hoy) {
      this.tickets = tickets;
      this.ultimo = ultimo;
      this.ultimosCuatro = ultimosCuatro;
    } else {
      this.guardarDB();
    }
  }
  guardarDB() {
    //Contruyendo el path

    const pathTicket = path.join(__dirname, "../db/data.json");
    fs.writeFileSync(pathTicket, JSON.stringify(this.toJson));
  }
  siguiente() {
    this.ultimo +=1;
    const ticket = new Ticket(this.ultimo, null);
    this.tickets.push(ticket);
    this.guardarDB();
    return "Ticket:" + ticket.numero;
  }
  atenderTicket(escritorio) {
    if (this.tickets.length === 0) {
      return null;
    }
    const ticket = this.tickets.shift();
    ticket.escritorio = escritorio;
    this.ultimosCuatro.unshift(ticket);
  
    if (this.ultimosCuatro.length > 4) {
      
     this.ultimosCuatro.splice(-1, 1);
    }
    this.guardarDB();
    return ticket;
  }
}

module.exports = {
  ticketControl,
};
