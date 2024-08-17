import { TicketModel } from "./models/ticketModel.js"


class TicketManager{
    //Obtener Tickets
    async getTickets(){
        return await TicketModel.find({})
    }
    //Agregar Ticket
    async addTicket(ticket){
        
        const resp = await TicketModel.create(ticket)
        return  await this.getTicketByCode(ticket.code)
    }
    //Devuelve ticket por code
    async getTicketByCode(ticketCode){
        return await TicketModel.find({code: ticketCode})
    }

}

export const TicketDaoMongoDB = new TicketManager()
