
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~| Validaciones - Mensajes |~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

import Joi from 'joi'

class ValidacionJoiMensaje {

    constructor(id, nombre, apellido, edad, alias, avatar) {
        this.id = id
        this.nombre = nombre
        this.apellido = apellido
        this.edad = edad
        this.alias = alias
        this.avatar = avatar
    }

    equals(msjValidar) {
        if (!(msjValidar instanceof ValidacionJoiMensaje)) {
            return false
        }
        if (this.id != msjValidar.id) {
            return false
        }
        if (this.nombre != msjValidar.nombre) {
            return false
        }
        if (this.apellido != msjValidar.apellido) {
            return false
        }
        if (this.edad != msjValidar.edad) {
            return false
        }
        if (this.alias != msjValidar.alias) {
            return false
        }
        if (this.avatar != msjValidar.avatar) {
            return false
        }
        return true
    }

    static validar(mensaje, requerido) {
        const MensajeSchema = Joi.object({
            id: requerido ? Joi.string().required() : Joi.string(),
            nombre: requerido ? Joi.string().required().length(15) : Joi.string(),
            apellido: requerido ? Joi.string().required().length(15) : Joi.string(),
            edad: requerido ? Joi.string().required().max(3) : Joi.string(),
            alias: requerido ? Joi.string().required().length(15) : Joi.string(),
            avatar: requerido ? Joi.string().required() : Joi.string()
        })

        const { error } = MensajeSchema.validate(mensaje)
        if (error) {
            throw error
        }
    }
}

export { ValidacionJoiMensaje };