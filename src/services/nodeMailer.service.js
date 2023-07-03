import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

class nodemailerService {

    constructor() {


        this.transport = nodemailer.createTransport({
            service: "gmail",
            port: 587,
            auth: {

                user: process.env.NODE_EMAIL,
                pass: process.env.NODE_PASSWORD,
            },

        });

    }


    send = async (user, subject, text) => {
        const result = await this.transport.sendMail({
            from: process.env.NODE_EMAIL,
            to: user,
            subject,
            text,
        });

        console.log(result)

        return result;
    }

    sendDelete = async (email, subject, text) => {
        const result = await this.transport.sendMail({
            from: process.env.NODE_EMAIL,
            to: email,
            subject,
            text,
            html: `
            <div> 
           
            <p>Su cuenta  ha caducado, ingrese al siguiente link para crear una cuenta nueva</p>
           
           <p><a href="http://localhost:8080/register">http://localhost:8080/register</a></p>
            
            </div>
            
            `,
        });

        console.log(result)

        return result;
    }

    sendDeletePremium = async (email, subject, text) => {
        const result = await this.transport.sendMail({
            from: process.env.NODE_EMAIL,
            to: email,
            subject,
            text,


        });

        console.log(result)

        return result;
    }

}

const sendMail = new nodemailerService();

export default sendMail;

