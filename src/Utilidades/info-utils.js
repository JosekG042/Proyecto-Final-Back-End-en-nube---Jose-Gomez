
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~| Utils Info |~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

import os from 'os';
import { config } from '../Configuracion/config.js';


const argumentosEntrada = process.argv
const pathEjecucion = process.execPath
const nombrePlataforma = process.platform
const processId = process.pid
const versionNode = process.version
const carpetaDeProyecto = process.cwd()
const memoriaTotalReservada = process.memoryUsage().rss
const procesadoresdCpus = os.cpus().length
const puerto = config.SERVER.PUERTO
const fecha = new Date().toLocaleDateString()


export const INFO_UTILS = {
    argumentosEntrada,
    pathEjecucion,
    nombrePlataforma,
    processId,
    versionNode,
    carpetaDeProyecto,
    memoriaTotalReservada,
    procesadoresdCpus,
    puerto,
    fecha
}
