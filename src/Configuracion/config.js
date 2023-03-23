
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~| Configuracion del Proyecto |~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

import dotenv from "dotenv";
import path from 'path';

dotenv.config({
    path: path.resolve(process.cwd(), process.env.NODE_ENV + '.env')
});


const PRODUCTOS_ARCHIVONOMBRE = "productos";
const CARRITOS_ARCHIVONOMBRE = "carritos";
const MENSAJES_ARCHIVONOMBRE = "mensajes";
const USUARIOS_ARCHIVONOMBRE = "usuarios";


const config = {
    SERVER: {
        NODE_ENV: process.env.NODE_ENV || 'Desarrollo',
        PUERTO: process.env.PORT || 8080,
        SELECCION_BASEdDATOS: process.env.BASEDATOS_SELECCIONADA ?? "memory",
    },
    DATABASES: {
        filesystem: {
            PRODUCTOS_ARCHIVONOMBRE,
            CARRITOS_ARCHIVONOMBRE,
            MENSAJES_ARCHIVONOMBRE,
            USUARIOS_ARCHIVONOMBRE,
        },
        mongodb: {
            url: process.env.BASEDATOS_MONGO_URL,
            dbName: process.env.BASEDATOS_MONGO_NOMBRE
        }
    },
    EMAIL: {
        NOMBRE: process.env.MSJ_GMAIL_NOMBRE,
        USUARIO: process.env.MSJ_GMAIL_EMAIL,
        CONTRASEÑA: process.env.MSJ_GMAIL_CONTRA,
        PUERTO: process.env.MSJ_GMAIL_PUERTO,
        HOST: process.env.MSJ_GMAIL_HOST
    },
    WHATS_SMS: {
        NRO_TWILIO: process.env.MSJ_WHATS_SMS_NRO_SERVICIO,
        NRO_ADMIN: process.env.MSJ_WHATS_SMS_NRO_ADMIN,
        ID_CUENTA: process.env.MSJ_WHATS_SMS_ID_CUENTA,
        TOKEN_AUTHN: process.env.MSJ_WHATS_SMS_TOKEN_AUTENTICACION,
    }
};

export { config };




//! Ver clase 41

// // config.js
// import dotenv from 'dotenv';
// import path from 'path';

// dotenv.config({
//     path: path.resolve(process.cwd(), process.env.NODE_ENV + '.env')
// });

// export default {
//     NODE_ENV: process.env.NODE_ENV || 'development',
//     HOST: process.env.HOST || 'localhost',
//     PORT: process.env.PORT || 8080,
//     //MEM - FILE - MONGO
//     TIPO_PERSISTENCIA: process.env.TIPO_PERSISTENCIA || 'MEM'
// }


// app

// import cors from 'cors'
// if (config.NODE_ENV == 'development') app.use(cors())


// // production.env
// NODE_ENV=production
// HOST=localhost
// PORT=9000
// //MEM - FILE - MONGO
// TIPO_PERSISTENCIA=MONGO


