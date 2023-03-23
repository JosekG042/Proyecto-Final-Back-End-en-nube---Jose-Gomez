
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~| Middleware ruta no existe |~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

import { Router } from 'express';
import { logger } from '../Configuracion/logger.js';


const ruta = Router();


ruta.get('*', (solicitud, respuesta) => {
    const { method, url } = solicitud;
    logger.warn(`Ruta ${method} ${url} no implementada`)
    respuesta.send(`Ruta ${method} ${url} no está implementada`)
})


export { ruta as RutaInexistente };