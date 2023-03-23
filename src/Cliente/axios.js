
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~| Cliente Axios |~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

import axios from "axios";
import { logger } from '../Configuracion/logger.js';


const obtenerTodosAxios = async () => {
    try {
        return await axios.get('[http://localhost:8080/api/productos/]')
    } catch (error) {
        logger.info(`error: ${error}, Error en Cliente Axios get`)
    }
}

const obtenerXidAxios = async () => {
    try {
        return await axios.get('[http://localhost:8080/api/productos/1]')
    } catch (error) {
        logger.info(`error: ${error}, Error en Cliente Axios get`)
    }
}

const guardarAxios = async () => {
    try {
        return await axios.post('[http://localhost:8080/api/productos]', {
            titulo: "pepe",
            descripcion: "un npc",
            codigo: "31211",
            imagen: "https://i.ytimg.com/vi/gud6I2rU2CE/mqdefault.jpg",
            precio: 4300,
            stock: 45
        })
    } catch (error) {
        logger.info(`error: ${error}, Error en Cliente Axios post`)
    }
}

const actualizarAxios = async () => {
    try {
        return await axios.put('[http://localhost:8080/api/productos/2]', {
            titulo: "rodrigo",
            descripcion: "un objeto",
            codigo: "22222",
            imagen: "https://i.ytimg.com/vi/gud6I2rU2CE/mqdefault.jpg",
            precio: 4700,
            stock: 25
        })
    } catch (error) {
        logger.info(`error: ${error}, Error en Cliente Axios post`)
    }
}

const eliminarXidAxios = async () => {
    try {
        return await axios.delete('[http://localhost:8080/api/productos/1]')
    } catch (error) {
        logger.info(`error: ${error}, Error en Cliente Axios delete`)
    }
}

const eliminarTodosAxios = async () => {
    try {
        return await axios.delete('[http://localhost:8080/api/productos]')
    } catch (error) {
        logger.info(`error: ${error}, Error en Cliente Axios delete`)
    }
}


export const ClienteAxios = {
    obtenerTodosAxios,
    obtenerXidAxios,
    guardarAxios,
    actualizarAxios,
    eliminarXidAxios,
    eliminarTodosAxios
}

