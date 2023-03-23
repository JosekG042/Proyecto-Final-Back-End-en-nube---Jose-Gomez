
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~| Repositorio - Usuarios |~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

import { config } from '../Configuracion/config.js';
import { DaoFactoryUsers } from '../Dao/daoFactories/index.js';
import { UsuariosDTO } from '../Dto/usuariosDto.js';
import { ValidacionJoiUsuario } from '../Modelos/validacionesJoi/index.js';


class ApiUsuarios {
    constructor() {
        this.DaoUsuarios = DaoFactoryUsers.obtenerDao(config.SERVER.SELECCION_BASEdDATOS);
    }

    async obtenerTodosUsuarios() {
        const elementos = await this.DaoUsuarios.obtener()
        return elementos.map(elemento => new ValidacionJoiUsuario(UsuariosDTO(elemento)))
    }

    async obtenerUsuariosXid(idBuscado) {
        const elemento = await this.DaoUsuarios.obtenerXid(idBuscado)
        return new ValidacionJoiUsuario(UsuariosDTO(elemento))
    }

    async obtenerUnUsuario(elemento) {
        const respuesta = await this.DaoUsuarios.obtenerUno(elemento)
        const usuarioEncontrado = new ValidacionJoiUsuario(UsuariosDTO(respuesta))
        return usuarioEncontrado
    }

    async guardarUsuariosBD(nuevoElemento) {
        ApiUsuarios.ValidarDatosUsuarios(nuevoElemento, true)
        await this.DaoUsuarios.guardar(UsuariosDTO(nuevoElemento))
    }

    async actualizarUsuariosBD(idBuscado, datos) {
        ApiUsuarios.ValidarDatosUsuarios(datos, true)
        const actualizado = await this.DaoUsuarios.actualizar((idBuscado, datos))
        return new ValidacionJoiUsuario(UsuariosDTO(actualizado))
    }

    async eliminarUsuariosXid(idBuscado) {
        const eliminado = await this.DaoUsuarios.eliminar(idBuscado)
        return eliminado
    }

    async eliminarTodosUsuarios() {
        await this.DaoUsuarios.eliminar()
    }

    static ValidarDatosUsuarios(usuario, requerido) {
        try {
            ValidacionJoiUsuario.validar(usuario, requerido)
        } catch (error) {
            throw new Error('El usuario posee un formato json invalido o faltan datos: ' + error.details[0].message)
        }
    }
}

export { ApiUsuarios };

