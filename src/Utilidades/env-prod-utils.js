
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~| .Env Produccion - Utils |~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/


import { config } from '../Configuracion/config.js';


const puertoProd = 8082
const clusterProd = true
const baseDatos = config.DATABASES.mongodb.dbName
const urlbaseDatos = config.DATABASES.mongodb.url
const loggerWinston = process.env.LOGGER_MODO
const ttlSesion = process.env.TTL_SESION

const msjGmailNombre = 'jose gomez'
const msjGmailEmail = 'josemgomez40534@gmail.com'
const msjGmailContra = 'lpkqxgwrlapzorxp'
const msjGmailPuerto = config.EMAIL.PUERTO
const msjGmailHost = 'smtp.gmail.com'

const msjWhatsNServicio = config.WHATS_SMS.NRO_TWILIO
const msjWhatsNroAdmin = config.WHATS_SMS.NRO_ADMIN
const msjWhatsIdCuenta = config.WHATS_SMS.ID_CUENTA
const msjWhatsTokenAuth = config.WHATS_SMS.TOKEN_AUTHN


export const ENV_PROD_UTILS = {
    puertoProd,
    clusterProd,
    baseDatos,
    urlbaseDatos,
    loggerWinston,
    ttlSesion,
    msjGmailNombre,
    msjGmailEmail,
    msjGmailContra,
    msjGmailPuerto,
    msjGmailHost,
    msjWhatsNServicio,
    msjWhatsNroAdmin,
    msjWhatsIdCuenta,
    msjWhatsTokenAuth
}


