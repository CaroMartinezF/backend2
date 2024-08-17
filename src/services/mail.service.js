import nodemailer from 'nodemailer'
import { config } from '../config/mailer.config.js'

class MailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: config.mailer.host,
            port: config.mailer.port,
            auth: config.mailer.auth
        })
    }

    getMessageTemplate(type, name){
        let body = ""
        
        
        switch (type) {
            case "Registro":
                
                body += `¡Bienvenido ${name}!
                
                Te has registrado correctamente en ElevaFit
                `
                break;
        
            case "Navidad":
                
                body += `¡Feliz Navidad ${name}!
                
                Te desea el equipo de ElevaFit.

                `
                break;
                
            default:
                body += `Mensaje a  ${name} !
                
                Servicio de Mensajeria
                
                `
                break;
            }
            
            
        body += `Saludos, ElevaFit`

        return body
    }

    async sendMail({to, subject, type, name}) {
        const message = this.getMessageTemplate(type, name)

        const info = await this.transporter.sendMail({
            from: "ElevaFit",
            to,
            subject,
            html:message,
            attatchments:[]
        })
        console.log(message);
        
    }
}

export const mailService = new MailService();