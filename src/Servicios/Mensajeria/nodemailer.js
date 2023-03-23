
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~| Servicio Mensajeria Twilio |~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/


import nodemailer from 'nodemailer';
import { config } from '../../Configuracion/config.js';


const transporter = nodemailer.createTransport({
    host: config.EMAIL.HOST,
    port: config.EMAIL.PUERTO,
    auth: {
        user: config.EMAIL.USUARIO,
        pass: config.EMAIL.CONTRASEÑA
    }
});


export { transporter };
