
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~| Validaciones - Usuarios |~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

import Joi from 'joi';

class ValidacionJoiUsuario {

    constructor(nombre, edad, usuario, avatar, contrasena, telefono, direccion) {
        this.nombre = nombre
        this.edad = edad
        this.usuario = usuario
        this.avatar = avatar
        this.contrasena = contrasena
        this.telefono = telefono
        this.direccion = direccion
    }

    equals(userValidar) {
        if (!(userValidar instanceof ValidacionJoiUsuario)) {
            return false
        }
        if (this.nombre != userValidar.nombre) {
            return false
        }
        if (this.edad != userValidar.edad) {
            return false
        }
        if (this.usuario != userValidar.apellido) {
            return false
        }
        if (this.avatar != userValidar.avatar) {
            return false
        }
        if (this.contrasena != userValidar.contrasena) {
            return false
        }
        if (this.telefono != userValidar.telefono) {
            return false
        }
        if (this.direccion != userValidar.direccion) {
            return false
        }
        return true
    }

    static validar(producto, requerido) {
        const UsuarioSchema = Joi.object({
            nombre: requerido ? Joi.string().required().length(20) : Joi.string(),
            edad: requerido ? Joi.number().required().max(3) : Joi.number(),
            usuario: requerido ? Joi.string().required().email() : Joi.string(),
            avatar: requerido ? Joi.string().required() : Joi.string(),
            contrasena: requerido ? Joi.number().required().max(20) : Joi.number(),
            telefono: requerido ? Joi.number().required().max(20) : Joi.number(),
            direccion: requerido ? Joi.string().required().length(50) : Joi.string()
        })

        const { error } = UsuarioSchema.validate(usuario)
        if (error) {
            throw error
        }
    }
}

export { ValidacionJoiUsuario };

