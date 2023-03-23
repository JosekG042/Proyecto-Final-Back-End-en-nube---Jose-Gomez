
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~| Repositorio - Mensajes |~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

import { config } from '../Configuracion/config.js';
import { DaoFactoryMsjs } from '../Dao/daoFactories/index.js';
import { MensajesDTO } from '../Dto/mensajesDto.js';
import { ValidacionJoiMensaje } from '../Modelos/validacionesJoi/index.js';


class ApiMensajes {
    constructor() {
        this.DaoMensajes = DaoFactoryMsjs.obtenerDao(config.SERVER.SELECCION_BASEdDATOS);
    }

    async obtenerTodosMensajes() {
        const elementos = await this.DaoMensajes.obtener();
        return elementos.map(elemento => new ValidacionJoiMensaje(MensajesDTO(elemento)))
    }

    async obtenerMensajesXemail(email) {
        const elementos = await this.DaoMensajes.obtenerTodos(email)
        return elementos.map(elemento => new ValidacionJoiMensaje(MensajesDTO(elemento)))
    }

    async obtenerMensajesUno(elemento) {
        const respuesta = await this.DaoMensajes.obtenerUno(elemento);
        return new ValidacionJoiMensaje(MensajesDTO(respuesta))
    }

    async guardarMensajesBD(nuevoElemento) {
        ApiMensajes.ValidarDatosMensajes(nuevoElemento, true)
        await this.DaoMensajes.guardar(MensajesDTO(nuevoElemento));
    }

    async actualizarUsuariosBD(idBuscado, datos) {
        ApiMensajes.ValidarDatosMensajes(datos, true)
        const actualizado = await this.DaoMensajes.actualizar((idBuscado, datos))
        return new ValidacionJoiUsuario(MensajesDTO(actualizado))
    }

    async eliminarMensajesXid(idBuscado) {
        const eliminado = await this.DaoMensajes.eliminar(idBuscado);
        return eliminado
    }

    async eliminarTodosMensajes() {
        await this.DaoMensajes.eliminar();
    }

    static ValidarDatosMensajes(mensaje, requerido) {
        try {
            ValidacionJoiMensaje.validar(mensaje, requerido)
        } catch (error) {
            throw new Error('El mensaje posee un formato json invalido o faltan datos: ' + error.details[0].message)
        }
    }
}

export { ApiMensajes };