
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~| Controlador Mensajes |~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

import { ApiMensajes } from "../../Api/index.js";
import { FECHA_UTILS, ERRORES_UTILS, LOGGER_UTILS } from "../../Utilidades/index.js";
import { logger } from '../../Configuracion/logger.js';



class ControladorMensajes {

    constructor() {
        this.apiMsjs = new ApiMensajes()
    }

    ObtenerTodosMsjs = async (solicitud, respuesta) => {
        try {
            const mensajes = await this.apiMsjs.obtenerTodosMensajes();

            if (!mensajes) {
                return respuesta.send({ error: ERRORES_UTILS.MESSAGES.ERROR_MENSAJES });
            }
            respuesta.send(mensajes);

        } catch (error) {
            respuesta.render("view/error-forAll", { infoError: error, lugarError: 'MENSAJES' });
            logger.error(`${error}, Error al obtener los mensajes solicitados`)
        }
    };

    CrearMensaje = async (solicitud, respuesta) => {
        try {
            const { autor, id, nombre, apellido, edad, alias, avatar, texto } = solicitud.body;

            const nuevoMensaje = await this.apiMsjs.guardarMensajesBD({
                autor, id, nombre, apellido, edad, alias, avatar, texto,
                timestamp: FECHA_UTILS.getTimestamp(),
            });

            const mensajeCreado = await this.apiMsjs.guardarMensajesBD(nuevoMensaje);

            respuesta.send({ success: true, mensaje: mensajeCreado });

        } catch (error) {
            respuesta.render("view/error-forAll", { infoError: error, lugarError: 'MENSAJES' });
            logger.error(`${error}, Error al crear el mensaje solicitado`)
            await LOGGER_UTILS.addLog(error);
        }
    };

    ObtenerMsjsXemail = async (solicitud, respuesta) => {
        try {
            const { email } = solicitud.params;

            const mensajes = await this.apiMsjs.obtenerMensajesXemail(email);

            if (!mensajes) {
                return respuesta.send({ error: ERRORES_UTILS.MESSAGES.ERROR_MENSAJES });
            }
            // respuesta.send(mensajes);
            respuesta.render("view/messaging", { misMensajes: mensajes });
        } catch (error) {
            respuesta.render("view/error-forAll", { infoError: error, lugarError: 'MENSAJES' });
            logger.error(`${error}, Error al obtener los mensajes solicitados`)
        }
    };
}

export { ControladorMensajes };

