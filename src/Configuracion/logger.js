
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~| Config registrador Winston |~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

import winston from 'winston';
import dotenv from "dotenv";
dotenv.config();


function crearLoggerProd() {
    const loggerPROD = winston.createLogger({
        transports: [
            new winston.transports.File({ filename: 'warn.log', level: 'warn' }),
            new winston.transports.File({ filename: 'error.log', level: 'error' }),
        ],
    })
    return loggerPROD
}

function crearLoggerDev() {
    const loggerDEV = winston.createLogger({
        transports: [new winston.transports.Console({ level: 'info' })],
    })
    return loggerDEV
}

export let logger = null

if (process.env.LOGGER_MODO === 'PROD') {
    logger = crearLoggerProd()
    logger.warn('Logger usando modo: PROD.');
} else {
    logger = crearLoggerDev()
    logger.info('Logger usando modo: DEV.');
}

