
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~| Servicio Mensajeria Twilio |~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/


import twilio from 'twilio';
import { config } from '../../Configuracion/config.js';


const client = twilio(
    config.WHATS_SMS.ID_CUENTA,
    config.WHATS_SMS.TOKEN_AUTHN,
);


export { client };
