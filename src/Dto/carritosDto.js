
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~| DTO - Carritos |~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

export class Carritos {
    constructor({ timestamp, usuario, productos }) {
        this.timestamp = timestamp
        this.usuario = usuario
        this.productos = productos
    }
}

export function CarritosDTO(elemento) {
    if (Array.isArray(elemento))
        return elemento.map(item => new Carritos(item))
    else
        return new Carritos(elemento)
}

