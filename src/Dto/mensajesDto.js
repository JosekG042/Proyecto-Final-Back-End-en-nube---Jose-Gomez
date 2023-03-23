
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~| DTO - Mensajes |~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

export class Mensajes {
    constructor({ id, nombre, apellido, edad, alias, avatar }) {
        this.id = id
        this.nombre = nombre
        this.apellido = apellido
        this.edad = edad
        this.alias = alias
        this.avatar = avatar
    }
}

export function MensajesDTO(elemento) {
    if (Array.isArray(elemento))
        return elemento.map(item => new Mensajes(item))
    else
        return new Mensajes(elemento)
}

