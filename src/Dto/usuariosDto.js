
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~| DTO - Usuarios |~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

export class Usuarios {
    constructor({ nombre, edad, usuario, avatar, contrasena, telefono, direccion }) {
        this.nombre = nombre
        this.edad = edad
        this.usuario = usuario
        this.avatar = avatar
        this.contrasena = contrasena
        this.telefono = telefono
        this.direccion = direccion
    }
}

export function UsuariosDTO(elemento) {
    if (Array.isArray(elemento))
        return elemento.map(item => new Usuarios(item))
    else
        return new Usuarios(elemento)
}

